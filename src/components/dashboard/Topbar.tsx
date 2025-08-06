import { ChevronDown, BellRing, Moon, Sun, Settings } from 'lucide-react';
import { useState } from "react";
//import { Badge } from "antd";

export default function Topbar() {
  const [isDark, setIsDark] = useState(false);

  return (
    <header className="bg-white border-b border-gray-100 px-6 py-4 sticky top-0 z-10">
      <div className="flex items-center justify-between">
        {/* Left side: Business Controls */}
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50 transition-colors">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="font-medium">Switch Business</span>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </button>
          
          <button className="px-4 py-2 border border-primary text-primary rounded-lg text-sm hover:bg-primary/5 transition-colors font-medium">
            Activate Business
          </button>
        </div>

        {/* Right side: Actions + Profile */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <button
            onClick={() => setIsDark(!isDark)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isDark ? (
              <Sun className="w-5 h-5 text-gray-600" />
            ) : (
              <Moon className="w-5 h-5 text-gray-600" />
            )}
          </button>

          {/* Notifications */}
          <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative">
            {/* <Badge count={3} size="small"> */}
              <BellRing className="w-5 h-5 text-gray-600" />
            {/* </Badge> */}
          </button>

          {/* Settings */}
          <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <Settings className="w-5 h-5 text-gray-600" />
          </button>

          {/* Profile Dropdown */}
          <div className="flex items-center gap-2 pl-3 border-l border-gray-200">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
              <span className="text-white text-sm font-semibold">H</span>
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium text-gray-900">Hassana</p>
              <p className="text-xs text-gray-500">Owner</p>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-600" />
          </div>
        </div>
      </div>
    </header>
  );
}
