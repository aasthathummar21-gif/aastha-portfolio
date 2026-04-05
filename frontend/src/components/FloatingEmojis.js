import { useEffect, useRef } from 'react';

function FloatingEmojis({ emojis, count = 16 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    function resize() {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    function makeFloater() {
      return {
        x:           Math.random() * canvas.width,
        y:           canvas.height + 30,
        emoji:       emojis[Math.floor(Math.random() * emojis.length)],
        size:        14 + Math.random() * 12,
        speedY:      0.4 + Math.random() * 0.7,
        speedX:      (Math.random() - 0.5) * 0.4,
        wobble:      Math.random() * Math.PI * 2,
        wobbleSpeed: 0.02 + Math.random() * 0.02,
        opacity:     0.4 + Math.random() * 0.4,
        rotation:    0,
        rotSpeed:    (Math.random() - 0.5) * 0.02,
      };
    }

    let floaters = Array.from({ length: count }, () => {
      const f = makeFloater();
      f.y = Math.random() * canvas.height;
      return f;
    });

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Pink glow top-right
      const g1 = ctx.createRadialGradient(canvas.width * 0.85, 80, 0, canvas.width * 0.85, 80, 320);
      g1.addColorStop(0, 'rgba(255,60,172,0.09)');
      g1.addColorStop(1, 'transparent');
      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Blue glow bottom-left
      const g2 = ctx.createRadialGradient(canvas.width * 0.1, canvas.height * 0.8, 0, canvas.width * 0.1, canvas.height * 0.8, 280);
      g2.addColorStop(0, 'rgba(43,134,197,0.09)');
      g2.addColorStop(1, 'transparent');
      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Purple glow center
      const g3 = ctx.createRadialGradient(canvas.width * 0.5, canvas.height * 0.4, 0, canvas.width * 0.5, canvas.height * 0.4, 200);
      g3.addColorStop(0, 'rgba(120,75,160,0.06)');
      g3.addColorStop(1, 'transparent');
      ctx.fillStyle = g3;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      floaters.forEach(f => {
        f.y        -= f.speedY;
        f.x        += f.speedX;
        f.wobble   += f.wobbleSpeed;
        f.x        += Math.sin(f.wobble) * 0.6;
        f.rotation += f.rotSpeed;
        if (f.y < -40 || f.x < -60 || f.x > canvas.width + 60) {
          Object.assign(f, makeFloater());
        }
        ctx.save();
        ctx.globalAlpha = f.opacity;
        ctx.font = `${f.size}px serif`;
        ctx.translate(f.x, f.y);
        ctx.rotate(f.rotation);
        ctx.fillText(f.emoji, -f.size / 2, f.size / 2);
        ctx.restore();
      });

      animId = requestAnimationFrame(draw);
    }

    draw();

    const spawnInterval = setInterval(() => {
      if (floaters.length < count + 6) floaters.push(makeFloater());
    }, 1000);

    return () => {
      cancelAnimationFrame(animId);
      clearInterval(spawnInterval);
      window.removeEventListener('resize', resize);
    };
  }, [emojis, count]);

  return (
    <canvas ref={canvasRef} style={{
      position: 'absolute', top: 0, left: 0,
      width: '100%', height: '100%',
      pointerEvents: 'none', zIndex: 0
    }} />
  );
}

export default FloatingEmojis;