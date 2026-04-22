import { useEffect, useRef } from 'preact/hooks'
import { Link } from 'wouter'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { HeroCanvas }    from '../components/HeroCanvas.jsx'
import { ProcessCard }   from '../components/ProcessCard.jsx'
import { ScrambleText }  from '../components/ScrambleText.jsx'

gsap.registerPlugin(ScrollTrigger)

const GOLD   = '#D4AF37'
const GOLD_A = (a) => `rgba(212,175,55,${a})`

// ── Icons ─────────────────────────────────────────────────────────────────
const IconIdeate = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
    <circle cx="12" cy="12" r="3"/>
    <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
  </svg>
)
const IconIntegrate = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
    <rect x="2" y="6" width="6" height="6" rx="0.5"/>
    <rect x="16" y="6" width="6" height="6" rx="0.5"/>
    <rect x="9" y="14" width="6" height="6" rx="0.5"/>
    <line x1="8" y1="9" x2="16" y2="9"/>
    <line x1="12" y1="12" x2="12" y2="14"/>
  </svg>
)
const IconDeploy = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
    <polygon points="12,2 22,20 2,20"/>
    <line x1="12" y1="10" x2="12" y2="15"/>
    <circle cx="12" cy="17.5" r="0.8" fill="currentColor"/>
  </svg>
)

// ── Marquee Ticker ────────────────────────────────────────────────────────
const TICKER_ITEMS = [
  'COMPUTER VISION', 'AUTONOMOUS ROBOTS', 'EDGE COMPUTE', 'REAL-TIME AI',
  'NVIDIA JETSON', 'ROS2', 'SMART SURVEILLANCE', 'CUSTOM ROBOTICS',
  'ON-DEVICE INFERENCE', 'MACHINE PERCEPTION', 'INDUSTRIAL AI', 'LORAWWAN',
]

function Marquee() {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS]
  return (
    <div style={{
      borderTop: '1px solid var(--clr-border-dim)',
      borderBottom: '1px solid var(--clr-border-dim)',
      background: 'var(--clr-muted)',
      overflow: 'hidden',
      padding: '14px 0',
      transition: 'background 0.35s ease',
    }}>
      <div class="marquee-track">
        {items.map((item, i) => (
          <span key={i} style={{
            display: 'inline-flex', alignItems: 'center', gap: '1.5rem',
            padding: '0 2.5rem',
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: '0.58rem', letterSpacing: '0.22em',
            color: i % 4 === 0 ? GOLD : 'var(--clr-ticker-dim)',
            textTransform: 'uppercase', whiteSpace: 'nowrap',
          }}>
            {item}
            <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: GOLD_A(0.3), flexShrink: 0 }} />
          </span>
        ))}
      </div>
    </div>
  )
}

// ── Old Way vs Urjionix Way ───────────────────────────────────────────────
const OLD_VS_NEW = [
  ['Months of vendor back-and-forth',     'Prototype in days, not months'],
  ['Cloud-dependent, high-latency AI',    'On-device inference — zero cloud lag'],
  ['Separate AI, hardware & robotics teams', 'One team — AI + Robotics + Hardware'],
  ['Off-the-shelf software, poor fit',    'Custom-built for your exact environment'],
  ['No field support post-delivery',      'Ongoing monitoring & deployment support'],
  ['Opaque progress, slow feedback loops','Rapid iteration with you in the loop'],
]

function CompareSection() {
  return (
    <section style={{
      borderTop: '1px solid var(--clr-border-dim)',
      padding: 'clamp(4rem,10vw,7rem) clamp(1.5rem,8vw,8rem)',
      maxWidth: '1400px', margin: '0 auto',
    }}>
      <ScrambleText text="THE PROBLEM WE SOLVE" class="gsap-hidden mono-label" style={{ display: 'block', marginBottom: '0.75rem' }} duration={900} />
      <h2 class="gsap-hidden" style={{
        fontFamily: '"Inter Tight", sans-serif', fontWeight: 800,
        fontSize: 'clamp(1.8rem,4vw,3rem)', letterSpacing: '-0.03em',
        color: 'var(--clr-text)', lineHeight: 1.1, marginBottom: '3rem',
      }}>
        The old way is{' '}
        <span style={{
          background: 'linear-gradient(135deg, #FBF5A9, #D4AF37, #B59410)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
        }}>
          broken.
        </span>
      </h2>

      {/* Mobile — just the Urjionix Way */}
      <div class="gsap-hidden compare-mobile">
        <p style={{
          fontFamily: '"JetBrains Mono", monospace', fontSize: '0.52rem',
          letterSpacing: '0.2em', color: GOLD, textTransform: 'uppercase',
          marginBottom: '0.5rem',
        }}>Urjionix Way</p>
        {OLD_VS_NEW.map(([, neo], i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'flex-start', gap: '12px',
            padding: '0.9rem 1rem',
            background: GOLD_A(0.04),
            border: `1px solid ${GOLD_A(0.15)}`,
            borderLeft: `2px solid ${GOLD_A(0.5)}`,
            borderRadius: '2px',
          }}>
            <span style={{ color: GOLD, fontSize: '0.75rem', flexShrink: 0, marginTop: '1px' }}>✓</span>
            <p style={{ fontSize: '0.85rem', color: 'var(--clr-light)', lineHeight: 1.5 }}>{neo}</p>
          </div>
        ))}
      </div>

      {/* Desktop — full two-column table */}
      <div class="gsap-hidden compare-grid">
        {/* Header row */}
        <div style={{
          background: 'var(--clr-surf)', padding: '1rem 1.5rem',
          borderBottom: `1px solid ${GOLD_A(0.15)}`,
        }}>
          <p style={{
            fontFamily: '"JetBrains Mono", monospace', fontSize: '0.58rem',
            letterSpacing: '0.2em', color: 'var(--clr-faint)', textTransform: 'uppercase',
          }}>The Old Way</p>
        </div>
        <div style={{
          background: GOLD_A(0.05), padding: '1rem 1.5rem',
          borderBottom: `1px solid ${GOLD_A(0.25)}`,
          borderLeft: `2px solid ${GOLD}`,
        }}>
          <p style={{
            fontFamily: '"JetBrains Mono", monospace', fontSize: '0.58rem',
            letterSpacing: '0.2em', color: GOLD, textTransform: 'uppercase',
          }}>Urjionix Way</p>
        </div>

        {/* Rows */}
        {OLD_VS_NEW.map(([old, neo], i) => (
          <>
            <div key={`old-${i}`} style={{
              background: 'var(--clr-surf2)', padding: '1.1rem 1.5rem',
              borderBottom: '1px solid var(--clr-border-faint)',
              display: 'flex', alignItems: 'center', gap: '12px',
            }}>
              <span style={{ color: 'var(--clr-dim)', fontSize: '0.7rem', flexShrink: 0 }}>✕</span>
              <p style={{ fontSize: '0.83rem', color: 'var(--clr-faint)', lineHeight: 1.5 }}>{old}</p>
            </div>
            <div key={`new-${i}`} style={{
              background: GOLD_A(0.03), padding: '1.1rem 1.5rem',
              borderBottom: '1px solid var(--clr-border-faint)',
              borderLeft: `2px solid ${GOLD_A(0.2)}`,
              display: 'flex', alignItems: 'center', gap: '12px',
            }}>
              <span style={{ color: GOLD, fontSize: '0.7rem', flexShrink: 0 }}>✓</span>
              <p style={{ fontSize: '0.83rem', color: 'var(--clr-light)', lineHeight: 1.5 }}>{neo}</p>
            </div>
          </>
        ))}
      </div>
    </section>
  )
}

// ── Industries We Serve ───────────────────────────────────────────────────
const IND_ICON = ({ d, d2 }) => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#D4AF37" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <path d={d}/>{d2 && <path d={d2} strokeOpacity="0.45"/>}
  </svg>
)

const INDUSTRIES = [
  { icon: <IND_ICON d="M4 28V14l12-10 12 10v14H20v-8h-8v8H4z"/>,                                                                                   label: 'Smart Cities' },
  { icon: <IND_ICON d="M4 10h24v18H4zM4 10l4-6h16l4 6M13 28v-8h6v8" d2="M13 14h6v6h-6z"/>,                                                         label: 'Retail & Malls' },
  { icon: <IND_ICON d="M3 22h26M6 22v-3a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v3M9 17V14M23 17V14M8 25a2 2 0 1 0 4 0 2 2 0 0 0-4 0M20 25a2 2 0 1 0 4 0 2 2 0 0 0-4 0"/>, label: 'Traffic & Roads' },
  { icon: <IND_ICON d="M2 28V16l6-8v8h4V8l6-6v10h4V12l4 4v12H2z"/>,                                                                                label: 'Industrial' },
  { icon: <IND_ICON d="M16 4l10 6v8c0 5-4.5 9.5-10 12C10.5 27.5 6 23 6 18v-8L16 4z" d2="M12 16l3 3 5-5"/>,                                        label: 'Security' },
  { icon: <IND_ICON d="M16 28C10 22 4 18 4 12a8 8 0 0 1 16 0 8 8 0 0 1 8 0c0 6-6 10-12 16z"/>,                                                    label: 'Agriculture' },
  { icon: <IND_ICON d="M16 4a5 5 0 0 1 0 10M8 28v-2a8 8 0 0 1 16 0v2M10 14h2M20 14h2" d2="M16 14v4"/>,                                            label: 'Healthcare' },
  { icon: <IND_ICON d="M4 10h24l-2 14H6L4 10zM4 10l2-4h20l2 4M12 10v4M20 10v4"/>,                                                                  label: 'Logistics' },
]

function IndustriesSection() {
  return (
    <section style={{
      borderTop: '1px solid var(--clr-border-dim)',
      padding: 'clamp(3rem,8vw,6rem) clamp(1.5rem,8vw,8rem)',
      maxWidth: '1400px', margin: '0 auto',
    }}>
      <p class="gsap-hidden mono-label" style={{ marginBottom: '0.75rem' }}>Industries We Serve</p>
      <h2 class="gsap-hidden" style={{
        fontFamily: '"Inter Tight", sans-serif', fontWeight: 800,
        fontSize: 'clamp(1.6rem,3vw,2.6rem)', letterSpacing: '-0.02em',
        color: 'var(--clr-text)', marginBottom: '2.5rem',
      }}>
        Built for the Real World.
      </h2>

      <div class="gsap-hidden" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
        gap: '1.5px', background: GOLD_A(0.04),
      }}>
        {INDUSTRIES.map(({ icon, label }) => (
          <div key={label} style={{
            background: 'var(--clr-surf2)', padding: '1.75rem 1.25rem',
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            gap: '0.75rem', transition: 'background 0.2s',
            cursor: 'default',
          }}
          onMouseEnter={e => e.currentTarget.style.background = GOLD_A(0.06)}
          onMouseLeave={e => e.currentTarget.style.background = 'var(--clr-surf2)'}
          >
            <span style={{ lineHeight: 1 }}>{icon}</span>
            <p style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: '0.56rem', letterSpacing: '0.16em',
              color: 'var(--clr-muted-text)', textTransform: 'uppercase', textAlign: 'center',
            }}>{label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

// ── Tech Stack ────────────────────────────────────────────────────────────
const STACK = [
  { name: 'NVIDIA Jetson',  sub: 'Edge Compute' },
  { name: 'ROS 2',          sub: 'Robotics OS' },
  { name: 'PyTorch',        sub: 'AI Framework' },
  { name: 'CUDA',           sub: 'GPU Inference' },
  { name: 'TensorRT',       sub: 'Optimisation' },
  { name: 'OpenCV',         sub: 'Vision Pipeline' },
  { name: 'LoRaWAN',        sub: 'Connectivity' },
  { name: '4G / LTE',       sub: 'Cellular Sync' },
]

function TechStackSection() {
  const doubled = [...STACK, ...STACK]
  return (
    <section style={{
      background: 'var(--clr-muted)',
      borderTop: '1px solid var(--clr-border-dim)',
      borderBottom: '1px solid var(--clr-border-dim)',
      padding: '2rem 0',
      overflow: 'hidden',
      transition: 'background 0.35s ease',
    }}>
      <p style={{
        fontFamily: '"JetBrains Mono", monospace',
        fontSize: '0.52rem', letterSpacing: '0.22em',
        color: 'var(--clr-very-dim)', textTransform: 'uppercase',
        textAlign: 'center', marginBottom: '1.25rem',
      }}>Built On</p>

      <div style={{ overflow: 'hidden' }}>
        <div class="marquee-track" style={{ animationDuration: '35s' }}>
          {doubled.map(({ name, sub }, i) => (
            <div key={i} style={{
              display: 'inline-flex', flexDirection: 'column', gap: '3px',
              padding: '0.6rem 1.4rem',
              margin: '0 6px',
              border: `1px solid ${GOLD_A(0.2)}`,
              borderRadius: '3px',
              background: GOLD_A(0.04),
              flexShrink: 0,
            }}>
              <span style={{
                fontFamily: '"Inter Tight", sans-serif', fontWeight: 700,
                fontSize: '0.85rem', color: 'var(--clr-text)', whiteSpace: 'nowrap',
              }}>{name}</span>
              <span style={{
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: '0.48rem', letterSpacing: '0.16em',
                color: GOLD_A(0.55), textTransform: 'uppercase', whiteSpace: 'nowrap',
              }}>{sub}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Demo Teaser ───────────────────────────────────────────────────────────
function DemoTeaser() {
  return (
    <section style={{
      borderTop: '1px solid var(--clr-border-dim)',
      padding: 'clamp(3rem,8vw,6rem) clamp(1.5rem,8vw,8rem)',
      maxWidth: '1400px', margin: '0 auto',
    }}>
      <div class="gsap-hidden" style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px,1fr))', gap: '3rem', alignItems: 'center',
      }}>
        {/* Image preview */}
        <div style={{ position: 'relative', lineHeight: 0, borderRadius: '4px', overflow: 'hidden', border: `1px solid ${GOLD_A(0.18)}` }}>
          <img src="/traffic-after.png" alt="AI detection demo" draggable={false}
            style={{ display: 'block', width: '100%', height: 'auto', opacity: 0.85 }} />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to top, rgba(var(--clr-bg-rgb),0.7) 0%, transparent 50%)',
            pointerEvents: 'none',
          }} />
          <div style={{
            position: 'absolute', bottom: '14px', left: '14px',
            fontFamily: '"JetBrains Mono", monospace', fontSize: '0.55rem',
            letterSpacing: '0.16em', color: GOLD,
            background: 'rgba(var(--clr-bg-rgb),0.75)', padding: '4px 10px', borderRadius: '2px',
            border: `1px solid ${GOLD_A(0.3)}`, textTransform: 'uppercase',
          }}>Live AI Demo</div>
        </div>

        {/* Text */}
        <div>
          <p style={{
            fontFamily: '"JetBrains Mono", monospace', fontSize: '0.58rem',
            letterSpacing: '0.2em', color: GOLD, textTransform: 'uppercase', marginBottom: '1rem',
          }}>See It In Action</p>
          <h2 style={{
            fontFamily: '"Inter Tight", sans-serif', fontWeight: 800,
            fontSize: 'clamp(1.6rem,3vw,2.4rem)', letterSpacing: '-0.025em',
            color: 'var(--clr-text)', lineHeight: 1.15, marginBottom: '1rem',
          }}>
            Watch the AI work.<br />
            <span style={{
              background: 'linear-gradient(135deg, #FBF5A9, #D4AF37, #B59410)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>Then drag the slider.</span>
          </h2>
          <p style={{
            fontSize: '0.88rem', color: 'var(--clr-muted-text)', lineHeight: 1.8, marginBottom: '2rem', maxWidth: '400px',
          }}>
            Our Capabilities page has live before/after showcases for traffic management
            and retail intelligence — real deployments, real AI output.
          </p>
          <Link href="/capabilities" style={{ textDecoration: 'none' }}>
            <button class="btn-gold" style={{ fontSize: '0.75rem' }}>
              Explore Capabilities →
            </button>
          </Link>
        </div>
      </div>
    </section>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────
export function Home() {
  const pageRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.hero-headline',
        { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1.1, ease: 'power3.out', delay: 0.3 })
      gsap.fromTo('.hero-sub',
        { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.55 })
      gsap.fromTo('.hero-cta',
        { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.8 })
      gsap.utils.toArray('.gsap-hidden').forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, y: 32 },
          { opacity: 1, y: 0, duration: 0.85, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 88%', once: true },
            delay: (el.dataset.delay || 0) * 1,
          }
        )
      })
    }, pageRef)
    return () => ctx.revert()
  }, [])

  return (
    <main ref={pageRef}>

      {/* ══════════════════════════════════════════════════════════ HERO */}
      <section class="hero-grid">
        <div class="hero-text-col" style={{
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
          padding: 'clamp(6rem, 12vw, 10rem) clamp(1.5rem, 5vw, 5rem)',
          zIndex: 2, position: 'relative',
        }}>
          <ScrambleText
            text="URJIONIX TECHNOLOGIES — AI & ROBOTICS"
            class="hero-headline"
            style={{ display: 'block', marginBottom: '1.5rem', color: GOLD, fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}
            delay={400} duration={1200}
          />
          <h1 class="hero-headline" style={{
            fontFamily: '"Inter Tight", sans-serif', fontWeight: 900,
            fontSize: 'clamp(2rem, 5vw, 4rem)', lineHeight: 1.05,
            letterSpacing: '-0.03em',
            background: 'linear-gradient(135deg, #FBF5A9 0%, #D4AF37 50%, #B59410 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            backgroundClip: 'text', marginBottom: '1.5rem',
          }}>
            From Ideas to<br />Integration,<br />Accelerated.
          </h1>
          <p class="hero-sub" style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: 'clamp(0.65rem, 1.5vw, 0.85rem)',
            color: 'var(--clr-sub)', lineHeight: 1.9,
            maxWidth: '480px', marginBottom: '2.5rem',
          }}>
            We build AI and Robotics systems that work in the real world —
            intelligent vision, autonomous machines, and edge compute
            deployed fast, at scale.
          </p>
          <div class="hero-cta" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link href="/capabilities" style={{ textDecoration: 'none' }}>
              <button class="btn-gold">Our Capabilities</button>
            </Link>
            <Link href="/contact" style={{ textDecoration: 'none' }}>
              <button class="btn-silver">Get In Touch</button>
            </Link>
          </div>
          <div class="hide-mobile" style={{
            position: 'absolute', bottom: '2.5rem',
            left: 'clamp(1.5rem, 5vw, 5rem)',
            display: 'flex', alignItems: 'center', gap: '10px',
          }}>
            <div style={{
              width: '1px', height: '40px',
              background: 'linear-gradient(180deg, transparent, #D4AF37)',
              animation: 'pulse-gold 2s ease-in-out infinite',
            }} />
            <span style={{
              fontFamily: '"JetBrains Mono", monospace', fontSize: '0.58rem',
              letterSpacing: '0.2em', color: 'var(--clr-muted-text)',
            }}>SCROLL</span>
          </div>
        </div>

        <div class="hero-canvas-col">
          <HeroCanvas />
          <div style={{
            position: 'absolute', top: 0, left: 0, bottom: 0, width: '60px',
            background: 'linear-gradient(90deg, var(--clr-bg), transparent)',
            pointerEvents: 'none', zIndex: 2,
          }} />
        </div>

        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '100px',
          background: 'linear-gradient(0deg, var(--clr-bg), transparent)',
          pointerEvents: 'none', zIndex: 3, gridColumn: '1 / -1',
        }} />
      </section>

      {/* ════════════════════════════════════════════════════════ MARQUEE */}
      <Marquee />

      {/* ══════════════════════════════════════════════════ OLD VS NEW */}
      <CompareSection />

      {/* ══════════════════════════════════════════════ FIELD IMAGE */}
      <section style={{
        position: 'relative', overflow: 'hidden',
        height: 'clamp(320px, 50vw, 560px)',
      }}>
        <img
          src="/robotics-engineer.png"
          alt="Engineer working with industrial robot"
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'center 30%',
            filter: 'brightness(0.45) saturate(0.7)',
          }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(90deg, rgba(var(--clr-bg-rgb),0.92) 0%, rgba(var(--clr-bg-rgb),0.5) 50%, rgba(var(--clr-bg-rgb),0.1) 100%)',
        }} />
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '120px',
          background: 'linear-gradient(0deg, var(--clr-bg), transparent)',
        }} />
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '80px',
          background: 'linear-gradient(180deg, var(--clr-bg), transparent)',
        }} />

        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
          padding: 'clamp(2rem, 8vw, 8rem)',
          maxWidth: '680px',
        }}>
          <ScrambleText text="IN THE FIELD" style={{ display: 'block', fontSize: '0.58rem', letterSpacing: '0.22em', color: GOLD_A(0.7), textTransform: 'uppercase', marginBottom: '1rem' }} duration={900} />
          <h2 style={{
            fontFamily: '"Inter Tight", sans-serif', fontWeight: 900,
            fontSize: 'clamp(1.8rem, 4vw, 3.2rem)', letterSpacing: '-0.03em',
            color: '#fff', lineHeight: 1.1, marginBottom: '1rem',
          }}>
            Built by engineers.<br />
            <span style={{
              background: 'linear-gradient(135deg, #FBF5A9, #D4AF37, #B59410)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>
              For the real world.
            </span>
          </h2>
          <p style={{
            fontSize: '0.88rem', color: 'rgba(255,255,255,0.45)',
            lineHeight: 1.8, maxWidth: '420px',
          }}>
            We don't just write code. We get on the floor, wire the hardware,
            and make sure it works before we leave.
          </p>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════ PROCESS CARDS */}
      <section class="section-px" style={{
        padding: 'clamp(3rem, 8vw, 6rem) clamp(1.5rem, 8vw, 8rem)',
        borderTop: '1px solid var(--clr-border-sub)',
        maxWidth: '1400px', margin: '0 auto',
      }}>
        <div style={{ marginBottom: '3rem' }}>
          <ScrambleText text="HOW WE BUILD" class="gsap-hidden mono-label" style={{ display: 'block', marginBottom: '0.75rem' }} duration={800} />
          <h2 class="gsap-hidden" style={{
            fontFamily: '"Inter Tight", sans-serif', fontWeight: 700,
            fontSize: 'clamp(1.6rem, 3vw, 2.5rem)', letterSpacing: '-0.02em', color: 'var(--clr-text)',
          }}>
            The Three-Phase Loop
          </h2>
        </div>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '1.5px', background: 'var(--clr-border-dim)',
        }}>
          <ProcessCard step={1} title="Ideate & Prototype"
            description="From whiteboard to working AI or robotics prototype in one sprint. We validate the concept with real hardware before committing to production."
            icon={<IconIdeate />} delay={0} />
          <ProcessCard step={2} title="Integrate & Validate"
            description="Vision systems, robotic actuators, Jetson compute, and custom PCBs — integrated and stress-tested against real-world conditions before deployment."
            icon={<IconIntegrate />} delay={0.08} />
          <ProcessCard step={3} title="Deploy & Scale"
            description="From a single robot or camera unit to full institutional-scale rollout. Monitoring, sync pipelines, and field support built in from day one."
            icon={<IconDeploy />} delay={0.16} />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════ INDUSTRIES */}
      <IndustriesSection />

      {/* ══════════════════════════════════════════════════ TECH STACK */}
      <TechStackSection />

      {/* ═══════════════════════════════════════════════════ DEMO TEASER */}
      <DemoTeaser />

      {/* ══════════════════════════════════════════════════════ PILLARS */}
      <section style={{
        borderTop: '1px solid var(--clr-border-dim)',
        borderBottom: '1px solid var(--clr-border-dim)',
        background: 'var(--clr-surf)',
        transition: 'background 0.35s ease',
      }}>
        <div style={{
          maxWidth: '1400px', margin: '0 auto',
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        }}>
          {[
            {
              icon: (
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="#D4AF37" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="8" y="10" width="12" height="10" rx="2"/>
                  <rect x="11" y="6" width="6" height="5" rx="1"/>
                  <circle cx="11.5" cy="13.5" r="1.2" fill="#D4AF37" stroke="none"/>
                  <circle cx="16.5" cy="13.5" r="1.2" fill="#D4AF37" stroke="none"/>
                  <line x1="10" y1="20" x2="10" y2="24"/><line x1="18" y1="20" x2="18" y2="24"/>
                  <line x1="7" y1="24" x2="13" y2="24"/><line x1="15" y1="24" x2="21" y2="24"/>
                  <line x1="4" y1="13" x2="8" y2="13"/><line x1="20" y1="13" x2="24" y2="13"/>
                  <line x1="4" y1="11" x2="4" y2="15"/><line x1="24" y1="11" x2="24" y2="15"/>
                </svg>
              ),
              title: 'Robotics',     body: 'Autonomous machines, actuation systems, and robotic integration built for real environments.'
            },
            {
              icon: (
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="#D4AF37" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
                  <ellipse cx="14" cy="14" rx="10" ry="5.5"/>
                  <circle cx="14" cy="14" r="3"/>
                  <circle cx="14" cy="14" r="1.2" fill="#D4AF37" stroke="none"/>
                  <path d="M 4 14 Q 14 4 24 14" strokeOpacity="0.35"/>
                  <path d="M 4 14 Q 14 24 24 14" strokeOpacity="0.35"/>
                </svg>
              ),
              title: 'AI Vision',    body: 'Computer vision and intelligent perception running fully on-device — no cloud round-trip.'
            },
            {
              icon: (
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="#D4AF37" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="6" width="20" height="14" rx="2"/>
                  <line x1="9" y1="20" x2="9" y2="23"/><line x1="19" y1="20" x2="19" y2="23"/>
                  <line x1="6" y1="23" x2="22" y2="23"/>
                  <path d="M15 9l-3 5h4l-3 5" stroke="#D4AF37" strokeWidth="1.5"/>
                </svg>
              ),
              title: 'Edge Compute', body: 'Low-latency inference on NVIDIA Jetson hardware, deployed where connectivity is not guaranteed.'
            },
            {
              icon: (
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="#D4AF37" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="5" width="8" height="6" rx="1"/>
                  <rect x="17" y="5" width="8" height="6" rx="1"/>
                  <rect x="10" y="17" width="8" height="6" rx="1"/>
                  <line x1="7" y1="11" x2="7" y2="14"/><line x1="21" y1="11" x2="21" y2="14"/>
                  <line x1="7" y1="14" x2="14" y2="14"/><line x1="21" y1="14" x2="14" y2="14"/>
                  <line x1="14" y1="14" x2="14" y2="17"/>
                </svg>
              ),
              title: 'End-to-End',   body: 'From PCB design to firmware to deployment — one team, one roof, zero handoff risk.'
            },
          ].map(({ icon, title, body }) => (
            <div key={title} class="gsap-hidden" style={{
              borderRight: '1px solid var(--clr-border-dim)',
              padding: '2.5rem 2rem',
              display: 'flex', flexDirection: 'column', gap: '0.75rem',
            }}>
              <span style={{ lineHeight: 1 }}>{icon}</span>
              <p style={{
                fontFamily: '"Inter Tight", sans-serif', fontWeight: 700,
                fontSize: '1rem', color: 'var(--clr-text)', letterSpacing: '-0.01em',
              }}>{title}</p>
              <p style={{ fontSize: '0.78rem', color: 'var(--clr-muted-text)', lineHeight: 1.7 }}>{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════ CTA */}
      <section class="section-px" style={{
        padding: 'clamp(4rem, 10vw, 8rem) clamp(1.5rem, 8vw, 8rem)',
        maxWidth: '1400px', margin: '0 auto',
      }}>
        <div class="gsap-hidden" style={{
          border: `1px solid ${GOLD_A(0.3)}`,
          padding: 'clamp(2rem, 5vw, 5rem)',
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', flexWrap: 'wrap',
          gap: '2rem', background: GOLD_A(0.02),
          position: 'relative', overflow: 'hidden',
        }}>
          {/* Corner brackets */}
          {[
            { top: 0,    left: 0,    right: 'auto', bottom: 'auto' },
            { top: 0,    right: 0,   left: 'auto',  bottom: 'auto' },
            { bottom: 0, left: 0,    top: 'auto',   right: 'auto'  },
            { bottom: 0, right: 0,   top: 'auto',   left: 'auto'   },
          ].map((pos, i) => (
            <div key={i} style={{
              position: 'absolute', ...pos, width: '16px', height: '16px',
              borderTop:    pos.top    === 0 ? `1px solid ${GOLD}` : 'none',
              borderBottom: pos.bottom === 0 ? `1px solid ${GOLD}` : 'none',
              borderLeft:   pos.left   === 0 ? `1px solid ${GOLD}` : 'none',
              borderRight:  pos.right  === 0 ? `1px solid ${GOLD}` : 'none',
            }} />
          ))}

          <div>
            <ScrambleText text="GOT A DEPLOYMENT CHALLENGE?" style={{ display: 'block', marginBottom: '0.5rem', color: GOLD, fontSize: '0.65rem', letterSpacing: '0.2em' }} duration={1000} />
            <h2 style={{
              fontFamily: '"Inter Tight", sans-serif', fontWeight: 800,
              fontSize: 'clamp(1.6rem, 3vw, 2.8rem)', letterSpacing: '-0.02em', color: 'var(--clr-text)',
              marginBottom: '0.5rem',
            }}>
              We scope it in 48 hours.
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--clr-faint)', maxWidth: '360px', lineHeight: 1.7 }}>
              Tell us your challenge — AI, Robotics, or Edge. We'll come back with a clear plan, fast.
            </p>
          </div>

          <Link href="/contact" style={{ textDecoration: 'none' }}>
            <button class="btn-gold" style={{ fontSize: '0.8rem', padding: '1rem 2.5rem' }}>
              Start the Conversation →
            </button>
          </Link>
        </div>
      </section>

    </main>
  )
}
