import React, { useEffect, useRef, useState } from 'react';

const GamePlayer = ({ game, onBack, playerName }) => {
  const playerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [countdown, setCountdown] = useState(3);
  const [showCountdown, setShowCountdown] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState(false);

  const [difficulty, setDifficulty] = useState('MEDIUM');
  const [playMode, setPlayMode] = useState('1 v 1');

  // Handle countdown
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(c => c - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      setShowCountdown(false);
      setIsPlaying(true);
    }
  }, [countdown]);

  const handleRestart = () => {
    setIsPlaying(false);
    if (playerRef.current) {
      playerRef.current.currentTime = 0;
    }
    setCountdown(3);
    setShowCountdown(true);
  };

  // When countdown finishes or play state changes, update HTML5 video state
  useEffect(() => {
    if (playerRef.current) {
      if (isPlaying && !showCountdown) {
        playerRef.current.play().catch(e => console.error("Video play error:", e));
      } else {
        playerRef.current.pause();
      }
    }
  }, [isPlaying, showCountdown]);

  return (
    <div className="fade-in" style={{ 
      width: '100%', height: '100vh', 
      position: 'relative', 
      background: '#050508', 
      overflow: 'hidden',
      color: '#fff',
      fontFamily: "'Rajdhani', sans-serif"
    }}>
      {/* Blurred background image based on the card */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url(${game.image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: 'blur(20px) brightness(0.2) saturate(1.5)',
        zIndex: 0
      }} />
      
      {/* Scanline overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))',
        backgroundSize: '100% 4px, 3px 100%',
        zIndex: 1,
        pointerEvents: 'none',
        opacity: 0.5
      }} />

      {/* Main Armory / HUD Frame */}
      <div style={{
        position: 'absolute',
        top: '40px', bottom: '40px', left: '40px', right: '40px',
        border: `2px solid ${game.color}50`,
        boxShadow: `inset 0 0 50px ${game.color}20, 0 0 20px rgba(0,0,0,0.5)`,
        zIndex: 5,
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* HUD Corner Decorators */}
        {/* Top-Left */}
        <div style={{ position: 'absolute', top: -2, left: -2, width: 30, height: 30, borderTop: `4px solid ${game.color}`, borderLeft: `4px solid ${game.color}` }} />
        {/* Top-Right */}
        <div style={{ position: 'absolute', top: -2, right: -2, width: 30, height: 30, borderTop: `4px solid ${game.color}`, borderRight: `4px solid ${game.color}` }} />
        {/* Bottom-Left */}
        <div style={{ position: 'absolute', bottom: -2, left: -2, width: 30, height: 30, borderBottom: `4px solid ${game.color}`, borderLeft: `4px solid ${game.color}` }} />
        {/* Bottom-Right */}
        <div style={{ position: 'absolute', bottom: -2, right: -2, width: 30, height: 30, borderBottom: `4px solid ${game.color}`, borderRight: `4px solid ${game.color}` }} />

        {/* Top Header Information Panel */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '15px 30px',
          background: `linear-gradient(to right, ${game.color}20, transparent, transparent, ${game.color}20)`,
          borderBottom: `1px solid ${game.color}40`,
        }}>
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <button 
              onClick={onBack}
              style={{ 
                background: 'transparent',
                border: `1px solid ${game.color}`,
                color: '#fff', 
                padding: '8px 20px',
                fontFamily: 'Orbitron',
                fontSize: '1rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                textShadow: `0 0 5px ${game.color}`,
                boxShadow: `inset 0 0 10px ${game.color}50`,
                clipPath: 'polygon(10px 0, 100% 0, calc(100% - 10px) 100%, 0 100%)',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = `${game.color}40`}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              ← ABORT
            </button>
            <div style={{ borderLeft: `1px solid ${game.color}40`, paddingLeft: '20px' }}>
              <div style={{ fontSize: '0.7rem', color: '#888' }}>OPERATIVE ID</div>
              <div style={{ color: '#fff', fontSize: '1.2rem', textTransform: 'uppercase', textShadow: `0 0 10px #fff`, letterSpacing: '1px' }}>
                {playerName || 'GUEST_PLAYER'}
              </div>
            </div>
          </div>
          
          <div style={{ textAlign: 'center' }}>
            <h4 style={{ margin: 0, color: game.color, letterSpacing: '5px', fontSize: '0.8rem', opacity: 0.8 }}>CURRENT ENGAGEMENT</h4>
            <h2 style={{ 
              margin: 0, 
              fontFamily: 'Orbitron', 
              fontSize: '2rem', 
              letterSpacing: '2px',
              textShadow: `0 0 15px ${game.color}` 
            }}>
              {game.name.toUpperCase()}
            </h2>
          </div>
          
          {/* Status cluster */}
          <div style={{ display: 'flex', gap: '20px', textAlign: 'right' }}>
             <div>
                <div style={{ fontSize: '0.7rem', color: '#888' }}>SYSTEM STATUS</div>
                <div style={{ color: '#00ffcc', textShadow: '0 0 5px #00ffcc' }}>ONLINE</div>
             </div>
             <div>
                <div style={{ fontSize: '0.7rem', color: '#888' }}>THEME CLASS</div>
                <div style={{ color: game.color, textShadow: `0 0 5px ${game.color}` }}>{game.theme.toUpperCase()}</div>
             </div>
          </div>
        </div>

        {/* Central Display Area with Video and HUD */}
        <div style={{ flex: 1, position: 'relative', display: 'flex', padding: '20px', gap: '20px', overflow: 'hidden' }}>
            
            {/* Main Video Viewport (Responsive 16:9 wrapper) */}
            <div style={{
              flex: 1, 
              position: 'relative',
              background: '#0a0a0a',
              border: `2px solid ${game.color}60`,
              boxShadow: `0 0 40px rgba(0,0,0,0.8), inset 0 0 20px rgba(0,0,0,0.9)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              borderRadius: '8px'
            }}>
              
              {!videoLoaded && (
                <div style={{ position: 'absolute', color: game.color, animation: 'pulse 1.5s infinite', zIndex: 10, fontFamily: 'Orbitron', fontSize: '1.2rem', letterSpacing: '4px'}}>
                  ESTABLISHING UPLINK...
                </div>
              )}

              {/* Native HTML5 Video for robust local file playback */}
              <video
                ref={playerRef}
                src={game.videoUrl}
                muted={isMuted}
                loop
                playsInline
                onCanPlay={() => setVideoLoaded(true)}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  opacity: videoLoaded ? 1 : 0,
                  transition: 'opacity 0.5s',
                  pointerEvents: 'none'
                }}
              />

              {/* Countdown Overlay INSIDE the video feed */}
              {showCountdown && (
                <div style={{
                  position: 'absolute', inset: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: 'rgba(0,0,0,0.7)', zIndex: 50, backdropFilter: 'blur(5px)'
                }}>
                  <h1 style={{ 
                    fontFamily: 'Orbitron',
                    fontSize: 'clamp(5rem, 15vw, 10rem)', 
                    color: game.color,
                    textShadow: `0 0 40px ${game.color}`,
                    animation: 'pulse 1s infinite'
                  }}>
                    {countdown > 0 ? countdown : 'ENGAGE'}
                  </h1>
                </div>
              )}
            </div>

            {/* Side Intelligence Panel */}
            <div style={{
              width: '350px',
              borderLeft: `1px solid ${game.color}40`,
              paddingLeft: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '15px',
              overflowY: 'auto'
            }}>
               <div style={{ background: 'rgba(0,0,0,0.5)', padding: '15px', border: `1px solid ${game.color}30` }}>
                 <h3 style={{ color: game.color, borderBottom: `1px solid ${game.color}50`, paddingBottom: '10px', marginTop: 0 }}>MISSION LOGISTICS</h3>
                 <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <li>
                      <div style={{ fontSize: '0.8rem', color: '#aaa' }}>ESTIMATED DURATION</div>
                      <div style={{ fontSize: '1.1rem'}}>{game.duration}</div>
                    </li>
                    <li>
                      <div style={{ fontSize: '0.8rem', color: '#aaa' }}>CLEARANCE LEVEL (AGE)</div>
                      <div style={{ fontSize: '1.1rem'}}>{game.age}</div>
                    </li>
                 </ul>
               </div>

               {/* New Mode Selection Panel */}
               <div style={{ background: 'rgba(0,0,0,0.5)', padding: '15px', border: `1px solid ${game.color}30` }}>
                 <h3 style={{ color: game.color, borderBottom: `1px solid ${game.color}50`, paddingBottom: '10px', marginTop: 0 }}>TACTICAL CONFIGURATION</h3>
                 
                 <div style={{ marginBottom: '15px' }}>
                   <div style={{ fontSize: '0.8rem', color: '#aaa', marginBottom: '8px' }}>DIFFICULTY SETTING</div>
                   <div style={{ display: 'flex', gap: '5px' }}>
                     {['EASY', 'MEDIUM', 'HARD'].map(level => (
                       <button
                         key={level}
                         onClick={() => setDifficulty(level)}
                         style={{
                           flex: 1,
                           padding: '8px 5px',
                           fontSize: '0.9rem',
                           fontFamily: "'Rajdhani', sans-serif",
                           fontWeight: 'bold',
                           cursor: 'pointer',
                           background: difficulty === level ? `${game.color}40` : 'transparent',
                           color: difficulty === level ? '#fff' : '#666',
                           border: `1px solid ${difficulty === level ? game.color : '#333'}`,
                           transition: 'all 0.2s'
                         }}
                       >
                         {level}
                       </button>
                     ))}
                   </div>
                 </div>

                 <div>
                   <div style={{ fontSize: '0.8rem', color: '#aaa', marginBottom: '8px' }}>ENGAGEMENT MODE</div>
                   <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5px' }}>
                     {['1 V 1', 'P V E', 'MULTIPLAYER', 'CAREER'].map(mode => (
                       <button
                         key={mode}
                         onClick={() => setPlayMode(mode)}
                         style={{
                           padding: '8px 5px',
                           fontSize: '0.9rem',
                           fontFamily: "'Rajdhani', sans-serif",
                           fontWeight: 'bold',
                           cursor: 'pointer',
                           background: playMode === mode ? `${game.color}40` : 'transparent',
                           color: playMode === mode ? '#fff' : '#666',
                           border: `1px solid ${playMode === mode ? game.color : '#333'}`,
                           transition: 'all 0.2s'
                         }}
                       >
                         {mode}
                       </button>
                     ))}
                   </div>
                 </div>
               </div>

               <div style={{ flex: 1, background: 'rgba(0,0,0,0.5)', padding: '15px', border: `1px solid ${game.color}30` }}>
                 <h3 style={{ color: game.color, borderBottom: `1px solid ${game.color}50`, paddingBottom: '10px', marginTop: 0 }}>COMMUNICATIONS</h3>
                 {/* Decorative sound waves / equalizer */}
                 <div style={{ display: 'flex', gap: '5px', height: '30px', alignItems: 'flex-end', marginTop: '10px', opacity: isMuted ? 0.3 : 1 }}>
                    {[...Array(15)].map((_, i) => (
                      <div key={i} style={{
                        flex: 1, background: game.color,
                        height: isMuted ? '5px' : `${Math.random() * 100}%`,
                        transition: 'height 0.2s',
                        animation: isMuted ? 'none' : `pulse ${0.5 + Math.random()}s infinite alternate`
                      }} />
                    ))}
                 </div>
                 <div style={{ textAlign: 'center', marginTop: '10px', color: isMuted ? '#f00' : '#0f0', fontSize: '0.8rem' }}>
                    {isMuted ? 'AUDIO LINK SEVERED' : 'AUDIO SECURE'}
                 </div>
               </div>

               {/* Action Controls */}
               <div style={{ display: 'flex', gap: '10px' }}>
                  <button 
                    onClick={() => setIsMuted(!isMuted)}
                    style={{
                      flex: 1, background: 'rgba(0,0,0,0.8)', border: `1px solid ${game.color}`,
                      color: game.color, padding: '15px', cursor: 'pointer', fontFamily: 'Orbitron',
                      boxShadow: `inset 0 0 10px ${game.color}20`
                    }}
                  >
                    {isMuted ? 'UNMUTE COMMS' : 'MUTE COMMS'}
                  </button>
                  <button 
                    onClick={handleRestart}
                    style={{
                      background: `${game.color}20`, border: `1px solid ${game.color}`,
                      color: '#fff', padding: '15px', cursor: 'pointer',
                      boxShadow: `0 0 15px ${game.color}40`
                    }}
                  >
                    ↻
                  </button>
               </div>
            </div>
        </div>

        {/* Bottom Footer Status Bar */}
        <div style={{ 
          height: '30px', 
          borderTop: `1px solid ${game.color}40`,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          padding: '0 20px',
          fontSize: '0.75rem',
          color: '#666',
          justifyContent: 'space-between'
        }}>
           <span>FOG TECHNOLOGIES SYSTEM v1.0.4</span>
           <span style={{ color: game.color, letterSpacing: '2px' }}>AWAITING INPUT...</span>
           <span>UPLINK ENCRYPTED</span>
        </div>
      </div>
    </div>
  );
};

export default GamePlayer;
