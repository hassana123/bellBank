import React from 'react';

interface AuthFormWrapperProps {
  children: React.ReactNode;
}

export default function AuthFormWrapper({ children }: AuthFormWrapperProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 backdrop-blur-sm p-6 sm:p-8 lg:p-10">
          {children}
        </div>
      </div>
    </div>
  );
}
