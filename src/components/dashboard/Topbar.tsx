"use client"

import { ChevronDown, BellRing, Moon, Sun, Settings } from "lucide-react"
import { useTheme } from "~/context/ThemeContext" // Import useTheme
import { Link } from "react-router-dom" // Import Link
import { DASHBOARD_ACTIVATE_BUSINESS_PAGE } from "~/config/routes" // Import the activate business route

export default function Topbar() {
  const { theme, toggleTheme } = useTheme() // Use theme context

  return (
    <header className="bg-card border-b border-border px-6 py-4 sticky top-0 z-10">
      <div className="flex items-center justify-between">
        {/* Left side: Business Controls */}
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-input rounded-lg text-sm hover:bg-muted transition-colors">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="font-medium text-foreground">Switch Business</span>
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          </button>

          <Link to={DASHBOARD_ACTIVATE_BUSINESS_PAGE}>
            {" "}
            {/* Use Link for navigation */}
            <button className="px-4 py-2 border border-primary text-primary rounded-lg text-sm hover:bg-primary/5 transition-colors font-medium">
              Activate Business
            </button>
          </Link>
        </div>

        {/* Right side: Actions + Profile */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme} // Use toggleTheme from context
            className="p-2 rounded-lg hover:bg-muted transition-colors"
          >
            {theme === "dark" ? ( // Check theme from context
              <Sun className="w-5 h-5 text-muted-foreground" />
            ) : (
              <Moon className="w-5 h-5 text-muted-foreground" />
            )}
          </button>

          {/* Notifications */}
          <button className="p-2 rounded-lg hover:bg-muted transition-colors relative">
            {/* <Badge count={3} size="small"> */}
            <BellRing className="w-5 h-5 text-muted-foreground" />
            {/* </Badge> */}
          </button>

          {/* Settings */}
          <button className="p-2 rounded-lg hover:bg-muted transition-colors">
            <Settings className="w-5 h-5 text-muted-foreground" />
          </button>

          {/* Profile Dropdown */}
          <div className="flex items-center gap-2 pl-3 border-l border-border">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
              <span className="text-white text-sm font-semibold">H</span>
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium text-foreground">Hassana</p>
              <p className="text-xs text-muted-foreground">Owner</p>
            </div>
            <ChevronDown className="w-4 h-4 text-muted-foreground cursor-pointer hover:text-foreground" />
          </div>
        </div>
      </div>
    </header>
  )
}
