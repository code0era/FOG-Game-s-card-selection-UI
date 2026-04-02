import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Keyboard, Mousewheel } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';

import { games } from '../data/games';
import GameCard from '../components/GameCard';
import ParticleBackground from '../components/ParticleBackground';

const GameSelection = ({ onSelectGame }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [playerNameInput, setPlayerNameInput] = useState('GUEST_PLAYER');

  return (
    <div className="fade-in" style={{ width: '100%', height: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <ParticleBackground />
      
      {/* Top Navigation Bar */}
      <div style={{
        padding: '15px 30px', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.8), transparent)',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        zIndex: 10
      }}>
        {/* Fake menu grid icon */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 4px)', gap: '2px' }}>
          {[...Array(9)].map((_, i) => <div key={i} style={{width: '4px', height: '4px', background: '#fff'}}/>)}
        </div>
        
        <h2 style={{ 
          fontSize: '1.2rem', 
          color: '#fff', 
          margin: 0,
          background: 'rgba(20,20,30,0.5)',
          padding: '5px 40px',
          clipPath: 'polygon(10px 0, calc(100% - 10px) 0, 100% 100%, 0 100%)',
          borderBottom: '2px solid #fff'
        }}>
          SELECT YOUR GAME
        </h2>
        
        {/* Hamburger icon */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <div style={{width: '20px', height: '2px', background: '#fff'}}/>
          <div style={{width: '20px', height: '2px', background: '#fff'}}/>
          <div style={{width: '20px', height: '2px', background: '#fff'}}/>
        </div>
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
        background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)'
      }}>
        
        {/* Player Name Section */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <span style={{ color: '#8892b0', fontSize: '1rem', fontFamily: 'Orbitron', letterSpacing: '2px' }}>OPERATIVE ID:</span>
          <input 
            type="text" 
            placeholder="ENTER ALIAS" 
            value={playerNameInput}
            onChange={(e) => setPlayerNameInput(e.target.value)}
            style={{
              background: 'rgba(0,0,0,0.5)',
              border: `1px solid ${games[activeIndex]?.color || '#4a6fa5'}`,
              color: '#fff',
              padding: '10px 20px',
              fontFamily: 'Orbitron',
              fontSize: '1.2rem',
              outline: 'none',
              width: '250px',
              textAlign: 'center',
              boxShadow: `inset 0 0 10px ${games[activeIndex]?.color || '#4a6fa5'}50`
            }}
          />
        </div>

        {/* The BIG START button as requested */}
        <button 
          onClick={() => onSelectGame(games[activeIndex], playerNameInput)}
          style={{
            background: 'linear-gradient(to bottom, rgba(30,40,60,0.9), rgba(10,20,40,0.9))',
            border: `2px solid ${games[activeIndex]?.color || '#4a6fa5'}`,
            borderRadius: '8px',
            padding: '15px 80px',
            color: '#fff',
            fontSize: '1.5rem',
            fontWeight: 'bold',
            boxShadow: `0 0 20px ${games[activeIndex]?.color || '#4a6fa5'}50, inset 0 0 20px rgba(0,0,0,0.8)`,
            cursor: 'pointer',
            transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
            textShadow: '0 0 5px rgba(255,255,255,0.5)',
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
      </div>
    </div>
  );
};

export default GameSelection;
