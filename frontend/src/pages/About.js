import React, { useEffect, useRef, useState } from 'react';

function About() {
  const canvasRef = useRef(null);
  const [barsVisible, setBarsVisible] = useState(false);

  const skills = [
    { name: 'Video Editing',                   level: 90, color: '#ff3cac' },
    { name: 'Content Creation',                level: 80, color: '#784ba0' },
    { name: 'Digital Creativity & Branding',   level: 75, color: '#2b86c5' },
    { name: 'Graphic Design',                  level: 70, color: '#f9ca24' },
    { name: 'Social Media Management',         level: 65, color: '#ff3cac' },
    { name: 'Content Writing',                 level: 85, color: '#784ba0' },
  ];

  // Animate bars after page loads
  useEffect(() => {
    setTimeout(() => setBarsVisible(true), 300);
  }, []);

  // Flying emojis canvas animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    // Creative themed emojis for Aastha's portfolio
    const emojis = ['🎬','🎨','✏️','🌟','💜','🎭','📸','🖌️','✨','💡','🎯','🌈'];

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

    // Spread floaters across the page on load
    let floaters = Array.from({ length: 16 }, () => {
      const f = makeFloater();
      f.y = Math.random() * canvas.height;
      return f;
    });

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Pink glow blob top-right
      const g1 = ctx.createRadialGradient(
        canvas.width * 0.85, 80, 0,
        canvas.width * 0.85, 80, 320
      );
      g1.addColorStop(0, 'rgba(255,60,172,0.09)');
      g1.addColorStop(1, 'transparent');
      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Blue glow blob bottom-left
      const g2 = ctx.createRadialGradient(
        canvas.width * 0.1, canvas.height * 0.8, 0,
        canvas.width * 0.1, canvas.height * 0.8, 280
      );
      g2.addColorStop(0, 'rgba(43,134,197,0.09)');
      g2.addColorStop(1, 'transparent');
      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Purple glow blob center
      const g3 = ctx.createRadialGradient(
        canvas.width * 0.5, canvas.height * 0.5, 0,
        canvas.width * 0.5, canvas.height * 0.5, 200
      );
      g3.addColorStop(0, 'rgba(120,75,160,0.05)');
      g3.addColorStop(1, 'transparent');
      ctx.fillStyle = g3;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw each floater
      floaters.forEach(f => {
        f.y        -= f.speedY;
        f.x        += f.speedX;
        f.wobble   += f.wobbleSpeed;
        f.x        += Math.sin(f.wobble) * 0.6;
        f.rotation += f.rotSpeed;

        // Reset when off screen
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

    // Spawn new floaters every second
    const spawnInterval = setInterval(() => {
      if (floaters.length < 22) floaters.push(makeFloater());
    }, 1000);

    return () => {
      cancelAnimationFrame(animId);
      clearInterval(spawnInterval);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      padding: '100px 40px 60px',
      position: 'relative',
      overflow: 'hidden'
    }}>

      {/* Flying emojis canvas — sits behind everything */}
      <canvas ref={canvasRef} style={{
        position: 'absolute', top: 0, left: 0,
        width: '100%', height: '100%',
        pointerEvents: 'none', zIndex: 0
      }} />

      {/* All content sits above canvas */}
      <div style={{
        position: 'relative', zIndex: 2,
        maxWidth: '1100px', margin: '0 auto',
        display: 'grid', gridTemplateColumns: '1fr 1fr',
        gap: '60px', alignItems: 'start'
      }}>

        {/* ── Left: Bio ── */}
        <div>
          <p style={{ color: '#ff3cac', letterSpacing: '3px',
                      fontSize: '13px', textTransform: 'uppercase',
                      marginBottom: '12px' }}>About Me</p>

          <h1 className="section-title">
            Passionate about<br />
            <span className="grad-text">creating digital experiences</span>
          </h1>

          <p style={{ color: '#888', lineHeight: 1.9,
                      marginBottom: '20px', fontSize: '16px' }}>
            I'm Aastha, a Computer Science student at P P Savani University, Surat.
            I am passionate about creating engaging digital content through video
            editing, graphic design, and content creation.
          </p>
          <p style={{ color: '#888', lineHeight: 1.9, fontSize: '16px' }}>
            I specialize in transforming ideas into visually appealing content,
            managing social media presence, and crafting impactful stories through
            creative design and writing.
          </p>

          {/* Info rows */}
          <div style={{ marginTop: '36px', display: 'flex',
                        flexDirection: 'column', gap: '14px' }}>
            {[
              { label: 'Name',       value: 'Aastha Thummar'                   },
              { label: 'University', value: 'P P Savani University'            },
              { label: 'Course',     value: 'Creative Digital Professional 💜' },
              { label: 'Location',   value: 'Surat, Gujarat'                   },
            ].map(item => (
              <div key={item.label} style={{ display: 'flex', gap: '16px' }}>
                <span style={{ color: '#ff3cac', fontWeight: 600,
                               minWidth: '100px', fontSize: '14px' }}>
                  {item.label}:
                </span>
                <span style={{ color: '#ccc', fontSize: '14px' }}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right: Skills ── */}
        <div>
          <h2 style={{ fontSize: '28px', fontWeight: 700,
                       marginBottom: '32px', color: '#fff' }}>
            Creative Skills
          </h2>

          {skills.map(skill => (
            <div key={skill.name} style={{ marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between',
                            marginBottom: '8px' }}>
                <span style={{ color: '#ccc', fontSize: '15px' }}>{skill.name}</span>
                <span style={{ color: skill.color, fontSize: '14px',
                               fontWeight: 600 }}>{skill.level}%</span>
              </div>

              {/* Bar track with hover effect */}
              <div
                style={{ background: '#222', borderRadius: '999px',
                         height: '8px', overflow: 'visible',
                         cursor: 'pointer', transition: 'height 0.2s' }}
                onMouseEnter={e => {
                  const bar = e.currentTarget.querySelector('.skill-bar');
                  bar.style.filter      = 'brightness(1.5)';
                  bar.style.boxShadow   = `0 0 16px ${skill.color}`;
                  bar.style.height      = '12px';
                  e.currentTarget.style.height = '12px';
                  e.currentTarget.style.borderRadius = '999px';
                }}
                onMouseLeave={e => {
                  const bar = e.currentTarget.querySelector('.skill-bar');
                  bar.style.filter    = 'brightness(1)';
                  bar.style.boxShadow = 'none';
                  bar.style.height    = '8px';
                  e.currentTarget.style.height = '8px';
                }}
              >
                <div
                  className="skill-bar"
                  style={{
                    width:        barsVisible ? `${skill.level}%` : '0%',
                    height:       '8px',
                    background:   skill.color,
                    borderRadius: '999px',
                    transition:   'width 1.2s cubic-bezier(0.4,0,0.2,1), height 0.2s ease, filter 0.2s ease, box-shadow 0.2s ease',
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default About;