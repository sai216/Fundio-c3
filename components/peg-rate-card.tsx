"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { TrendingUp, ArrowRight } from "lucide-react"

export function PEGRateCard() {
  const [selectedAmount, setSelectedAmount] = useState("$500")
  const [customAmount, setCustomAmount] = useState("")

  const amountButtons = ["$100", "$250", "$500", "$1000", "$2500", "$5000"]

  return (
    <Card className="bg-[#2c3029] border-[#272a24] col-span-1">
      <CardHeader>
        <div className="flex items-center gap-2">
          <h3 className="text-white font-bold">Check Live PEG Rate</h3>
          <TrendingUp className="w-4 h-4 text-[#c2ff94]" />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-gray-400 text-sm">Current PEG Rate</p>
          <div className="flex items-center gap-2">
            <span className="text-3xl font-bold text-white">$1.001315</span>
            <span className="text-[#c2ff94] text-sm">Stable</span>
          </div>
        </div>

        <div>
          <p className="text-gray-400 text-sm mb-2">Select Amount:</p>
          <div className="grid grid-cols-3 gap-2 mb-4">
            {amountButtons.map((amount) => (
              <Button
                key={amount}
                variant={selectedAmount === amount ? "default" : "outline"}
                size="sm"
                className={
                  selectedAmount === amount
                    ? "bg-[#c2ff94] text-black hover:bg-[#a3e635]"
                    : "bg-transparent border-gray-600 text-white hover:bg-[#272a24]"
                }
                onClick={() => setSelectedAmount(amount)}
              >
                {amount}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-gray-400 text-sm mb-2">Custom Amount</p>
          <div className="flex items-center gap-2 mb-2">
            <Input
              placeholder="Enter Amount"
              value={customAmount}
              onChange={(e) => setCustomAmount(e.target.value)}
              className="bg-[#1d1f1b] border-gray-600 text-white"
            />
            <span className="text-gray-400 text-sm">Maximum Limit: $35000</span>
          </div>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-400">Amount to Top Up:</span>
            <span className="text-white">$500.00</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Rate Applied:</span>
            <span className="text-white">$1.001315</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">You'll Receive:</span>
            <span className="text-white">$500.66 PEG</span>
          </div>
        </div>

        <Button className="w-full bg-[#c2ff94] text-black hover:bg-[#a3e635]">
          Top Up Now
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </CardContent>
    </Card>
  )
}
