import React, { useState } from 'react';
import axios from 'axios';
import FloatingEmojis from '../components/FloatingEmojis';

function Contact() {

  // ✅ Emoji list inside component
  const contactEmojis = ['💌','📩','🤝','💬','📞','🌟','💜','✉️','🎯','✨'];

  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus('');

    try {
      await axios.post('http://localhost:5000/contact', form);
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
    } catch (error) {
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '14px 18px',
    background: '#1a1a1a',
    border: '1px solid #333',
    borderRadius: '12px',
    color: '#fff',
    fontSize: '15px',
    fontFamily: 'DM Sans, sans-serif',
    outline: 'none',
    transition: 'border-color 0.3s',
    marginBottom: '16px',
    display: 'block'
  };

  return (
    <div style={{
      minHeight: '100vh',
      padding: '100px 40px 60px',
      position: 'relative',   // ✅ required
      overflow: 'hidden'      // ✅ required
    }}>

      {/* ✅ Floating Emojis */}
      <FloatingEmojis emojis={contactEmojis} count={14} />

      {/* Content wrapper */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        maxWidth: '1100px',
        margin: '0 auto'
      }}>

        <p style={{
          color: '#ff3cac',
          letterSpacing: '3px',
          fontSize: '13px',
          textTransform: 'uppercase',
          marginBottom: '12px'
        }}>
          Get In Touch
        </p>

        <h1 className="section-title">
          Contact <span className="grad-text">Me</span>
        </h1>

        <p className="section-sub">
          Fill the form — it saves directly to MongoDB!
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '60px',
          alignItems: 'start'
        }}>

          {/* Left */}
          <div>
            <h3 style={{ fontSize: '22px', marginBottom: '24px' }}>
              Let's talk!
            </h3>

            {[
              { icon: '📍', label: 'Location', value: 'Surat, Gujarat, India' },
              { icon: '🎓', label: 'University', value: 'P P Savani University' },
              { icon: '💻', label: 'Course', value: 'Creative Digital Professional 💜' },
            ].map(item => (
              <div key={item.label} style={{
                display: 'flex',
                gap: '16px',
                marginBottom: '24px'
              }}>
                <span style={{ fontSize: '24px' }}>{item.icon}</span>
                <div>
                  <p style={{
                    color: '#ff3cac',
                    fontSize: '13px',
                    fontWeight: 600
                  }}>
                    {item.label}
                  </p>
                  <p style={{ color: '#ccc' }}>{item.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Right (Form) */}
          <div>
            <form onSubmit={handleSubmit}>

              <label>Your Name</label>
              <input
                style={inputStyle}
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />

              <label>Email Address</label>
              <input
                style={inputStyle}
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
              />

              <label>Message</label>
              <textarea
                style={{ ...inputStyle, height: '130px' }}
                name="message"
                value={form.message}
                onChange={handleChange}
                required
              />

              <button
                type="submit"
                className="btn-grad"
                style={{ width: '100%', opacity: loading ? 0.7 : 1 }}
                disabled={loading}
              >
                {loading ? 'Sending...' : 'Send Message →'}
              </button>

              {/* Status */}
              {status === 'success' && (
                <div style={{
                  marginTop: '16px',
                  padding: '14px',
                  borderRadius: '12px',
                  background: 'rgba(39,174,96,0.1)',
                  border: '1px solid #27ae60',
                  color: '#27ae60',
                  textAlign: 'center'
                }}>
                  ✅ Message saved to MongoDB successfully!
                </div>
              )}

              {status === 'error' && (
                <div style={{
                  marginTop: '16px',
                  padding: '14px',
                  borderRadius: '12px',
                  background: 'rgba(255,60,172,0.1)',
                  border: '1px solid #ff3cac',
                  color: '#ff3cac',
                  textAlign: 'center'
                }}>
                  ❌ Error! Is the Node server running?
                </div>
              )}

            </form>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Contact;