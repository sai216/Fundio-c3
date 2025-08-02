"use client"

import { Button } from "@/components/ui/button"
import { Home, ExternalLink, ChevronDown } from "lucide-react"

export function Header() {
  return (
    <header className="flex items-center justify-between p-4 border-b border-[#2c3029]">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <h1 className="text-[#c2ff94] text-xl font-bold">Fundio</h1>
          <ChevronDown className="w-4 h-4 text-[#c2ff94]" />
        </div>
        <div className="flex items-center gap-2 text-gray-300">
          <Home className="w-4 h-4" />
          <span>Command & Control</span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" className="bg-transparent border-gray-600 text-white hover:bg-[#2c3029]">
          Sell Crypto
        </Button>
        <Button variant="outline" className="bg-transparent border-gray-600 text-white hover:bg-[#2c3029]">
          Buy Crypto with Zelle
        </Button>
        <Button className="bg-[#c2ff94] text-black hover:bg-[#a3e635]">
          Liquidity Pools
          <ExternalLink className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </header>
  )
}
