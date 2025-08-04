"use client"

import { useState } from "react"
// Your existing components
import { Sidebar } from "@/components/sidebar"
import { ActionCards } from "@/components/action-cards"
import { WalletStatus } from "@/components/wallet-status"
import { PEGRateCard } from "@/components/peg-rate-card"
import { WalletGrid } from "@/components/wallet-grid"
import ProductionWormholeModal from '@/components/wormhole-bridge-modal'
// New components
import { JobsTicker } from "@/components/jobs-ticker"
import { DealTicker } from "@/components/deal-ticker"
import { FloatingActionButton } from "@/components/floating-action-button"

export default function FundioDashboard() {
  const [showJobsTicker, setShowJobsTicker] = useState(true)

  return (
    <>
      <div className="min-h-screen bg-[#1a1d18] text-white flex overflow-x-hidden">
        {/* Your existing Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 p-6 lg:ml-0 pb-20">
          <div className="pt-12 lg:pt-0">
            {/* Your existing Action Cards */}
            <ActionCards />

            {/* Your existing Wallet Status */}
            <WalletStatus />

            {/* Main Grid Layout */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              {/* Your existing PEG Rate Card */}
              <PEGRateCard />

              {/* Your existing Wallet Cards with Jobs Overlay */}
              <div className="xl:col-span-2 relative">
                {/* Your existing wallet cards component */}
                <WalletGrid />

                {/* New Jobs Ticker Overlay */}
                {showJobsTicker && (
                  <JobsTicker 
                    isVisible={showJobsTicker} 
                    onClose={() => setShowJobsTicker(false)} 
                  />
                )}
              </div>
            </div>
          </div>
        </main>

        {/* New Floating Action Button */}
        <FloatingActionButton />

        {/* New Bottom Deal Ticker */}
        <DealTicker />
      </div>

      {/* Global Styles - Moved outside main div */}
      <style jsx global>{`
        body {
          overflow-x: hidden !important;
        }
        html, body {
          scroll-behavior: smooth !important;
        }
      `}</style>
    </>
  )
}