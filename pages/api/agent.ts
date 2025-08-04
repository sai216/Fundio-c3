import { NextApiRequest, NextApiResponse } from 'next';
import { getLangChainTools } from "@coinbase/agentkit-langchain";
import { AgentKit } from "@coinbase/agentkit";
import { HumanMessage } from "@langchain/core/messages";
import { MemorySaver } from "@langchain/langgraph";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { ChatOpenAI } from "@langchain/openai";

let agent: any = null;
let config: any = null;

async function initializeAgent() {
  if (agent) return;

  try {
    // Try the simplest initialization first
    const agentKit = await AgentKit.from();

    // Get LangChain tools
    const tools = await getLangChainTools(agentKit);

    const llm = new ChatOpenAI({
      model: "gpt-4o-mini",
      apiKey: process.env.OPENAI_API_KEY,
    });

    const memory = new MemorySaver();
    agent = createReactAgent({
      llm,
      tools,
      checkpointSaver: memory,
    });

    config = {
      configurable: { thread_id: "Fundio-Agent" },
    };

    console.log("✅ Agent initialized");
  } catch (error) {
    console.error("❌ Agent initialization failed:", error);
    throw error;
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    await initializeAgent();

    const response = await agent.invoke(
      { messages: [new HumanMessage(message)] },
      config
    );

    const reply = response.messages[response.messages.length - 1].content;

    res.status(200).json({ response: reply });
  } catch (error: any) {
    console.error('Agent API error:', error);
    res.status(500).json({ 
      error: 'Agent service failed',
      details: error.message 
    });
  }
}