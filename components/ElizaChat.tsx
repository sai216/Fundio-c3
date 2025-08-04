"use client";
import { useEffect, useState } from "react";
import ElizaBot from "eliza-as-promised";

export default function ElizaChat() {
  const [eliza, setEliza] = useState<ElizaBot | null>(null);
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const bot = new ElizaBot();
    setEliza(bot);
    setMessages([bot.getInitial()]);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !eliza) return;

    const reply = eliza.transform(input);
    setMessages(prev => [...prev, `You: ${input}`, `Eliza: ${reply}`]);
    setInput("");
  };

  return (
    <div className="bg-black text-white p-6 rounded-xl space-y-4 w-full max-w-md">
      <h2 className="text-xl font-bold">Chat with Eliza 🤖</h2>
      <div className="bg-white/5 p-3 rounded-md max-h-64 overflow-y-auto text-sm space-y-2">
        {messages.map((msg, idx) => (
          <p key={idx}>{msg}</p>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 px-3 py-2 rounded-md bg-white text-black"
          placeholder="Say something..."
        />
        <button type="submit" className="bg-blue-600 px-4 py-2 rounded-md">Send</button>
      </form>
    </div>
  );
}
