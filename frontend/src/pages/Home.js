import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import FloatingEmojis from '../components/FloatingEmojis';
import aasthaPhoto from '../assets/images/aastha_2.jpg';

const homeEmojis = ['🎬','🎨','✏️','🌟','💜','✨','💡','🎯','🌈','🖌️'];

function Home() {
  const [visible, setVisible] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);

  const roles = [
    'Video Editor',
    'Content Creator',
    'Graphic Designer',
    'Social Media Manager',
    'Creative Writer',
  ];

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex(prev => (prev + 1) % roles.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '100px 40px 60px',
      position: 'relative', overflow: 'hidden',
    }}>
      <FloatingEmojis emojis={homeEmojis} count={16} />

      {/* Main content row */}
      <div style={{
        position: 'relative', zIndex: 2,
        maxWidth: '1100px', width: '100%',
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between',
        gap: '60px', flexWrap: 'wrap',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(30px)',
        transition: 'all 0.9s ease',
      }}>

        {/* ── LEFT: Text ── */}
        <div style={{ flex: 1, minWidth: '280px' }}>
          <p style={{
            color: '#ff3cac', fontWeight: 500,
            letterSpacing: '3px', marginBottom: '16px',
            fontSize: '13px', textTransform: 'uppercase',
          }}>
            Welcome to my portfolio
          </p>

          <h1 style={{
            fontFamily: 'Syne, sans-serif',
            fontSize: 'clamp(40px, 6vw, 68px)',
            fontWeight: 800, lineHeight: 1.1, marginBottom: '16px',
            color: '#fff',
          }}>
            Hi, I'm{' '}
            <span style={{
              background: 'linear-gradient(135deg, #ff3cac, #784ba0, #2b86c5)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>Aastha</span>
          </h1>

          {/* Animated role text */}
          <div style={{
            fontSize: '20px', color: '#aaa',
            marginBottom: '24px', height: '30px',
            overflow: 'hidden',
          }}>
            <span key={roleIndex} style={{
              display: 'block',
              animation: 'slideUp 0.4s ease',
            }}>
              {roles[roleIndex]}
            </span>
          </div>

          <p style={{
            color: '#888', fontSize: '16px',
            lineHeight: 1.9, marginBottom: '40px',
            maxWidth: '460px',
          }}>
            A passionate creative from Surat who transforms ideas into
            stunning visuals, videos, and engaging digital content.
          </p>

          {/* Buttons */}
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <Link to="/projects" className="btn-grad">View My Work</Link>
            <Link to="/contact"  className="btn-outline">Contact Me</Link>
          </div>

          {/* Tech pills */}
          <div style={{
            marginTop: '48px',
            display: 'flex', gap: '10px', flexWrap: 'wrap',
          }}>
            {['Video Editing','Graphic Design','Content','Social Media'].map(skill => (
              <span key={skill} style={{
                padding: '7px 16px', borderRadius: '999px',
                border: '1px solid #333', color: '#777', fontSize: '13px',
              }}>{skill}</span>
            ))}
          </div>
        </div>

        {/* ── RIGHT: Photo ── */}
        <div style={{ position: 'relative', flexShrink: 0 }}>

          {/* Spinning dashed ring */}
          <div style={{
            position: 'absolute',
            top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '360px', height: '360px',
            borderRadius: '50%',
            border: '2px dashed #ff3cac44',
            animation: 'spinSlow 12s linear infinite',
          }} />

          {/* Second ring opposite spin */}
          <div style={{
            position: 'absolute',
            top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '320px', height: '320px',
            borderRadius: '50%',
            border: '1px dashed #784ba044',
            animation: 'spinSlow 18s linear infinite reverse',
          }} />

          {/* Glow behind photo */}
          <div style={{
            position: 'absolute',
            top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '280px', height: '280px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, #ff3cac33 0%, #784ba022 50%, transparent 70%)',
            filter: 'blur(20px)',
            animation: 'pulse 3s ease-in-out infinite',
          }} />

          {/* Photo blob shape */}
          <div style={{
            position: 'relative',
            width: '280px', height: '280px',
          }}>
            {/* Gradient border wrapper */}
            <div style={{
              width: '280px', height: '280px',
              borderRadius: '60% 40% 55% 45% / 50% 60% 40% 50%',
              background: 'linear-gradient(135deg, #ff3cac, #784ba0, #2b86c5)',
              padding: '3px',
              animation: 'morphBlob 6s ease-in-out infinite',
              boxShadow: '0 0 40px #ff3cac33',
            }}>
              {/* Inner photo */}
              <div style={{
                width: '100%', height: '100%',
                borderRadius: '60% 40% 55% 45% / 50% 60% 40% 50%',
                overflow: 'hidden',
                animation: 'morphBlob 6s ease-in-out infinite',
              }}>
                <img
                  src={aasthaPhoto}
                  alt="Aastha"
                  style={{
                    width: '100%', height: '100%',
                    objectFit: 'cover', objectPosition: 'center top',
                    display: 'block',
                  }}
                />
              </div>
            </div>

            {/* Floating badge — top right */}
            <div style={{
              position: 'absolute', top: '-10px', right: '-20px',
              background: '#1a1a1a',
              border: '1px solid #ff3cac44',
              borderRadius: '12px', padding: '10px 14px',
              display: 'flex', alignItems: 'center', gap: '8px',
              animation: 'floatBadge 3s ease-in-out infinite',
              boxShadow: '0 8px 24px #ff3cac22',
            }}>
              <span style={{ fontSize: '18px' }}>🎬</span>
              <div>
                <p style={{ color: '#fff', fontSize: '12px',
                            fontWeight: 700, margin: 0 }}>Video Editor</p>
                <p style={{ color: '#888', fontSize: '11px', margin: 0 }}>Since 2022</p>
              </div>
            </div>

            {/* Floating badge — bottom left */}
            <div style={{
              position: 'absolute', bottom: '10px', left: '-30px',
              background: '#1a1a1a',
              border: '1px solid #784ba044',
              borderRadius: '12px', padding: '10px 14px',
              display: 'flex', alignItems: 'center', gap: '8px',
              animation: 'floatBadge 3s ease-in-out infinite 1.5s',
              boxShadow: '0 8px 24px #784ba022',
            }}>
              <span style={{ fontSize: '18px' }}>🎨</span>
              <div>
                <p style={{ color: '#fff', fontSize: '12px',
                            fontWeight: 700, margin: 0 }}>Designer</p>
                <p style={{ color: '#888', fontSize: '11px', margin: 0 }}>Canva & PS</p>
              </div>
            </div>

            {/* Floating badge — bottom right */}
            <div style={{
              position: 'absolute', bottom: '-10px', right: '-10px',
              background: '#1a1a1a',
              border: '1px solid #2b86c544',
              borderRadius: '12px', padding: '10px 14px',
              display: 'flex', alignItems: 'center', gap: '8px',
              animation: 'floatBadge 3s ease-in-out infinite 0.8s',
              boxShadow: '0 8px 24px #2b86c522',
            }}>
              <span style={{ fontSize: '18px' }}>✨</span>
              <div>
                <p style={{ color: '#fff', fontSize: '12px',
                            fontWeight: 700, margin: 0 }}>Content Writer</p>
                <p style={{ color: '#888', fontSize: '11px', margin: 0 }}>Thoughts and stories</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* All keyframe animations */}
      <style>{`
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
        @keyframes spinSlow {
          from { transform: translate(-50%, -50%) rotate(0deg);   }
          to   { transform: translate(-50%, -50%) rotate(360deg); }
        }
        @keyframes morphBlob {
          0%,100% { border-radius: 60% 40% 55% 45% / 50% 60% 40% 50%; }
          25%      { border-radius: 50% 50% 40% 60% / 60% 40% 60% 40%; }
          50%      { border-radius: 40% 60% 60% 40% / 40% 60% 40% 60%; }
          75%      { border-radius: 55% 45% 50% 50% / 50% 50% 55% 45%; }
        }
        @keyframes pulse {
          0%,100% { opacity: 0.6; transform: translate(-50%,-50%) scale(1);    }
          50%      { opacity: 1;   transform: translate(-50%,-50%) scale(1.08); }
        }
        @keyframes floatBadge {
          0%,100% { transform: translateY(0px);  }
          50%      { transform: translateY(-8px); }
        }
      `}</style>
    </div>
  );
}

export default Home;