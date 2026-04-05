import React, { useState, useRef } from 'react';
import FloatingEmojis from '../components/FloatingEmojis';

// ── Videos ───────────────────────────────────────────────────
import brandVideoSrc from '../assets/videos/brandvideo.mp4';
import montageSrc    from '../assets/videos/montage.mp4';
import reelSrc       from '../assets/videos/reel.mp4';
import shortFilmSrc  from '../assets/videos/shortfilm.mp4';

// ── Images ───────────────────────────────────────────────────
import bannerImg   from '../assets/images/banner.jpg';
import brandkitImg from '../assets/images/brandkit.jpg';
import carouselImg from '../assets/images/carousel.jpg';
import logoImg     from '../assets/images/logo.jpg';
import post1Img    from '../assets/images/post1.jpg';
import post2Img    from '../assets/images/post2.jpg';
import posterImg   from '../assets/images/poster.jpg';
import storyImg    from '../assets/images/story.jpg';

const projectEmojis = ['🎬','🎨','✏️','📸','📱','✨','💡','🌈','🎯','💜'];

const projects = [
  {
    id: 1,
    title: 'Video Editing',
    color: '#ff3cac',
    icon: '🎬',
    desc: 'Storytelling through seamless transitions, color correction, and audio synchronization.',
    tags: ['CapCut', 'Adobe Premiere Pro', 'After Effects'],
    modalTitle: 'My Video Editing Work',
    modalDesc: 'Click any video thumbnail to watch it!',
    type: 'video',
    items: [
      { src: shortFilmSrc,  title: 'Short Film Edit', desc: 'Color graded short film'  },
      { src: reelSrc,       title: 'Reel Edit',        desc: 'Trending transitions'    },
      { src: brandVideoSrc, title: 'Brand Video',      desc: 'Promotional video'       },
      { src: montageSrc,    title: 'Event Montage',    desc: 'Event highlights'        },
    ],
  },
  {
    id: 2,
    title: 'Graphic Design',
    color: '#784ba0',
    icon: '🖌️',
    desc: 'Eye-catching visuals through creative design, typography, and color combinations.',
    tags: ['Canva', 'Photoshop', 'Illustrator'],
    modalTitle: 'My Graphic Design Work',
    modalDesc: 'Click any image to view it full size!',
    type: 'image',
    items: [
      { src: logoImg,     title: 'Logo Design',   desc: 'Brand identity'    },
      { src: posterImg,   title: 'Event Poster',  desc: 'Bold typography'   },
      { src: bannerImg,   title: 'Social Banner', desc: 'YouTube & Insta'   },
      { src: brandkitImg, title: 'Brand Kit',     desc: 'Full brand guide'  },
    ],
  },
  {
    id: 3,
    title: 'Content Creation',
    color: '#2b86c5',
    icon: '📸',
    desc: 'Engaging content for social media, blogs, and marketing materials.',
    tags: ['Instagram', 'YouTube', 'Blogging', 'Pinterest'],
    modalTitle: 'My Content Creation Work',
    modalDesc: 'Posts and reels I have created!',
    type: 'image',
    items: [
      { src: post1Img,    title: 'Instagram Post', desc: 'Brand engagement'    },
      { src: post2Img,    title: 'Story Design',   desc: 'Story template'      },
      { src: storyImg,    title: 'Carousel Post',  desc: 'Educational content' },
      { src: carouselImg, title: 'Ad Campaign',    desc: 'Marketing campaign'  },
    ],
  },
  {
    id: 4,
    title: 'Social Media Manager',
    color: '#f9ca24',
    icon: '📱',
    desc: 'Managing accounts, content calendars, and audience engagement.',
    tags: ['Management', 'Branding', 'Analytics', 'Growth'],
    modalTitle: 'Social Media Management',
    modalDesc: 'Pages and accounts I have managed!',
    type: 'links',
    items: [
      { icon: '📸', bg: '#f9ca24', title: 'Instagram Page',  desc: 'a.thummar_21',   link: 'https://instagram.com/a.thummar_21' },
      { icon: '▶️', bg: '#ff3cac', title: 'YouTube Channel', desc: 'radhe_edits',    link: 'https://youtube.com/@radhe_edits'  },
      { icon: '📌', bg: '#2b86c5', title: 'Pinterest Board', desc: 'Visual boards',  link: 'https://pinterest.com'             },
      { icon: '📈', bg: '#784ba0', title: 'Analytics',       desc: 'Growth reports', link: '#'                                 },
    ],
  },
  {
    id: 5,
    title: 'Content Writer',
    color: '#00d2d3',
    icon: '✏️',
    desc: 'Compelling content that tells stories and connects with audiences.',
    tags: ['Blog Writing', 'Copywriting', 'SEO'],
    modalTitle: 'My Writing Work',
    modalDesc: 'Articles, blogs, and copy I have written!',
    type: 'links',
    items: [
      { icon: '📝', bg: '#00d2d3', title: 'Blog Article',   desc: 'SEO-optimized post',  link: '#' },
      { icon: '💬', bg: '#ff3cac', title: 'Ad Copy',         desc: 'Instagram campaigns', link: '#' },
      { icon: '✍️', bg: '#784ba0', title: 'Caption Writing', desc: 'Brand captions',      link: '#' },
      { icon: '📖', bg: '#2b86c5', title: 'Story Content',   desc: 'Narrative writing',   link: '#' },
    ],
  },
];

// ── Fullscreen Video Popup ────────────────────────────────────
function VideoPopup({ item, color, onClose }) {
  const videoRef = useRef(null);

  // Auto play when popup opens
  React.useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  }, []);

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 4000,
        background: 'rgba(0,0,0,0.97)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '20px',
        animation: 'fadeIn 0.2s ease',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: '100%', maxWidth: '900px',
          animation: 'modalPop 0.3s cubic-bezier(0.34,1.56,0.64,1)',
        }}
      >
        {/* Video title */}
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', marginBottom: '16px',
        }}>
          <div>
            <h3 style={{ color: '#fff', fontFamily: 'Syne, sans-serif',
                         fontSize: '20px', fontWeight: 700, margin: 0 }}>
              {item.title}
            </h3>
            <p style={{ color: '#666', fontSize: '13px', margin: '4px 0 0' }}>
              {item.desc}
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              background: '#222', border: `1px solid ${color}55`,
              color: '#fff', width: '40px', height: '40px',
              borderRadius: '50%', fontSize: '18px', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.2s', flexShrink: 0,
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = color;
              e.currentTarget.style.transform  = 'rotate(90deg)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = '#222';
              e.currentTarget.style.transform  = 'rotate(0)';
            }}
          >✕</button>
        </div>

        {/* Video player — full size, no cropping */}
        <div style={{
          borderRadius: '16px', overflow: 'hidden',
          border: `2px solid ${color}44`,
          boxShadow: `0 0 60px ${color}33`,
          background: '#000',
        }}>
          <video
            ref={videoRef}
            src={item.src}
            controls
            autoPlay
            style={{
              width: '100%',
              maxHeight: '70vh',
              display: 'block',
              background: '#000',
            }}
          />
        </div>

        <p style={{ textAlign: 'center', color: '#444',
                    fontSize: '12px', marginTop: '16px' }}>
          Click outside to close
        </p>
      </div>
    </div>
  );
}

// ── Video Thumbnail Card ──────────────────────────────────────
function VideoItem({ item, color, onVideoClick }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onVideoClick(item)}
      style={{
        background: '#1a1a1a', borderRadius: '14px',
        overflow: 'hidden', cursor: 'pointer',
        border: `1px solid ${hovered ? color : '#2a2a2a'}`,
        transition: 'all 0.3s cubic-bezier(0.34,1.56,0.64,1)',
        transform: hovered ? 'translateY(-4px) scale(1.02)' : 'translateY(0) scale(1)',
        boxShadow: hovered ? `0 12px 32px ${color}33` : 'none',
      }}
    >
      {/* Thumbnail with play button */}
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        <video
          src={item.src}
          style={{
            width: '100%', height: '150px',
            objectFit: 'cover', display: 'block',
            pointerEvents: 'none',
          }}
        />

        {/* Play overlay — always visible */}
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: hovered ? 'rgba(0,0,0,0.55)' : 'rgba(0,0,0,0.35)',
          transition: 'background 0.3s',
        }}>
          <div style={{
            width: '56px', height: '56px', borderRadius: '50%',
            background: color,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '22px',
            transform: hovered ? 'scale(1.2)' : 'scale(1)',
            transition: 'transform 0.3s cubic-bezier(0.34,1.56,0.64,1)',
            boxShadow: `0 0 30px ${color}88`,
          }}>▶</div>
        </div>

        {/* Click to watch badge */}
        <div style={{
          position: 'absolute', bottom: '8px', left: '8px',
          background: 'rgba(0,0,0,0.7)', borderRadius: '999px',
          padding: '3px 10px', fontSize: '10px', color: '#ccc',
          opacity: hovered ? 1 : 0, transition: 'opacity 0.3s',
        }}>Click to watch</div>
      </div>

      <div style={{ padding: '12px 14px' }}>
        <p style={{ color: '#fff', fontSize: '13px', fontWeight: 700,
                    marginBottom: '3px', fontFamily: 'Syne, sans-serif' }}>
          {item.title}
        </p>
        <p style={{ color: '#666', fontSize: '12px' }}>{item.desc}</p>
      </div>
    </div>
  );
}

// ── Image Viewer ──────────────────────────────────────────────
function ImageItem({ item, color }) {
  const [hovered, setHovered] = useState(false);
  const [zoomed,  setZoomed]  = useState(false);

  return (
    <>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => setZoomed(true)}
        style={{
          background: '#1a1a1a', borderRadius: '14px',
          overflow: 'hidden', cursor: 'zoom-in',
          border: `1px solid ${hovered ? color : '#2a2a2a'}`,
          transition: 'all 0.3s cubic-bezier(0.34,1.56,0.64,1)',
          transform: hovered ? 'translateY(-4px) scale(1.02)' : 'translateY(0) scale(1)',
          boxShadow: hovered ? `0 12px 32px ${color}33` : 'none',
        }}
      >
        <div style={{ position: 'relative', overflow: 'hidden' }}>
          <img
            src={item.src} alt={item.title}
            style={{
              width: '100%', height: '150px',
              objectFit: 'cover', display: 'block',
              transition: 'transform 0.4s ease',
              transform: hovered ? 'scale(1.08)' : 'scale(1)',
            }}
          />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'rgba(0,0,0,0.4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            opacity: hovered ? 1 : 0, transition: 'opacity 0.3s',
          }}>
            <div style={{
              width: '48px', height: '48px', borderRadius: '50%',
              background: color, fontSize: '22px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: `0 0 24px ${color}77`,
            }}>🔍</div>
          </div>
        </div>
        <div style={{ padding: '12px 14px' }}>
          <p style={{ color: '#fff', fontSize: '13px', fontWeight: 700,
                      marginBottom: '3px', fontFamily: 'Syne, sans-serif' }}>
            {item.title}
          </p>
          <p style={{ color: '#666', fontSize: '12px' }}>{item.desc}</p>
        </div>
      </div>

      {/* Full size image zoom */}
      {zoomed && (
        <div
          onClick={() => setZoomed(false)}
          style={{
            position: 'fixed', inset: 0, zIndex: 4000,
            background: 'rgba(0,0,0,0.96)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'zoom-out', padding: '20px',
            animation: 'fadeIn 0.2s ease',
          }}
        >
          <img
            src={item.src} alt={item.title}
            style={{
              maxWidth: '90vw', maxHeight: '85vh',
              borderRadius: '12px', objectFit: 'contain',
              animation: 'modalPop 0.3s cubic-bezier(0.34,1.56,0.64,1)',
            }}
          />
          <button
            onClick={() => setZoomed(false)}
            style={{
              position: 'absolute', top: '20px', right: '20px',
              background: '#222', border: '1px solid #444',
              color: '#fff', width: '42px', height: '42px',
              borderRadius: '50%', fontSize: '18px', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >✕</button>
          <p style={{ position: 'absolute', bottom: '20px',
                      color: '#444', fontSize: '12px' }}>
            Click anywhere to close
          </p>
        </div>
      )}
    </>
  );
}

// ── Project Modal ─────────────────────────────────────────────
function ProjectModal({ project, onClose }) {
  const [activeVideo, setActiveVideo] = useState(null);
  if (!project) return null;

  return (
    <>
      <div
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0, zIndex: 1000,
          background: 'rgba(0,0,0,0.92)',
          backdropFilter: 'blur(10px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '20px', animation: 'fadeIn 0.3s ease',
        }}
      >
        <div
          onClick={e => e.stopPropagation()}
          style={{
            background: '#111', borderRadius: '24px',
            width: '100%', maxWidth: '680px',
            border: `1px solid ${project.color}33`,
            animation: 'modalPop 0.4s cubic-bezier(0.34,1.56,0.64,1)',
            maxHeight: '90vh', overflowY: 'auto',
          }}
        >
          {/* Hero */}
          <div style={{
            height: '160px', position: 'relative',
            background: `linear-gradient(135deg, ${project.color}33, #0d0d0d)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            overflow: 'hidden', flexShrink: 0,
          }}>
            <div style={{
              position: 'absolute', inset: 0,
              background: `radial-gradient(circle at 50% 50%, ${project.color}44, transparent 65%)`,
            }} />
            <span style={{
              fontSize: '64px', position: 'relative', zIndex: 1,
              animation: 'iconPop 0.5s cubic-bezier(0.34,1.56,0.64,1) 0.2s both',
              filter: `drop-shadow(0 0 20px ${project.color})`,
            }}>{project.icon}</span>

            <button
              onClick={onClose}
              style={{
                position: 'absolute', top: '16px', right: '16px',
                width: '36px', height: '36px', borderRadius: '50%',
                background: 'rgba(0,0,0,0.5)',
                border: `1px solid ${project.color}55`,
                color: '#fff', fontSize: '16px', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.2s', zIndex: 2,
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = project.color;
                e.currentTarget.style.transform  = 'rotate(90deg) scale(1.1)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(0,0,0,0.5)';
                e.currentTarget.style.transform  = 'rotate(0) scale(1)';
              }}
            >✕</button>

            <div style={{
              position: 'absolute', top: 0, left: 0, width: '50px', height: '50px',
              borderTop: `2px solid ${project.color}55`,
              borderLeft: `2px solid ${project.color}55`,
              borderRadius: '24px 0 0 0',
            }} />
            <div style={{
              position: 'absolute', bottom: 0, right: 0, width: '50px', height: '50px',
              borderBottom: `2px solid ${project.color}55`,
              borderRight: `2px solid ${project.color}55`,
            }} />
          </div>

          {/* Body */}
          <div style={{ padding: '28px' }}>
            <div style={{ display: 'flex', gap: '8px',
                          flexWrap: 'wrap', marginBottom: '16px' }}>
              {project.tags.map(tag => (
                <span key={tag} style={{
                  padding: '4px 12px', borderRadius: '999px',
                  background: `${project.color}22`, color: project.color,
                  fontSize: '12px', fontWeight: 600,
                  border: `1px solid ${project.color}44`,
                }}>{tag}</span>
              ))}
            </div>

            <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: '24px',
                         fontWeight: 800, color: '#fff', marginBottom: '8px' }}>
              {project.modalTitle}
            </h2>
            <p style={{ color: '#777', fontSize: '14px',
                        lineHeight: 1.7, marginBottom: '24px' }}>
              {project.modalDesc}
            </p>

            <div style={{
              height: '1px', marginBottom: '24px',
              background: `linear-gradient(90deg, ${project.color}66, transparent)`,
            }} />

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '14px',
            }}>
              {/* Videos — clicking opens fullscreen popup */}
              {project.type === 'video' && project.items.map((item, i) => (
                <VideoItem
                  key={i}
                  item={item}
                  color={project.color}
                  onVideoClick={setActiveVideo}
                />
              ))}

              {project.type === 'image' && project.items.map((item, i) => (
                <ImageItem key={i} item={item} color={project.color} />
              ))}

              {project.type === 'links' && project.items.map((item, i) => (
                <a key={i} href={item.link} target="_blank"
                   rel="noreferrer" style={{ textDecoration: 'none' }}>
                  <div
                    style={{
                      background: '#1a1a1a', borderRadius: '14px',
                      overflow: 'hidden', cursor: 'pointer',
                      border: '1px solid #2a2a2a', transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = project.color;
                      e.currentTarget.style.transform   = 'translateY(-4px)';
                      e.currentTarget.style.boxShadow   = `0 12px 24px ${project.color}33`;
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = '#2a2a2a';
                      e.currentTarget.style.transform   = 'translateY(0)';
                      e.currentTarget.style.boxShadow   = 'none';
                    }}
                  >
                    <div style={{
                      height: '90px', background: `${item.bg}22`,
                      display: 'flex', alignItems: 'center',
                      justifyContent: 'center', fontSize: '36px',
                    }}>{item.icon}</div>
                    <div style={{ padding: '12px 14px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between',
                                    alignItems: 'center', marginBottom: '3px' }}>
                        <p style={{ color: '#fff', fontSize: '13px', fontWeight: 700,
                                    fontFamily: 'Syne, sans-serif' }}>{item.title}</p>
                        <span style={{ color: project.color, fontSize: '16px' }}>↗</span>
                      </div>
                      <p style={{ color: '#666', fontSize: '12px' }}>{item.desc}</p>
                    </div>
                  </div>
                </a>
              ))}
            </div>

            <p style={{ textAlign: 'center', color: '#333',
                        fontSize: '12px', marginTop: '24px' }}>
              Press Esc or click outside to close
            </p>
          </div>
        </div>
      </div>

      {/* Fullscreen video popup — opens on top of everything */}
      {activeVideo && (
        <VideoPopup
          item={activeVideo}
          color={project.color}
          onClose={() => setActiveVideo(null)}
        />
      )}

      <style>{`
        @keyframes fadeIn  { from{opacity:0} to{opacity:1} }
        @keyframes modalPop {
          from { opacity:0; transform:scale(0.85) translateY(40px); }
          to   { opacity:1; transform:scale(1) translateY(0); }
        }
        @keyframes iconPop {
          from { opacity:0; transform:scale(0) rotate(-20deg); }
          to   { opacity:1; transform:scale(1) rotate(0); }
        }
      `}</style>
    </>
  );
}

// ── Main Page ─────────────────────────────────────────────────
function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [hoveredCard,     setHoveredCard]     = useState(null);

  React.useEffect(() => {
    const handleKey = e => {
      if (e.key === 'Escape') setSelectedProject(null);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <div style={{
      minHeight: '100vh', padding: '100px 40px 60px',
      position: 'relative', overflow: 'hidden',
    }}>
      <FloatingEmojis emojis={projectEmojis} count={14} />

      <div style={{ position: 'relative', zIndex: 2,
                    maxWidth: '1100px', margin: '0 auto' }}>

        <p style={{ color: '#ff3cac', letterSpacing: '3px', fontSize: '13px',
                    textTransform: 'uppercase', marginBottom: '12px' }}>
          My Work
        </p>
        <h1 className="section-title">
          Featured <span className="grad-text">Projects</span>
        </h1>
        <p className="section-sub">
          A showcase of my dedication to creating impactful, user-focused,
          and visually engaging digital experiences.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '20px',
        }}>
          {projects.map((proj, i) => (
            <div
              key={proj.id}
              onClick={() => setSelectedProject(proj)}
              onMouseEnter={() => setHoveredCard(i)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                background: '#111', borderRadius: '18px', padding: '24px',
                cursor: 'pointer',
                border: `1px solid ${hoveredCard === i ? proj.color : '#222'}`,
                transition: 'all 0.35s cubic-bezier(0.34,1.56,0.64,1)',
                transform: hoveredCard === i ? 'translateY(-8px)' : 'translateY(0)',
                boxShadow: hoveredCard === i ? `0 20px 40px ${proj.color}22` : 'none',
                position: 'relative', overflow: 'hidden',
              }}
            >
              <div style={{
                position: 'absolute', inset: 0,
                background: `radial-gradient(circle at 50% 0%, ${proj.color}11, transparent 60%)`,
                opacity: hoveredCard === i ? 1 : 0,
                transition: 'opacity 0.3s', pointerEvents: 'none',
              }} />

              <div style={{
                height: '3px', borderRadius: '2px', background: proj.color,
                marginBottom: '20px',
                width: hoveredCard === i ? '100%' : '40%',
                transition: 'width 0.4s ease',
              }} />

              <div style={{ display: 'flex', alignItems: 'center',
                            gap: '12px', marginBottom: '12px' }}>
                <span style={{
                  fontSize: '32px', display: 'block',
                  transform: hoveredCard === i ? 'scale(1.2) rotate(-5deg)' : 'scale(1)',
                  transition: 'transform 0.3s cubic-bezier(0.34,1.56,0.64,1)',
                  filter: hoveredCard === i ? `drop-shadow(0 0 8px ${proj.color})` : 'none',
                }}>{proj.icon}</span>
                <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#fff',
                             fontFamily: 'Syne, sans-serif' }}>{proj.title}</h3>
              </div>

              <p style={{ color: '#666', fontSize: '14px',
                          lineHeight: 1.7, marginBottom: '20px' }}>{proj.desc}</p>

              <div style={{ display: 'flex', flexWrap: 'wrap',
                            gap: '6px', marginBottom: '20px' }}>
                {proj.tags.map(tag => (
                  <span key={tag} style={{
                    padding: '3px 10px', borderRadius: '999px',
                    background: `${proj.color}15`, color: proj.color,
                    fontSize: '11px', fontWeight: 500,
                    border: `1px solid ${proj.color}30`,
                  }}>{tag}</span>
                ))}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px',
                            color: proj.color, fontSize: '13px', fontWeight: 700 }}>
                <span>View My Work</span>
                <span style={{
                  fontSize: '18px',
                  transform: hoveredCard === i ? 'translateX(4px)' : 'translateX(0)',
                  transition: 'transform 0.3s',
                }}>→</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
}

export default Projects;