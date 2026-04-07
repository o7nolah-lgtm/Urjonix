import { useEffect, useRef, useState } from 'preact/hooks'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ── Minimal input component ───────────────────────────────────────────────
function Field({ label, type = 'text', name, required, placeholder, multiline = false }) {
  const [focused, setFocused] = useState(false)

  const baseStyle = {
    width: '100%',
    background: 'transparent',
    border: 'none',
    borderBottom: `1px solid ${focused ? '#D4AF37' : 'rgba(161,161,161,0.25)'}`,
    padding: '0.75rem 0',
    color: '#ffffff',
    fontFamily: '"Inter Tight", sans-serif',
    fontSize: '0.92rem',
    outline: 'none',
    transition: 'border-color 0.25s ease',
    resize: 'none',
    boxShadow: focused ? '0 1px 0 0 rgba(212,175,55,0.4)' : 'none',
  }

  return (
    <div style={{ marginBottom: '2.2rem' }}>
      <label
        style={{
          display: 'block',
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: '0.58rem',
          letterSpacing: '0.2em',
          color: focused ? '#D4AF37' : '#6C6C6C',
          marginBottom: '0.5rem',
          textTransform: 'uppercase',
          transition: 'color 0.25s ease',
        }}
      >
        {label}{required && <span style={{ color: '#D4AF37', marginLeft: '4px' }}>*</span>}
      </label>
      {multiline ? (
        <textarea
          name={name}
          placeholder={placeholder}
          required={required}
          rows={4}
          style={{ ...baseStyle, display: 'block', lineHeight: 1.7 }}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      ) : (
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          required={required}
          style={{ ...baseStyle, display: 'block' }}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      )}
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────
export function Contact() {
  const pageRef    = useRef(null)
  const [sent, setSent] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.ct-hero', {
        opacity: 0, y: 36, stagger: 0.12, duration: 1, ease: 'power3.out', delay: 0.2,
      })
      gsap.utils.toArray('.gsap-hidden').forEach((el) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          opacity: 0, y: 24, duration: 0.8, ease: 'power3.out',
        })
      })
    }, pageRef)
    return () => ctx.revert()
  }, [])

  function handleSubmit(e) {
    e.preventDefault()
    // In production wire to your backend / Formspree / etc.
    setSent(true)
  }

  return (
    <main ref={pageRef}>
      {/* ─── Hero ──────────────────────────────────────────── */}
      <section
        style={{
          paddingTop:    'clamp(8rem, 16vw, 12rem)',
          paddingBottom: 'clamp(4rem, 8vw,  6rem)',
          paddingLeft:   'clamp(2rem, 8vw,  8rem)',
          paddingRight:  'clamp(2rem, 8vw,  8rem)',
          maxWidth: '1400px',
          margin: '0 auto',
          borderBottom: '1px solid rgba(161,161,161,0.08)',
        }}
      >
        <p class="ct-hero mono-label" style={{ marginBottom: '1rem' }}>
          Contact — Scale the Mission
        </p>
        <h1
          class="ct-hero"
          style={{
            fontFamily: '"Inter Tight", sans-serif',
            fontWeight: 900,
            fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
            letterSpacing: '-0.03em',
            lineHeight: 1.05,
            maxWidth: '700px',
          }}
        >
          Let's Scale{' '}
          <span
            style={{
              background: 'linear-gradient(135deg, #FBF5A9, #D4AF37, #B59410)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            the Mission.
          </span>
        </h1>
      </section>

      {/* ─── Split layout ──────────────────────────────────── */}
      <section
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: 'clamp(3rem, 8vw, 6rem) clamp(1.5rem, 8vw, 8rem)',
        }}
      >
        <div class="contact-grid">
        {/* Left — Info ──────────────────────────────────────── */}
        <div class="gsap-hidden">
          <p
            style={{
              fontSize: '0.92rem',
              color: '#A1A1A1',
              lineHeight: 1.9,
              marginBottom: '3rem',
            }}
          >
            Urjionix works directly with institutions, system integrators, and mission-critical
            operators who need bespoke AI and hardware solutions—not off-the-shelf software.
            If you have a deployment challenge, we want to hear about it.
          </p>

          {/* Info blocks */}
          {[
            {
              label: 'General Enquiries',
              value: 'contact@urjionix.com',
              detail: 'Response within 24 hours',
            },
            {
              label: 'Hardware & Robotics Store',
              value: 'shop.urjionix.com',
              detail: 'Edge Tech Robotics — development kits',
            },
            {
              label: 'Location',
              value: 'India',
              detail: 'Deployments: Nationwide + SEA',
            },
          ].map(({ label, value, detail }) => (
            <div
              key={label}
              style={{
                marginBottom: '2rem',
                paddingBottom: '2rem',
                borderBottom: '1px solid rgba(161,161,161,0.07)',
              }}
            >
              <p
                style={{
                  fontFamily: '"JetBrains Mono", monospace',
                  fontSize: '0.58rem',
                  letterSpacing: '0.2em',
                  color: '#D4AF37',
                  marginBottom: '0.4rem',
                  textTransform: 'uppercase',
                }}
              >
                {label}
              </p>
              <p style={{ fontSize: '0.9rem', color: '#ffffff', marginBottom: '0.2rem' }}>{value}</p>
              <p style={{ fontSize: '0.75rem', color: '#6C6C6C', fontFamily: '"JetBrains Mono", monospace' }}>
                {detail}
              </p>
            </div>
          ))}

          {/* Engagement types */}
          <div style={{ marginTop: '2rem' }}>
            <p
              style={{
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: '0.58rem',
                letterSpacing: '0.2em',
                color: '#6C6C6C',
                marginBottom: '1rem',
                textTransform: 'uppercase',
              }}
            >
              We work on
            </p>
            {[
              'Custom Edge AI System Design',
              'Jetson-based Deployment Contracts',
              'Data Compliance Pipeline Builds',
              'Hardware Kit OEM / White-label',
              'Technical Advisory & Architecture Review',
            ].map((item) => (
              <div
                key={item}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  marginBottom: '0.6rem',
                  fontSize: '0.82rem',
                  color: '#A1A1A1',
                }}
              >
                <span style={{ color: '#D4AF37', flexShrink: 0 }}>→</span>
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Right — Form ─────────────────────────────────────── */}
        <div
          class="gsap-hidden"
          style={{
            background: '#161718',
            border: '1px solid rgba(161,161,161,0.1)',
            padding: 'clamp(2rem, 4vw, 3.5rem)',
            position: 'relative',
          }}
        >
          {/* Gold top accent */}
          <div
            style={{
              position: 'absolute',
              top: 0, left: 0, right: 0,
              height: '1px',
              background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)',
              opacity: 0.5,
            }}
          />

          {sent ? (
            <div style={{ textAlign: 'center', padding: '3rem 0' }}>
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  border: '1px solid #D4AF37',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem',
                  color: '#D4AF37',
                  fontSize: '1.2rem',
                }}
              >
                ✓
              </div>
              <h3
                style={{
                  fontFamily: '"Inter Tight", sans-serif',
                  fontWeight: 700,
                  fontSize: '1.3rem',
                  color: '#ffffff',
                  marginBottom: '0.75rem',
                }}
              >
                Message Received
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#A1A1A1', lineHeight: 1.7 }}>
                We'll review your enquiry and respond within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <p
                style={{
                  fontFamily: '"JetBrains Mono", monospace',
                  fontSize: '0.58rem',
                  letterSpacing: '0.2em',
                  color: '#D4AF37',
                  marginBottom: '2rem',
                  textTransform: 'uppercase',
                }}
              >
                Custom AI & Engineering Enquiry
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 2rem' }}>
                <div style={{ gridColumn: '1' }}>
                  <Field label="Full Name"     name="name"         required placeholder="Your name" />
                </div>
                <div style={{ gridColumn: '2' }}>
                  <Field label="Organisation"  name="org"          placeholder="Company / Institution" />
                </div>
              </div>

              <Field label="Email Address"     name="email"        type="email" required placeholder="your@email.com" />
              <Field label="Phone (optional)"  name="phone"        type="tel"   placeholder="+91 ..." />

              {/* Engagement type select */}
              <div style={{ marginBottom: '2.2rem' }}>
                <label
                  style={{
                    display: 'block',
                    fontFamily: '"JetBrains Mono", monospace',
                    fontSize: '0.58rem',
                    letterSpacing: '0.2em',
                    color: '#6C6C6C',
                    marginBottom: '0.5rem',
                    textTransform: 'uppercase',
                  }}
                >
                  Engagement Type
                </label>
                <select
                  name="type"
                  style={{
                    width: '100%',
                    background: '#0B0C0E',
                    border: 'none',
                    borderBottom: '1px solid rgba(161,161,161,0.25)',
                    padding: '0.75rem 0',
                    color: '#A1A1A1',
                    fontFamily: '"Inter Tight", sans-serif',
                    fontSize: '0.88rem',
                    outline: 'none',
                    cursor: 'pointer',
                  }}
                >
                  <option value="">Select...</option>
                  <option value="edge-ai">Edge AI System Design</option>
                  <option value="jetson">Jetson Deployment Contract</option>
                  <option value="compliance">Data Compliance Pipeline</option>
                  <option value="hardware">Hardware Kit / OEM</option>
                  <option value="advisory">Technical Advisory</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <Field
                label="Project Brief"
                name="brief"
                required
                multiline
                placeholder="Describe your challenge, scale, and timeline..."
              />

              <button
                type="submit"
                class="btn-gold"
                style={{ width: '100%', textAlign: 'center', fontSize: '0.75rem', padding: '1.1rem' }}
              >
                Submit Enquiry →
              </button>

              <p
                style={{
                  fontFamily: '"JetBrains Mono", monospace',
                  fontSize: '0.55rem',
                  letterSpacing: '0.1em',
                  color: '#3C3C3C',
                  marginTop: '1rem',
                  textAlign: 'center',
                }}
              >
                YOUR DATA IS NEVER SHARED — URJIONIX TECHNOLOGIES PVT LTD
              </p>
            </form>
          )}
        </div>
        </div>{/* end contact-grid */}
      </section>
    </main>
  )
}
