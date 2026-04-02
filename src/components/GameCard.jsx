import React from 'react';

const GameCard = ({ game, isActive }) => {
  return (
    <div 
      className={`game-card ${isActive ? 'active' : ''}`}
      style={{
        width: '100%',
        height: '100%',
        borderRadius: '12px',
        overflow: 'hidden',
        position: 'relative',
        backgroundColor: '#111',
        boxShadow: isActive ? `0 0 30px ${game.color}60` : '0 10px 20px rgba(0,0,0,0.8)',
        transition: 'all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)',
        transform: isActive ? 'scale(1.1)' : 'scale(0.9)',
        border: isActive ? `2px solid ${game.color}80` : '2px solid transparent',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {isActive ? (
        // ACTIVE CARD LAYOUT (Matches the provided mockup)
        <>
          {/* Top Ribbon */}
          <div style={{
            background: 'linear-gradient(90deg, #000 0%, #333 50%, #000 100%)',
            borderBottom: `2px solid ${game.color}`,
            padding: '5px',
            textAlign: 'center',
            position: 'relative'
          }}>
            <div style={{
              position: 'absolute', left: 0, top: 0, bottom: 0, width: '40px',
              background: `linear-gradient(45deg, transparent 50%, ${game.color} 50%)`
            }} />
            <div style={{
              position: 'absolute', right: 0, top: 0, bottom: 0, width: '40px',
              background: `linear-gradient(-45deg, transparent 50%, ${game.color} 50%)`
            }} />
            <span style={{ 
              color: '#fff', fontSize: '0.8rem', fontWeight: 'bold', 
              letterSpacing: '2px', textShadow: `0 0 5px ${game.color}`
            }}>
              HOW TO PLAY
            </span>
          </div>

          {/* Main Content Area (Using Game Cover Image as Preview) */}
          <div style={{
            flex: 1, position: 'relative', overflow: 'hidden',
            borderBottom: `1px solid rgba(255,255,255,0.2)`
          }}>
            <img 
              src={game.image} 
              alt={game.name} 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            {/* Themed overlay gradient */}
            <div style={{
              position: 'absolute', inset: 0,
              background: `linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.8) 100%)`
            }} />
          </div>

          {/* Bottom Footer Info Strip */}
          <div style={{
            background: '#0a0a0f',
            padding: '12px 15px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {/* Icon Placeholder */}
              <div style={{
                width: '24px', height: '24px', borderRadius: '50%',
                background: `linear-gradient(135deg, ${game.color}, #fff)`,
                boxShadow: `0 0 10px ${game.color}`
              }} />
              <h3 style={{ margin: 0, color: '#fff', fontSize: '1.2rem', textShadow: '1px 1px 2px #000' }}>
                {game.name}
              </h3>
            </div>
            
            <div style={{ display: 'flex', gap: '15px', fontSize: '0.75rem', fontWeight: 'bold', color: '#8892b0' }}>
              <span><span style={{color: '#00f0ff'}}>PLAYERS:</span> {game.players}</span>
              <span><span style={{color: '#00f0ff'}}>DURATION:</span> {game.duration}</span>
              <span><span style={{color: '#00f0ff'}}>AGE:</span> {game.age}</span>
            </div>
          </div>
        </>
      ) : (
        // INACTIVE CARD LAYOUT (Just dark poster)
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
          <img 
            src={game.image} 
            alt={game.name} 
            style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.3) blur(1px)' }}
          />
          <h2 style={{
            position: 'absolute',
            bottom: '20px',
            left: 0, width: '100%',
            textAlign: 'center',
            color: 'rgba(255,255,255,0.5)',
            fontSize: '1.2rem'
          }}>
            {game.name}
          </h2>
        </div>
      )}
    </div>
  );
};

export default GameCard;
