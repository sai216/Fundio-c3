"use client"

import { ActionCards } from "./action-cards"
import { WalletStatus } from "./wallet-status"
import { PEGRateCard } from "./peg-rate-card"
import { WalletGrid } from "./wallet-grid"

export function MainContent() {
  return (
    <main className="flex-1 p-6">
      <ActionCards />
      <WalletStatus />

      <div className="grid grid-cols-3 gap-6">
        <PEGRateCard />
        <WalletGrid />
      </div>
    </main>
  )
}
