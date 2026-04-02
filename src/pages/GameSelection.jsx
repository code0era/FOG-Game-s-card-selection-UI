import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Keyboard, Mousewheel } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';

import { games } from '../data/games';
import GameCard from '../components/GameCard';
import GalaxyBackground from '../components/GalaxyBackground';

const GameSelection = ({ onSelectGame, theme, toggleTheme }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [playerNameInput, setPlayerNameInput] = useState('GUEST_PLAYER');

  return (
    <div className="fade-in" style={{ width: '100%', height: '100vh', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
      <GalaxyBackground />
      
      {/* Top Navigation Bar */}
      <div style={{
        padding: '15px 30px', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        background: 'var(--nav-bg)',
        borderBottom: '1px solid var(--nav-border)',
        zIndex: 10,
        backdropFilter: 'blur(5px)'
      }}>
        {/* FOG ARENA Bold Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <h1 style={{ 
            margin: 0, 
            fontSize: '1.8rem', 
            fontFamily: 'Orbitron', 
            fontWeight: '900', 
            color: 'var(--primary)',
            textShadow: '0 0 15px var(--primary)',
            letterSpacing: '3px'
          }}>
            FOG ARENA
          </h1>
        </div>
        
        <h2 style={{ 
          fontSize: '1.2rem', 
          color: 'var(--text-light)', 
          margin: 0,
          background: 'var(--title-bg)',
          padding: '5px 40px',
          clipPath: 'polygon(10px 0, calc(100% - 10px) 0, 100% 100%, 0 100%)',
          borderBottom: '2px solid var(--text-light)'
        }}>
          SELECT YOUR GAME
        </h2>
        
        {/* Simplified Toggle Theme Button */}
        <button 
          onClick={toggleTheme}
          style={{ 
            display: 'flex', 
            alignItems: 'center',
            justifyContent: 'center',
            padding: '10px 20px', 
            background: 'var(--title-bg)', 
            borderRadius: '4px', 
            cursor: 'pointer',
            border: '1px solid var(--nav-border)',
            color: 'var(--text-light)',
            fontFamily: 'Orbitron',
            fontSize: '0.8rem',
            letterSpacing: '1px',
            boxShadow: '0 0 10px rgba(0,0,0,0.2)',
            transition: 'all 0.3s ease'
         }}
         onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--primary)'}
         onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--nav-border)'}
        >
          {theme === 'dark' ? 'LIGHT MODE' : 'DARK MODE'}
        </button>
      </div>

      {/* Main Carousel Area */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}>
        <Swiper
          effect={'coverflow'}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={'auto'}
          keyboard={{ enabled: true }}
          mousewheel={{ enabled: true }}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 300,
            modifier: 1,
            slideShadows: false,
          }}
          modules={[EffectCoverflow, Keyboard, Mousewheel]}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          style={{ width: '100%', padding: '20px 0' }}
        >
          {games.map((game, index) => (
            <SwiperSlide 
              key={game.id} 
              style={{ 
                width: 'min(60vw, 600px)', 
                aspectRatio: '16 / 9',
                height: 'auto',
                display: 'flex'
              }}
            >
              <GameCard 
                game={game} 
                isActive={activeIndex === index} 
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      
      {/* Bottom Controls Area */}
      <div style={{ 
        padding: '20px', 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '20px',
        zIndex: 10,
        background: 'var(--nav-bg)',
        borderTop: '1px solid var(--nav-border)'
      }}>
        
        {/* Player Name Section */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <span style={{ color: 'var(--text-muted)', fontSize: '1rem', fontFamily: 'Orbitron', letterSpacing: '2px' }}>OPERATIVE ID:</span>
          <input 
            type="text" 
            placeholder="ENTER ALIAS" 
            value={playerNameInput}
            onChange={(e) => setPlayerNameInput(e.target.value)}
            style={{
              background: 'var(--input-bg)',
              border: `1px solid ${games[activeIndex]?.color || 'var(--primary)'}`,
              color: 'var(--text-light)',
              padding: '10px 20px',
              fontFamily: 'Orbitron',
              fontSize: '1.2rem',
              outline: 'none',
              width: '250px',
              textAlign: 'center',
              boxShadow: `inset 0 0 10px ${games[activeIndex]?.color || 'var(--primary)'}50`
            }}
          />
        </div>

        {/* The BIG START button as requested */}
        <button 
          onClick={() => onSelectGame(games[activeIndex], playerNameInput)}
          style={{
            background: 'var(--title-bg)',
            border: `2px solid ${games[activeIndex]?.color || 'var(--primary)'}`,
            borderRadius: '8px',
            padding: '15px 80px',
            color: 'var(--text-light)',
            fontSize: '1.5rem',
            fontWeight: 'bold',
            boxShadow: `0 0 20px ${games[activeIndex]?.color || 'var(--primary)'}50`,
            cursor: 'pointer',
            transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
            textTransform: 'uppercase',
            letterSpacing: '4px'
          }}
          onMouseEnter={e => {
            e.currentTarget.style.filter = 'brightness(1.5)';
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.filter = 'brightness(1)';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          START
        </button>

        {/* Global Footer */}
        <div style={{ marginTop: '10px', fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '2px', fontFamily: 'Orbitron', textTransform: 'uppercase' }}>
          made by griding the night :CODEERA product 2026
        </div>
      </div>
    </div>
  );
};

export default GameSelection;
