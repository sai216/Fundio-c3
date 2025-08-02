"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function FloatingActionButton() {
  return (
    <div className="fixed bottom-6 right-6">
      <Button size="icon" className="w-12 h-12 rounded-full bg-[#c2ff94] text-black hover:bg-[#a3e635] shadow-lg">
        <ArrowRight className="w-6 h-6" />
      </Button>
    </div>
  )
}
