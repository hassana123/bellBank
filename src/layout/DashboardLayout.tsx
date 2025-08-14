// src/layout/DashboardLayout.tsx
import type { ReactNode } from 'react';
import { useState } from 'react';
import Sidebar from '~/components/dashboard/Sidebar';
import Topbar from '~/components/dashboard/Topbar';
import BusinessTypeOverlay from '~/components/modals/BusinessTypeOverlay';

export default function DashboardLayout({ children }: { children: ReactNode }) {
const [showOverlay, setShowOverlay] = useState(false);

return (
  <div className="flex h-screen bg-background overflow-hidden"> {/* Changed bg-gray-50 to bg-background */}
    {/* Sidebar */}
    <Sidebar />

    {/* Main Content Area */}
    <div className="flex-1 flex flex-col min-w-0">
      {/* Top Navigation */}
      <Topbar />
      
      {/* Page Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-6 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>

    {/* Modals */}
    <BusinessTypeOverlay
      open={showOverlay}
      onClose={() => setShowOverlay(false)}
    />
  </div>
);
}
