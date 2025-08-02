// components/app-layout.tsx (the new file)
"use client"

import { Sidebar } from "./sidebar"
import { Header } from "./header"
import { MainContent } from "./main-content"
import { FloatingActionButton } from "./floating-action-button"

export function AppLayout() {
  return (
    <div className="flex min-h-screen bg-[#1a1d18]">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <div className="pt-16 md:pt-0">
          <MainContent />
        </div>
        <FloatingActionButton />
      </div>
    </div>
  )
}