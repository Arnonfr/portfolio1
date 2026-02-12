
import React from 'react';

interface ClassicThemeWrapperProps {
  children: React.ReactNode;
}

export const ClassicThemeWrapper: React.FC<ClassicThemeWrapperProps> = ({ children }) => {
  return (
    <div 
      className="classic-theme-wrapper"
      style={{
        backgroundColor: '#D9D9D9',
        color: '#111111',
        minHeight: '100vh',
      }}
    >
      <style>{`
        .classic-theme-wrapper ::-webkit-scrollbar-track {
          background: #D9D9D9;
        }
        .classic-theme-wrapper ::-webkit-scrollbar-thumb {
          background: rgba(0,0,0,0.12);
        }
      `}</style>
      {children}
    </div>
  );
};

export default ClassicThemeWrapper;
