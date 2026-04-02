export function drawLava(ctx, width, height, time) {
  ctx.fillStyle = '#110000';
  ctx.fillRect(0, 0, width, height);
  for (let i = 0; i < 50; i++) {
    const x = Math.sin(time/1000 + i) * width/2 + width/2;
    const y = ((time/5 + i * 20) % height);
    ctx.beginPath();
    ctx.arc(x, height - y, Math.random() * 20 + 10, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, ${Math.random()*100}, 0, 0.4)`;
    ctx.fill();
  }
}

export function drawCyberpunk(ctx, width, height, time) {
  ctx.fillStyle = '#0a001a';
  ctx.fillRect(0, 0, width, height);
  
  ctx.strokeStyle = '#ff00ff';
  ctx.lineWidth = 2;
  
  for (let i = 0; i < 20; i++) {
    const y = ((time/3 + i * 40) % height);
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }
  
  for (let i = 0; i < 20; i++) {
    const x = ((time/2 + i * 50) % width);
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.strokeStyle = '#00ffff';
    ctx.stroke();
  }
}

export function drawShooter(ctx, width, height, time) {
  ctx.fillStyle = '#050510';
  ctx.fillRect(0, 0, width, height);
  
  ctx.strokeStyle = '#00f0ff';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(width/2 - 20, height/2);
  ctx.lineTo(width/2 + 20, height/2);
  ctx.moveTo(width/2, height/2 - 20);
  ctx.lineTo(width/2, height/2 + 20);
  ctx.stroke();
  
  // laser shots
  if (Math.sin(time/100) > 0.8) {
    ctx.beginPath();
    ctx.moveTo(Math.random() * width, height);
    ctx.lineTo(width/2, height/2 + 10);
    ctx.strokeStyle = '#ff003c';
    ctx.lineWidth = 3;
    ctx.stroke();
  }
}

export function drawDefault(ctx, width, height, time, color) {
  ctx.fillStyle = '#050505';
  ctx.fillRect(0, 0, width, height);
  
  const intensity = Math.sin(time/500) * 0.5 + 0.5;
  ctx.fillStyle = color;
  ctx.globalAlpha = intensity * 0.3;
  ctx.beginPath();
  ctx.arc(width/2, height/2, height/3 + Math.sin(time/200)*50, 0, Math.PI*2);
  ctx.fill();
  ctx.globalAlpha = 1.0;
  
  // Floating particles
  for(let i=0; i<30; i++) {
    const x = (Math.sin(i*10 + time/1000) * 0.5 + 0.5) * width;
    const y = (Math.cos(i*10 + time/800) * 0.5 + 0.5) * height;
    ctx.fillStyle = color;
    ctx.fillRect(x, y, 4, 4);
  }
}

export const getAnimationFunc = (theme) => {
  switch(theme) {
    case 'lava': return drawLava;
    case 'cyberpunk': return drawCyberpunk;
    case 'shooter': return drawShooter;
    default: return drawDefault;
  }
};
