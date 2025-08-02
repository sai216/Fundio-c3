"use client"

import { Button } from "@/components/ui/button"
import { 
  Home, FileText, Settings, Users, LogOut, X, Menu, 
  ChevronLeft, ChevronRight, ChevronDown, ChevronUp
} from "lucide-react"
import { useState, useEffect } from "react"

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [expandedMenus, setExpandedMenus] = useState<{[key: string]: boolean}>({})

  // Ensure component is mounted before rendering conditional content
  useEffect(() => {
    setIsMounted(true)
  }, [])

  const toggleSidebar = () => setIsOpen(!isOpen)
  const closeSidebar = () => setIsOpen(false)
  const toggleCollapse = () => setIsCollapsed(!isCollapsed)

  const toggleSubmenu = (menuKey: string) => {
    setExpandedMenus(prev => ({
      ...prev,
      [menuKey]: !prev[menuKey]
    }))
  }

  // Don't render until mounted to avoid hydration mismatch
  if (!isMounted) {
    return (
      <aside className="w-64 min-h-screen" style={{ backgroundColor: '#C2FF9408' }}>
        <div className="p-4 border-b border-[#2a2d27]/20">
          <h1 className="text-[#a3e635] text-xl font-bold">Fundio</h1>
        </div>
      </aside>
    )
  }

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden bg-[#2c3029] border border-[#272a24] text-white hover:bg-[#272a24]"
        onClick={toggleSidebar}
      >
        <Menu className="w-4 h-4" />
      </Button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-50
          ${isCollapsed ? 'w-16' : 'w-64'} min-h-screen
          transform transition-all duration-300 ease-in-out flex flex-col
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
        `}
        style={{ backgroundColor: '#C2FF9408' }}
      >
        {/* Header */}
        <div className="p-4 border-b border-[#2a2d27]/20 flex items-center justify-between">
          {/* Close button for mobile */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-300 hover:bg-black/10"
              onClick={closeSidebar}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Logo */}
          <h1 className={`text-[#a3e635] text-xl font-bold transition-opacity duration-300 ${isCollapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'}`}>
            Fundio
          </h1>

          {/* Collapse button - only on desktop */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleCollapse}
            className="hidden lg:flex text-gray-400 hover:text-white hover:bg-black/10 ml-auto"
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </Button>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 p-4 space-y-2">
          {/* Command & Control with child */}
          <div>
            <Button 
              variant="ghost" 
              className={`w-full transition-all duration-300 ${isCollapsed ? 'justify-center px-2' : 'justify-between'} text-gray-300 hover:bg-black/10 hover:text-white rounded-lg`}
              onClick={() => !isCollapsed && toggleSubmenu('command')}
            >
              <div className={`flex items-center ${isCollapsed ? 'justify-center' : ''}`}>
                <Home className="w-5 h-5 flex-shrink-0" />
                <span className={`ml-3 transition-all duration-300 ${isCollapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'}`}>
                  Command & Control
                </span>
              </div>
              {!isCollapsed && (
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${expandedMenus.command ? 'rotate-180' : ''}`} />
              )}
            </Button>
            
            {/* Command & Control child menu */}
            {!isCollapsed && expandedMenus.command && (
              <div className="ml-8 mt-2 space-y-1">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-gray-400 hover:bg-black/10 hover:text-white rounded-lg text-sm py-2"
                  onClick={closeSidebar}
                >
                  JsonJuiceAPI
                </Button>
              </div>
            )}
          </div>
          
          {/* Administration Consoles with children */}
          <div>
            <Button 
              variant="ghost" 
              className={`w-full transition-all duration-300 ${isCollapsed ? 'justify-center px-2' : 'justify-between'} text-gray-300 hover:bg-black/10 hover:text-white rounded-lg`}
              onClick={() => !isCollapsed && toggleSubmenu('admin')}
            >
              <div className={`flex items-center ${isCollapsed ? 'justify-center' : ''}`}>
                <FileText className="w-5 h-5 flex-shrink-0" />
                <span className={`ml-3 transition-all duration-300 ${isCollapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'}`}>
                  Administration Consoles
                </span>
              </div>
              {!isCollapsed && (
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${expandedMenus.admin ? 'rotate-180' : ''}`} />
              )}
            </Button>
            
            {/* Administration Consoles child menu */}
            {!isCollapsed && expandedMenus.admin && (
              <div className="ml-8 mt-2 space-y-1">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-gray-400 hover:bg-black/10 hover:text-white rounded-lg text-sm py-2"
                  onClick={closeSidebar}
                >
                  Manage LPs
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-gray-400 hover:bg-black/10 hover:text-white rounded-lg text-sm py-2"
                  onClick={closeSidebar}
                >
                  Messaging
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-gray-400 hover:bg-black/10 hover:text-white rounded-lg text-sm py-2"
                  onClick={closeSidebar}
                >
                  Business Profile
                </Button>
              </div>
            )}
          </div>
          
          <Button 
            variant="ghost" 
            className={`w-full transition-all duration-300 ${isCollapsed ? 'justify-center px-2' : 'justify-start'} text-gray-300 hover:bg-black/10 hover:text-white rounded-lg`}
            onClick={closeSidebar}
          >
            <Settings className="w-5 h-5 flex-shrink-0" />
            <span className={`ml-3 transition-all duration-300 ${isCollapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'}`}>
              W3 Treasury Tools
            </span>
          </Button>
          
          <Button 
            variant="ghost" 
            className={`w-full transition-all duration-300 ${isCollapsed ? 'justify-center px-2' : 'justify-start'} text-gray-300 hover:bg-black/10 hover:text-white rounded-lg`}
            onClick={closeSidebar}
          >
            <Users className="w-5 h-5 flex-shrink-0" />
            <span className={`ml-3 transition-all duration-300 ${isCollapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'}`}>
              Sura Guidance
            </span>
          </Button>
        </nav>

        {/* Bottom Log Out Button */}
        <div className="p-4 border-t border-[#2a2d27]/20">
          <Button 
            variant="ghost" 
            className={`w-full transition-all duration-300 ${isCollapsed ? 'justify-center px-2' : 'justify-start'} text-[#e97474] hover:bg-black/10 hover:text-[#ff8a8a] rounded-lg`}
            onClick={closeSidebar}
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            <span className={`ml-3 transition-all duration-300 ${isCollapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'}`}>
              Log Out
            </span>
          </Button>
        </div>
      </aside>
    </>
  )
}