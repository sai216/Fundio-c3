"use client"

interface JobsTickerProps {
  isVisible: boolean
  onClose: () => void
}

export function JobsTicker({ isVisible, onClose }: JobsTickerProps) {
  const jobs = [
    { id: 1, type: "NEED", title: "Lead Rust Engineer for L1 Chain", company: "Fundio Labs", salary: "$150k-200k", location: "Remote" },
    { id: 2, type: "SOURCE", title: "Smart Contract Auditor Available", company: "CryptoAudit", rate: "$100/hour", location: "Global" },
    { id: 3, type: "NEED", title: "Senior Frontend Developer", company: "DeFi Protocol", salary: "$120k-180k", location: "SF/Remote" },
    { id: 4, type: "SOURCE", title: "UI/UX Designer for Web3", company: "DesignDAO", rate: "$80/hour", location: "Remote" },
    { id: 5, type: "NEED", title: "Blockchain Architect", company: "Layer2 Startup", salary: "$200k-250k", location: "NYC" },
    { id: 6, type: "SOURCE", title: "Solidity Developer", company: "SmartContract Pro", rate: "$120/hour", location: "EU/Remote" },
    { id: 7, type: "NEED", title: "Product Manager - DeFi", company: "Protocol Labs", salary: "$130k-170k", location: "Remote" },
    { id: 8, type: "SOURCE", title: "Security Auditor", company: "ChainSecurity", rate: "$150/hour", location: "Global" },
    { id: 9, type: "NEED", title: "DevOps Engineer", company: "Web3 Startup", salary: "$140k-190k", location: "Remote" },
    { id: 10, type: "SOURCE", title: "Marketing Lead Available", company: "CryptoMarketing", rate: "$90/hour", location: "Global" },
  ]

  // Triple the jobs for seamless infinite loop
  const tickerJobs = [...jobs, ...jobs, ...jobs]

  if (!isVisible) return null

  return (
    <>
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm rounded-lg overflow-hidden z-10">
        {/* Header with close button */}
        <div className="absolute top-0 left-0 right-0 bg-[#1a1d18] border-b border-gray-700 p-4 z-20">
          <div className="flex items-center justify-between">
            <h3 className="text-white font-bold">Live Jobs & Opportunities</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white text-xl leading-none"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Floating Jobs Content */}
        <div className="absolute top-16 left-0 right-0 bottom-0 overflow-hidden">
          <div className="animate-jobs-ticker-medium">
            {tickerJobs.map((job, index) => (
              <div key={`${job.id}-${index}`} className="flex-shrink-0 p-3 min-h-[140px]">
                <div className="bg-[#2c3029] border border-[#272a24] rounded-lg p-4 h-full">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`w-3 h-3 rounded-full ${
                      job.type === 'NEED' ? 'bg-red-500' : 'bg-green-500'
                    }`}></span>
                    <span className={`text-xs font-medium ${
                      job.type === 'NEED' ? 'text-red-400' : 'text-green-400'
                    }`}>{job.type}</span>
                    <span className="text-xs text-gray-500 ml-auto">{job.location}</span>
                  </div>
                  
                  <h4 className="text-white font-semibold text-sm mb-1">{job.title}</h4>
                  <p className="text-gray-400 text-xs mb-2">{job.company}</p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-[#a3e635] font-medium text-sm">
                      {job.salary || job.rate}
                    </span>
                    <button className="bg-[#a3e635] text-black hover:bg-[#c2ff94] px-3 py-1 rounded text-xs font-medium">
                      {job.type === 'NEED' ? 'Apply' : 'Contact'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* CSS for jobs ticker animation */}
      <style jsx global>{`
        @keyframes jobs-ticker-medium {
          from { 
            transform: translateY(0%); 
          }
          to { 
            transform: translateY(-100%); 
          }
        }
        .animate-jobs-ticker-medium {
          animation: jobs-ticker-medium 60s linear infinite;
          display: flex;
          flex-direction: column;
          will-change: transform;
          animation-play-state: running;
          animation-delay: 0s;
        }
      `}</style>
    </>
  )
}