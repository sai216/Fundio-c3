"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Zap, Plus, Bell } from "lucide-react"

export function ActionCards() {
  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      <Card className="bg-gradient-to-br from-[#a3e635] to-[#09b22e] text-black">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-2">
            <Zap className="w-6 h-6" />
            <span className="text-sm">SWAP</span>
          </div>
          <h3 className="text-xl font-bold">Stable Coin Cross Chain</h3>
        </CardContent>
      </Card>

      <Card className="bg-[#2c3029] border-[#272a24]">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-2">
            <Plus className="w-6 h-6 text-white" />
            <span className="text-sm text-gray-400">DIGITAL CURRENCY</span>
          </div>
          <h3 className="text-xl font-bold text-white">OnRamp/Buy</h3>
        </CardContent>
      </Card>

      <Card className="bg-[#2c3029] border-[#272a24]">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-2">
            <Bell className="w-6 h-6 text-white" />
            <span className="text-sm text-gray-400">BRIDGE</span>
          </div>
          <h3 className="text-xl font-bold text-white">Buy Digital Currencies</h3>
        </CardContent>
      </Card>
    </div>
  )
}
