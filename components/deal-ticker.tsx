"use client"

export function DealTicker() {
  const deals = [
    { id: 1, icon: "🔴", text: "NEED: Seeking $100k for Agentic PayFi MVP" },
    { id: 2, icon: "🟢", text: "SOURCE: Private Lending for DeFi Protocols" },
    { id: 3, icon: "🔴", text: "NEED: Hiring: Lead Rust Engineer for L1 Chain" },
    { id: 4, icon: "🟢", text: "SOURCE: Available for Fractional UI/UX Design" },
    { id: 5, icon: "🔴", text: "NEED: Seeking $250k Series A for Web3 Gaming" },
    { id: 6, icon: "🟢", text: "SOURCE: Smart Contract Auditing Services" },
    { id: 7, icon: "🔴", text: "NEED: Looking for CTO Co-founder for DeFi Startup" },
    { id: 8, icon: "🟢", text: "SOURCE: Blockchain Development Team Available" },
    { id: 9, icon: "🔴", text: "NEED: $500k Funding for Layer 2 Protocol" },
    { id: 10, icon: "🟢", text: "SOURCE: Marketing Agency for Web3 Projects" },
    { id: 11, icon: "🔴", text: "NEED: Senior Solidity Developer Remote" },
    { id: 12, icon: "🟢", text: "SOURCE: Legal Services for Token Launches" },
    { id: 13, icon: "🔴", text: "NEED: Product Designer for NFT Marketplace" },
    { id: 14, icon: "🟢", text: "SOURCE: Community Management Services" },
    { id: 15, icon: "🔴", text: "NEED: $1M Series B for Cross-chain Bridge" },
    { id: 16, icon: "🟢", text: "SOURCE: Technical Writing for Documentation" },
  ]

  // Triple the deals for seamless infinite loop
  const tickerItems = [...deals, ...deals, ...deals]

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 h-16 bg-black/80 backdrop-blur-md z-50 overflow-hidden border-t border-gray-700">
        <div className="absolute top-0 left-0 flex h-full items-center">
          <div className="flex animate-ticker-continuous">
            {tickerItems.map((deal, index) => (
              <div key={`${deal.id}-${index}`} className="flex items-center flex-shrink-0 px-8 h-full">
                <span className="text-xl mr-3">{deal.icon}</span>
                <span className="text-gray-300 whitespace-nowrap text-sm font-medium">{deal.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* CSS for bottom ticker animation */}
      <style jsx global>{`
        @keyframes ticker-continuous {
          0% { transform: translateX(100vw); }
          100% { transform: translateX(-100%); }
        }
        .animate-ticker-continuous {
          animation: ticker-continuous 80s linear infinite;
          width: max-content;
          will-change: transform;
        }
      `}</style>
    </>
  )
}