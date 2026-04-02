import React from 'react';

const GlowButton = ({ children, onClick, color = '#00f0ff', className = '' }) => {
  return (
    <button 
      onClick={onClick}
      className={`glow-button ${className}`}
      style={{
        '--btn-color': color,
        position: 'relative',
        padding: '12px 30px',
        fontSize: '1.2rem',
        fontWeight: 'bold',
        color: '#fff',
        background: 'transparent',
        border: `2px solid ${color}`,
        borderRadius: '4px',
        textTransform: 'uppercase',
        letterSpacing: '2px',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        boxShadow: `0 0 10px ${color}40, inset 0 0 10px ${color}40`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = `${color}30`;
        e.currentTarget.style.boxShadow = `0 0 20px ${color}80, inset 0 0 20px ${color}80`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'transparent';
        e.currentTarget.style.boxShadow = `0 0 10px ${color}40, inset 0 0 10px ${color}40`;
      }}
    >
      {children}
    </button>
  );
};

export default GlowButton;
