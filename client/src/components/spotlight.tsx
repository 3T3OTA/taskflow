import React from 'react';

export const Spotlight: React.FC = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {}
      <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-gradient-radial from-blue-500/30 via-blue-400/20 to-transparent rounded-full blur-3xl animate-pulse" />
      
      {}
      <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-gradient-radial from-blue-400/20 via-blue-300/10 to-transparent rounded-full blur-2xl animate-pulse delay-1000" />
      
      <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-radial from-blue-600/25 via-blue-700/15 to-transparent rounded-full blur-3xl animate-pulse delay-2000" />
      
      {}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(37,99,235,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(37,99,235,0.07)_1px,transparent_1px)] bg-[size:50px_50px]" />
    </div>
  );
};