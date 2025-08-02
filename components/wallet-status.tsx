"use client"

import { useState } from "react"
import { Switch } from "@/components/ui/switch"

export function WalletStatus() {
  const [walletStatus, setWalletStatus] = useState(true)

  return (
    <div className="flex items-center gap-4 mb-6">
      <span className="text-white">Wallet Status</span>
      <Switch checked={walletStatus} onCheckedChange={setWalletStatus} className="data-[state=checked]:bg-[#c2ff94]" />
      <span className="text-white">Juice DealFl</span>
    </div>
  )
}
