import React from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Maximize } from 'lucide-react';

const ControlBar = ({ isPlaying, onPlayPause, onRestart, isMuted, onToggleMute, color }) => {
  return (
    <div 
      style={{
        position: 'absolute',
        bottom: '30px',
        left: '50%',
        transform: 'translateX(-50%)',
        background: 'rgba(10, 10, 20, 0.8)',
        backdropFilter: 'blur(10px)',
        border: `1px solid ${color}40`,
        borderRadius: '30px',
        padding: '10px 30px',
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
        boxShadow: `0 0 20px rgba(0,0,0,0.5)`,
        zIndex: 100
      }}
    >
      <button 
        onClick={onRestart}
        style={{ color: '#fff', opacity: 0.8 }}
        title="Restart"
      >
        <RotateCcw size={24} />
      </button>

      <div style={{ width: '1px', height: '24px', background: '#333' }} />

      <button 
        onClick={onPlayPause}
        style={{ 
          color: color, 
          background: `${color}20`,
          padding: '10px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: `0 0 15px ${color}40`
        }}
        title={isPlaying ? "Pause" : "Play"}
      >
        {isPlaying ? <Pause size={28} /> : <Play size={28} />}
      </button>

      <div style={{ width: '1px', height: '24px', background: '#333' }} />

      <button 
        onClick={onToggleMute}
        style={{ color: '#fff', opacity: 0.8 }}
        title={isMuted ? "Unmute" : "Mute"}
      >
        {isMuted ? <VolumeX size={24} color="#ff003c" /> : <Volume2 size={24} />}
      </button>

    </div>
  );
};

export default ControlBar;
