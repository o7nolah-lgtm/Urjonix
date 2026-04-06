import { useEffect, useRef } from 'preact/hooks'
import { Link } from 'wouter'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { HeroCanvas }   from '../components/HeroCanvas.jsx'
import { ProcessCard }  from '../components/ProcessCard.jsx'

gsap.registerPlugin(ScrollTrigger)

// ── SVG icons ──────────────────────────────────────────────────────────────
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

// ── Animated counter ───────────────────────────────────────────────────────
function StatItem({ value, label, suffix = '' }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const num = parseFloat(value)
    ScrollTrigger.create({
      trigger: el,
      start:   'top 85%',
      once:    true,
      onEnter: () => {
        gsap.fromTo(
          { val: 0 },
          { val: num, duration: 1.8, ease: 'power2.out',
            onUpdate() { el.textContent = Math.round(this.targets()[0].val) + suffix } }
        )
      },
    })
  }, [])

  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <div
        ref={ref}
        style={{
          fontFamily: '"Inter Tight", sans-serif',
          fontWeight: 800,
          fontSize: '3rem',
          background: 'linear-gradient(135deg, #FBF5A9, #D4AF37, #B59410)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          lineHeight: 1,
          marginBottom: '0.5rem',
        }}
      >
        0{suffix}
      </div>
      <p
        style={{
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: '0.62rem',
          letterSpacing: '0.18em',
          color: '#6C6C6C',
          textTransform: 'uppercase',
        }}
      >
        {label}
      </p>
    </div>
  )
}

// ── Page ───────────────────────────────────────────────────────────────────
export function Home() {
  const pageRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero text
      gsap.from('.hero-headline', {
        opacity: 0, y: 40, duration: 1.1, ease: 'power3.out', delay: 0.3,
      })
      gsap.from('.hero-sub', {
        opacity: 0, y: 30, duration: 1, ease: 'power3.out', delay: 0.55,
      })
      gsap.from('.hero-cta', {
        opacity: 0, y: 20, duration: 0.8, ease: 'power3.out', delay: 0.8,
      })

      // Scroll-triggered reveals
      gsap.utils.toArray('.gsap-hidden').forEach((el, i) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          opacity: 0, y: 32, duration: 0.85, ease: 'power3.out',
          delay: (el.dataset.delay || 0) * 1,
        })
      })
    }, pageRef)

    return () => ctx.revert()
  }, [])

  return (
    <main ref={pageRef}>
      {/* ═══════════════════════════════════════════════════════════ HERO */}
      <section
        style={{
          position: 'relative',
          minHeight: '100vh',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          overflow: 'hidden',
        }}
      >
        {/* Left — Typography */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: 'clamp(6rem, 12vw, 10rem) clamp(2rem, 5vw, 5rem)',
            zIndex: 2,
            position: 'relative',
          }}
        >
          <p
            class="mono-label hero-headline"
            style={{ marginBottom: '1.5rem', color: '#D4AF37' }}
          >
            Urjionix Technologies — Edge AI
          </p>

          <h1
            class="hero-headline"
            style={{
              fontFamily: '"Inter Tight", sans-serif',
              fontWeight: 900,
              fontSize: 'clamp(2.4rem, 4.5vw, 4rem)',
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              background: 'linear-gradient(135deg, #FBF5A9 0%, #D4AF37 50%, #B59410 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '1.5rem',
            }}
          >
            From Ideas to<br />Integration,<br />Accelerated.
          </h1>

          <p
            class="hero-sub"
            style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: 'clamp(0.72rem, 1.1vw, 0.85rem)',
              color: '#A1A1A1',
              lineHeight: 1.9,
              maxWidth: '480px',
              marginBottom: '2.5rem',
            }}
          >
            Engineering at Pace. Deploying AI Solutions in months, not years.
            Urjionix Technologies bridges the gap between ambitious ideas and
            mission-critical hardware.
          </p>

          <div class="hero-cta" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link href="/capabilities" style={{ textDecoration: 'none' }}>
              <button class="btn-gold">Our Capabilities</button>
            </Link>
            <Link href="/case-study" style={{ textDecoration: 'none' }}>
              <button class="btn-silver">View Case Study</button>
            </Link>
          </div>

          {/* Scroll hint */}
          <div
            style={{
              position: 'absolute',
              bottom: '2.5rem',
              left: 'clamp(2rem, 5vw, 5rem)',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <div
              style={{
                width: '1px',
                height: '40px',
                background: 'linear-gradient(180deg, transparent, #D4AF37)',
                animation: 'pulse-gold 2s ease-in-out infinite',
              }}
            />
            <span
              style={{
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: '0.58rem',
                letterSpacing: '0.2em',
                color: '#6C6C6C',
              }}
            >
              SCROLL
            </span>
          </div>
        </div>

        {/* Right — Canvas */}
        <div
          style={{
            position: 'relative',
            borderLeft: '1px solid rgba(161,161,161,0.08)',
          }}
        >
          <HeroCanvas />
          {/* Gradient bleed left */}
          <div
            style={{
              position: 'absolute',
              top: 0, left: 0, bottom: 0,
              width: '80px',
              background: 'linear-gradient(90deg, #0B0C0E, transparent)',
              pointerEvents: 'none',
              zIndex: 2,
            }}
          />
        </div>

        {/* Bottom gradient */}
        <div
          style={{
            position: 'absolute',
            bottom: 0, left: 0, right: 0,
            height: '120px',
            background: 'linear-gradient(0deg, #0B0C0E, transparent)',
            pointerEvents: 'none',
            zIndex: 3,
            gridColumn: '1 / -1',
          }}
        />
      </section>

      {/* ═════════════════════════════════════════════════════ PHILOSOPHY */}
      <section
        style={{
          padding: 'clamp(5rem, 10vw, 8rem) clamp(2rem, 8vw, 8rem)',
          borderTop: '1px solid rgba(161,161,161,0.08)',
          maxWidth: '1400px',
          margin: '0 auto',
        }}
      >
        <div style={{ maxWidth: '780px' }}>
          <p class="gsap-hidden mono-label" style={{ marginBottom: '1.5rem' }}>
            Philosophy — The Blueprint for Speed
          </p>
          <h2
            class="gsap-hidden"
            style={{
              fontFamily: '"Inter Tight", sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              letterSpacing: '-0.03em',
              color: '#ffffff',
              lineHeight: 1.1,
              marginBottom: '2rem',
            }}
          >
            Monday's vision becomes<br />
            <span
              style={{
                background: 'linear-gradient(135deg, #FBF5A9, #D4AF37, #B59410)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Friday's deployed prototype.
            </span>
          </h2>
          <p
            class="gsap-hidden"
            style={{
              fontSize: '1rem',
              color: '#A1A1A1',
              lineHeight: 1.9,
              maxWidth: '640px',
            }}
          >
            We bypass multi-year engineering cycles to iterate rapidly, maintaining the
            uncompromising quality institutional missions demand. Every sprint is a
            deployment. Every deployment is a lesson. Every lesson accelerates the next
            concept into production.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════ PROCESS CARDS */}
      <section
        style={{
          padding: 'clamp(4rem, 8vw, 6rem) clamp(2rem, 8vw, 8rem)',
          borderTop: '1px solid rgba(161,161,161,0.06)',
          maxWidth: '1400px',
          margin: '0 auto',
        }}
      >
        <div style={{ marginBottom: '3rem' }}>
          <p class="gsap-hidden mono-label" style={{ marginBottom: '0.75rem' }}>
            How We Build
          </p>
          <h2
            class="gsap-hidden"
            style={{
              fontFamily: '"Inter Tight", sans-serif',
              fontWeight: 700,
              fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
              letterSpacing: '-0.02em',
              color: '#ffffff',
            }}
          >
            The Three-Phase Loop
          </h2>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5px',
            background: 'rgba(161,161,161,0.08)',
          }}
        >
          <ProcessCard
            step={1}
            title="Ideate & Prototype"
            description="From whiteboard to working hardware in one sprint. We validate the concept with a functional prototype before a single production BOM is committed."
            icon={<IconIdeate />}
            delay={0}
          />
          <ProcessCard
            step={2}
            title="Integrate & Validate"
            description="Camera stacks, Jetson compute, custom PCBs, and firmware—integrated and stress-tested against mission parameters before field deployment."
            icon={<IconIntegrate />}
            delay={0.08}
          />
          <ProcessCard
            step={3}
            title="Deploy & Scale"
            description="From one unit to institutional-scale rollout. Operational monitoring, data sync pipelines, and field support built in from day one."
            icon={<IconDeploy />}
            delay={0.16}
          />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════ STATS */}
      <section
        style={{
          borderTop:    '1px solid rgba(161,161,161,0.08)',
          borderBottom: '1px solid rgba(161,161,161,0.08)',
          background:   '#161718',
        }}
      >
        <div
          style={{
            maxWidth: '1400px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          }}
        >
          {[
            { value: '6',   suffix: 'mo', label: 'Avg. Time to Deploy' },
            { value: '99',  suffix: '%',  label: 'Face Match Accuracy' },
            { value: '12',  suffix: 'ms', label: 'Edge Inference Latency' },
            { value: '500', suffix: '+',  label: 'Concurrent Detections' },
          ].map((s) => (
            <div
              key={s.label}
              style={{
                borderRight: '1px solid rgba(161,161,161,0.08)',
              }}
            >
              <StatItem {...s} />
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════ CTA */}
      <section
        style={{
          padding: 'clamp(5rem, 10vw, 8rem) clamp(2rem, 8vw, 8rem)',
          maxWidth: '1400px',
          margin: '0 auto',
        }}
      >
        <div
          class="gsap-hidden"
          style={{
            border: '1px solid rgba(212,175,55,0.3)',
            padding: 'clamp(3rem, 6vw, 5rem)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '2rem',
            background: 'rgba(212,175,55,0.02)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Corner accents */}
          {[
            { top: 0, left: 0, right: 'auto', bottom: 'auto' },
            { top: 0, right: 0, left: 'auto', bottom: 'auto' },
            { bottom: 0, left: 0, top: 'auto', right: 'auto' },
            { bottom: 0, right: 0, top: 'auto', left: 'auto' },
          ].map((pos, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                ...pos,
                width: '16px',
                height: '16px',
                borderTop:    (pos.top === 0 || pos.top === '0') ? '1px solid #D4AF37' : 'none',
                borderBottom: (pos.bottom === 0 || pos.bottom === '0') ? '1px solid #D4AF37' : 'none',
                borderLeft:   (pos.left === 0 || pos.left === '0') ? '1px solid #D4AF37' : 'none',
                borderRight:  (pos.right === 0 || pos.right === '0') ? '1px solid #D4AF37' : 'none',
              }}
            />
          ))}

          <div>
            <p class="mono-label" style={{ marginBottom: '0.75rem', color: '#D4AF37' }}>
              Ready to Scale
            </p>
            <h2
              style={{
                fontFamily: '"Inter Tight", sans-serif',
                fontWeight: 800,
                fontSize: 'clamp(1.8rem, 3vw, 2.8rem)',
                letterSpacing: '-0.02em',
                color: '#ffffff',
              }}
            >
              Scaling the Future.
            </h2>
          </div>

          <Link href="/contact" style={{ textDecoration: 'none' }}>
            <button class="btn-gold" style={{ fontSize: '0.8rem', padding: '1rem 2.5rem' }}>
              Contact Us →
            </button>
          </Link>
        </div>
      </section>
    </main>
  )
}
