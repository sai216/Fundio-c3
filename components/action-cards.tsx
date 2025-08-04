"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Zap, Plus, Bell } from "lucide-react"
import WormholeBridgeModal from "./wormhole-bridge-modal"
import OnchainKitOnRampModal from "./onchainkit-onramp-modal"

export function ActionCards() {
  const [showWormholeModal, setShowWormholeModal] = useState(false)
  const [showOnRampModal, setShowOnRampModal] = useState(false)

  // Handle third button click - Coming Soon
  const handleComingSoon = () => {
    alert("🚀 Coming Soon!\n\nThis feature is currently under development and will be available in a future update.\n\nStay tuned for exciting new bridging capabilities!")
  }

  return (
    <>
      <div className="grid grid-cols-3 gap-4 mb-6">
        {/* Wormhole Bridge Card - EXACT SAME DESIGN */}
        <Card 
          className="bg-gradient-to-br from-[#a3e635] to-[#09b22e] text-black cursor-pointer transform transition-all duration-200 hover:scale-105 hover:shadow-lg"
          onClick={() => setShowWormholeModal(true)}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <Zap className="w-6 h-6 text-black" />
              <span className="text-sm font-semibold text-black">WORMHOLE BRIDGE</span>
            </div>
            <h3 className="text-xl font-bold text-black">Stable Coin Cross Chain</h3>
            <p className="text-xs mt-2 text-black opacity-80">
              Bridge stablecoins across 15+ networks
            </p>
          </CardContent>
        </Card>

        {/* OnchainKit OnRamp Card - EXACT SAME DESIGN */}
        <Card 
          className="bg-gradient-to-br from-[#a3e635] to-[#84cc16] text-black cursor-pointer transform transition-all duration-200 hover:scale-105 hover:shadow-lg"
          onClick={() => setShowOnRampModal(true)}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <Plus className="w-6 h-6 text-black" />
              <span className="text-sm font-semibold text-black">ONCHAINKIT</span>
            </div>
            <h3 className="text-xl font-bold text-black">OnRamp/Buy</h3>
            <p className="text-xs mt-2 text-black opacity-80">
              Purchase crypto with fiat using OnchainKit
            </p>
          </CardContent>
        </Card>

        {/* Third Button - Coming Soon Feature - EXACT SAME DESIGN */}
        <Card 
          className="bg-[#2c3029] border-[#272a24] cursor-pointer transform transition-all duration-200 hover:scale-105 hover:bg-[#353832]"
          onClick={handleComingSoon}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <Bell className="w-6 h-6 text-white" />
              <span className="text-sm text-gray-400">COMING SOON</span>
            </div>
            <h3 className="text-xl font-bold text-white">Advanced Bridge</h3>
            <p className="text-xs mt-2 text-gray-400">
              Enhanced bridging features coming soon
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Modals - Your existing working modals */}
      <WormholeBridgeModal 
        isOpen={showWormholeModal} 
        onClose={() => setShowWormholeModal(false)} 
      />

      <OnchainKitOnRampModal 
        isOpen={showOnRampModal} 
        onClose={() => setShowOnRampModal(false)} 
      />
    </>
  )
}

export default ActionCards