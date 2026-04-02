import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const GalaxyBackground = () => {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    // Generate 100 stars for a more active galaxy
    const newStars = Array.from({ length: 110 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1, // Larger stars
      duration: Math.random() * 10 + 10,
      delay: -Math.random() * 20
    }));
    setStars(newStars);
  }, []);

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden', background: 'var(--bg-stars)' }}>
      {stars.map((star) => (
        <motion.div
          key={star.id}
          style={{
            position: 'absolute',
            left: `${star.x}%`,
            width: star.size,
            height: star.size,
            backgroundColor: 'var(--star-color)',
            boxShadow: `0 0 10px var(--star-color)`,
            borderRadius: '50%'
          }}
          initial={{ top: '-10%', opacity: 0 }}
          animate={{
            top: '110%',
            opacity: [0, 1, 0.8, 0]
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            ease: "linear",
            delay: star.delay
          }}
        />
      ))}
      
      {/* Nebula glowing blobs using CSS variables for theme switching */}
      <motion.div
        style={{ position: 'absolute', top: '10%', left: '10%', width: '60vw', height: '60vw', background: 'radial-gradient(circle, var(--star-color) 0%, transparent 60%)', borderRadius: '50%', filter: 'blur(50px)', opacity: 0.1 }}
        animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
        transition={{ duration: 40, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
};

export default GalaxyBackground;
