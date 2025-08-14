import React from 'react';

interface AuthFormWrapperProps {
children: React.ReactNode;
}

export default function AuthFormWrapper({ children }: AuthFormWrapperProps) {
return (
  <div className="min-h-screen bg-background flex items-center justify-center p-4"> {/* Changed bg-gradient... to bg-background */}
    <div className="w-full max-w-md">
      <div className="bg-card rounded-2xl shadow-xl border border-border backdrop-blur-sm p-6 sm:p-8 lg:p-10"> {/* Changed bg-white to bg-card, border-gray-100 to border-border */}
        {children}
      </div>
    </div>
  </div>
);
}
