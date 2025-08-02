"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Copy } from "lucide-react"

interface WalletCardProps {
  name: string
  address: string
  balance: string
  withdrawableAssets: string
  depositAsset: string
}

export function WalletCard({ name, address, balance, withdrawableAssets, depositAsset }: WalletCardProps) {
  return (
    <Card className="bg-[#2c3029] border-[#272a24]">
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-6 h-6 bg-[#09b285] rounded-full flex items-center justify-center">
            <div className="w-3 h-3 bg-white rounded-full" />
          </div>
          <h3 className="text-white font-bold">{name}</h3>
        </div>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-gray-400 text-sm">Address:</span>
          <span className="text-white text-sm">{address}</span>
          <Copy className="w-3 h-3 text-gray-400 cursor-pointer hover:text-white" />
        </div>
        <div className="mb-4">
          <p className="text-gray-400 text-sm">Balance</p>
          <p className="text-white text-2xl font-bold">{balance}</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-gray-400 text-sm">Withdrawable Assets</p>
            <p className="text-white font-bold">{withdrawableAssets}</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm">Deposit Asset</p>
            <p className="text-white font-bold">{depositAsset}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
