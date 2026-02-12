import React from 'react';

export const SimpleHome: React.FC = () => {
  return (
    <div style={{ 
      width: '100%', 
      minHeight: '100vh', 
      backgroundColor: '#f4f3f1',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <h1 style={{ fontSize: '5rem', color: '#0c0c0a', margin: 0 }}>
        ARNON FRIEDMAN
      </h1>
      <p style={{ fontSize: '1.5rem', color: '#2b2926' }}>
        Design Leader
      </p>
    </div>
  );
};

export default SimpleHome;
