import { useEffect, useRef, useState } from 'preact/hooks'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const GOLD   = '#D4AF37'
const GOLD_A = (a) => `rgba(212,175,55,${a})`

// ── Field ─────────────────────────────────────────────────────────────────
function Field({ label, type = 'text', name, required, placeholder, multiline = false }) {
  const [focused, setFocused] = useState(false)

  const inputStyle = {
    width: '100%',
    background: 'transparent',
    border: 'none',
    borderBottom: `1px solid ${focused ? GOLD : 'rgba(161,161,161,0.18)'}`,
    padding: '0.7rem 0',
    color: '#ffffff',
    fontFamily: '"Inter Tight", sans-serif',
    fontSize: '0.9rem',
    outline: 'none',
    transition: 'border-color 0.25s',
    resize: 'none',
    boxSizing: 'border-box',
  }

  return (
    <div style={{ marginBottom: '2rem' }}>
      <label style={{
        display: 'block',
        fontFamily: '"JetBrains Mono", monospace',
        fontSize: '0.55rem',
        letterSpacing: '0.2em',
        color: focused ? GOLD : '#555',
        marginBottom: '0.4rem',
        textTransform: 'uppercase',
        transition: 'color 0.25s',
      }}>
        {label}{required && <span style={{ color: GOLD, marginLeft: '4px' }}>*</span>}
      </label>
      {multiline
        ? <textarea name={name} placeholder={placeholder} required={required} rows={4}
            style={{ ...inputStyle, display: 'block', lineHeight: 1.7 }}
            onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} />
        : <input type={type} name={name} placeholder={placeholder} required={required}
            style={{ ...inputStyle, display: 'block' }}
            onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} />
      }
    </div>
  )
}

// ── Corner decoration SVG ─────────────────────────────────────────────────
function Corner({ pos }) {
  const s = {
    tl: { top: 0,    left: 0,    transform: 'none' },
    tr: { top: 0,    right: 0,   transform: 'scaleX(-1)' },
    br: { bottom: 0, right: 0,   transform: 'scale(-1)' },
    bl: { bottom: 0, left: 0,    transform: 'scaleY(-1)' },
  }[pos]
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none"
      style={{ position: 'absolute', ...s, opacity: 0.6 }}>
      <path d="M0 18 L0 0 L18 0" stroke={GOLD} strokeWidth="1.2"/>
    </svg>
  )
}

// ── Info block ────────────────────────────────────────────────────────────
function InfoBlock({ icon, label, value, sub, href }) {
  const inner = (
    <div style={{
      display: 'flex', gap: '1.2rem', alignItems: 'flex-start',
      padding: '1.5rem 0',
      borderBottom: '1px solid rgba(161,161,161,0.07)',
      transition: 'opacity 0.2s',
      cursor: href ? 'pointer' : 'default',
    }}
    onMouseEnter={e => { if (href) e.currentTarget.style.opacity = '0.75' }}
    onMouseLeave={e => { if (href) e.currentTarget.style.opacity = '1' }}
    >
      <div style={{
        width: '36px', height: '36px', flexShrink: 0,
        border: `1px solid ${GOLD_A(0.3)}`,
        borderRadius: '3px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '0.9rem',
        background: GOLD_A(0.05),
      }}>
        {icon}
      </div>
      <div>
        <p style={{
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: '0.52rem', letterSpacing: '0.2em',
          color: GOLD, textTransform: 'uppercase', marginBottom: '0.3rem',
        }}>{label}</p>
        <p style={{ fontSize: '0.88rem', color: '#fff', marginBottom: '0.15rem' }}>{value}</p>
        <p style={{ fontSize: '0.72rem', color: '#555', fontFamily: '"JetBrains Mono", monospace' }}>{sub}</p>
      </div>
    </div>
  )
  if (!href) return inner
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', display: 'block' }}>
      {inner}
    </a>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────
export function Contact() {
  const pageRef = useRef(null)
  const [sent, setSent] = useState(false)
  const [selectFocused, setSelectFocused] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.ct-hero',
        { opacity: 0, y: 36 },
        { opacity: 1, y: 0, stagger: 0.12, duration: 1, ease: 'power3.out', delay: 0.2 }
      )
      gsap.utils.toArray('.gsap-hidden').forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 88%', once: true } }
        )
      })
    }, pageRef)
    return () => ctx.revert()
  }, [])

  function handleSubmit(e) {
    e.preventDefault()
    setSent(true)
  }

  return (
    <main ref={pageRef} style={{ background: '#0B0C0E' }}>

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section style={{ position: 'relative', overflow: 'hidden' }}>
        {/* Background radial glow */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse 70% 60% at 50% 0%, rgba(212,175,55,0.07) 0%, transparent 70%)',
        }} />
        {/* Horizontal rule decoration */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
          background: `linear-gradient(90deg, transparent, ${GOLD_A(0.4)}, transparent)`,
        }} />

        <div style={{
          maxWidth: '1400px', margin: '0 auto',
          padding: 'clamp(8rem,16vw,12rem) clamp(2rem,8vw,8rem) clamp(4rem,8vw,6rem)',
        }}>
          <p class="ct-hero mono-label" style={{ marginBottom: '1rem', color: GOLD_A(0.7) }}>
            Contact — Let's Build Together
          </p>
          <h1 class="ct-hero" style={{
            fontFamily: '"Inter Tight", sans-serif',
            fontWeight: 900,
            fontSize: 'clamp(2.8rem, 5.5vw, 5rem)',
            letterSpacing: '-0.03em',
            lineHeight: 1.0,
            maxWidth: '780px',
            color: '#fff',
          }}>
            Have a Problem{' '}
            <span style={{
              background: 'linear-gradient(135deg, #FBF5A9, #D4AF37, #B59410)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>
              Worth Solving?
            </span>
          </h1>
          <p class="ct-hero" style={{
            marginTop: '1.5rem',
            fontSize: '1rem', color: '#5A5A5A', lineHeight: 1.8, maxWidth: '500px',
          }}>
            We work with institutions, operators, and builders on AI and Robotics challenges.
            Tell us what you're building.
          </p>
        </div>
      </section>

      {/* ── Main content ─────────────────────────────────────────────── */}
      <section style={{
        maxWidth: '1400px', margin: '0 auto',
        padding: 'clamp(2rem,6vw,4rem) clamp(2rem,8vw,8rem) clamp(4rem,8vw,6rem)',
      }}>
        <div class="contact-grid">

          {/* ── Left: info ──────────────────────────────────────────── */}
          <div class="gsap-hidden">
            <InfoBlock icon="✉" label="General Enquiries"   value="contact@urjionixtechnologies.com"  sub="Response within 24 hours"     href="mailto:contact@urjionixtechnologies.com" />
            <InfoBlock icon="📞" label="Phone"              value="+91 8076569592"       sub="Mon–Sat, 10am–7pm IST"        href="https://wa.me/918076569592" />
            <InfoBlock icon="⚡" label="Hardware & Robotics" value="edgetechrobotics.com" sub="Edge Tech Robotics — dev kits" href="https://edgetechrobotics.com" />
            <InfoBlock icon="📍" label="Location"            value="India"                sub="Deployments: Nationwide + SEA" href="https://maps.google.com/?q=India" />

            {/* What we work on */}
            <div style={{ marginTop: '2.5rem' }}>
              <p style={{
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: '0.52rem', letterSpacing: '0.2em',
                color: '#444', textTransform: 'uppercase', marginBottom: '1.25rem',
              }}>
                What we work on
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
                {[
                  'Custom AI System Design',
                  'Robotics & Autonomous Systems',
                  'Smart Surveillance & Traffic Systems',
                  'Retail & Mall Intelligence',
                  'Edge Compute Deployments',
                  'Hardware OEM & White-label',
                  'Technical Advisory & Architecture',
                ].map((item, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'center', gap: '12px',
                    padding: '0.6rem 0.9rem',
                    border: '1px solid rgba(161,161,161,0.07)',
                    borderLeft: `2px solid ${GOLD_A(0.35)}`,
                    background: GOLD_A(0.02),
                    borderRadius: '0 2px 2px 0',
                    fontSize: '0.82rem', color: '#A1A1A1',
                  }}>
                    <span style={{ color: GOLD, fontSize: '0.6rem' }}>◆</span>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right: form ─────────────────────────────────────────── */}
          <div class="gsap-hidden" style={{ position: 'relative' }}>
            {/* Outer glow */}
            <div style={{
              position: 'absolute', inset: '-1px',
              background: `linear-gradient(135deg, ${GOLD_A(0.2)}, transparent 50%, ${GOLD_A(0.1)})`,
              borderRadius: '4px', zIndex: 0,
            }} />

            <div style={{
              position: 'relative', zIndex: 1,
              background: '#111214',
              border: '1px solid rgba(161,161,161,0.1)',
              borderRadius: '4px',
              padding: 'clamp(2rem,4vw,3rem)',
              overflow: 'hidden',
            }}>
              {/* Corner decorations */}
              <Corner pos="tl" /><Corner pos="tr" /><Corner pos="br" /><Corner pos="bl" />

              {/* Top gold line */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
                background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`,
                opacity: 0.6,
              }} />

              {sent ? (
                <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
                  <div style={{
                    width: '56px', height: '56px',
                    border: `1px solid ${GOLD}`,
                    borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 1.5rem',
                    color: GOLD, fontSize: '1.4rem',
                    boxShadow: `0 0 24px ${GOLD_A(0.2)}`,
                  }}>✓</div>
                  <h3 style={{
                    fontFamily: '"Inter Tight", sans-serif',
                    fontWeight: 700, fontSize: '1.4rem', color: '#fff', marginBottom: '0.75rem',
                  }}>Message Received</h3>
                  <p style={{ fontSize: '0.85rem', color: '#6C6C6C', lineHeight: 1.8 }}>
                    We'll review your enquiry and respond within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  {/* Form header */}
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: '10px',
                    marginBottom: '2.5rem', paddingBottom: '1.25rem',
                    borderBottom: '1px solid rgba(161,161,161,0.08)',
                  }}>
                    <div style={{
                      width: '8px', height: '8px', borderRadius: '50%',
                      background: GOLD, boxShadow: `0 0 8px ${GOLD}`,
                    }} />
                    <p style={{
                      fontFamily: '"JetBrains Mono", monospace',
                      fontSize: '0.58rem', letterSpacing: '0.2em',
                      color: GOLD, textTransform: 'uppercase',
                    }}>
                      New Enquiry — Urjionix Technologies
                    </p>
                  </div>

                  {/* Name + Org row */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 2rem' }}>
                    <Field label="Full Name"    name="name"  required placeholder="Your name" />
                    <Field label="Organisation" name="org"            placeholder="Company / Institution" />
                  </div>

                  <Field label="Email Address"   name="email" type="email" required placeholder="your@email.com" />
                  <Field label="Phone (optional)" name="phone" type="tel"             placeholder="+91 ..." />

                  {/* Engagement type */}
                  <div style={{ marginBottom: '2rem' }}>
                    <label style={{
                      display: 'block',
                      fontFamily: '"JetBrains Mono", monospace',
                      fontSize: '0.55rem', letterSpacing: '0.2em',
                      color: selectFocused ? GOLD : '#555',
                      marginBottom: '0.4rem', textTransform: 'uppercase',
                      transition: 'color 0.25s',
                    }}>
                      Engagement Type
                    </label>
                    <select name="type"
                      onFocus={() => setSelectFocused(true)}
                      onBlur={() => setSelectFocused(false)}
                      style={{
                        width: '100%',
                        background: '#0B0C0E',
                        border: 'none',
                        borderBottom: `1px solid ${selectFocused ? GOLD : 'rgba(161,161,161,0.18)'}`,
                        padding: '0.7rem 0',
                        color: '#A1A1A1',
                        fontFamily: '"Inter Tight", sans-serif',
                        fontSize: '0.88rem',
                        outline: 'none',
                        cursor: 'pointer',
                        transition: 'border-color 0.25s',
                        boxSizing: 'border-box',
                      }}>
                      <option value="">Select...</option>
                      <option value="custom-ai">Custom AI System Design</option>
                      <option value="robotics">Robotics & Autonomous Systems</option>
                      <option value="surveillance">Smart Surveillance & Traffic Systems</option>
                      <option value="retail">Retail & Mall Intelligence</option>
                      <option value="edge-compute">Edge Compute Deployments</option>
                      <option value="hardware">Hardware OEM & White-label</option>
                      <option value="advisory">Technical Advisory & Architecture</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <Field label="Project Brief" name="brief" required multiline
                    placeholder="Describe your challenge, environment, and timeline..." />

                  <button type="submit" class="btn-gold"
                    style={{ width: '100%', textAlign: 'center', fontSize: '0.75rem', padding: '1.1rem', marginTop: '0.5rem' }}>
                    Submit Enquiry →
                  </button>

                  <p style={{
                    fontFamily: '"JetBrains Mono", monospace',
                    fontSize: '0.5rem', letterSpacing: '0.1em',
                    color: '#2E2E2E', marginTop: '1rem', textAlign: 'center',
                  }}>
                    YOUR DATA IS NEVER SHARED — URJIONIX TECHNOLOGIES PVT LTD
                  </p>
                </form>
              )}
            </div>
          </div>

        </div>
      </section>
    </main>
  )
}
