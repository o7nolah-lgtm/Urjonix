import { useEffect, useRef } from 'preact/hooks'

// ── Text measurement ──────────────────────────────────────────────────────────
function measureText(ctx, text) {
  const m = ctx.measureText(text)
  return { width: m.width, height: (m.actualBoundingBoxAscent ?? 7) + (m.actualBoundingBoxDescent ?? 2) }
}

// ── Constants ─────────────────────────────────────────────────────────────────
const GOLD    = '#D4AF37'
const GOLD_A  = (a) => `rgba(212,175,55,${a})`
const WHT_A   = (a) => `rgba(255,255,255,${a})`
const SLV     = '#A1A1A1'
const SLV_A   = (a) => `rgba(161,161,161,${a})`

// How long the AI takes to "scan" each person (seconds)
const SCAN_DURATION = 2.2
// 80% of people are in the database and get VERIFIED
const VERIFY_RATE   = 0.80

const rnd  = (a, b) => a + Math.random() * (b - a)
const rndI = (a, b) => Math.floor(rnd(a, b))

// ── Person states ─────────────────────────────────────────────────────────────
// 'appearing'  → box is drawing itself (boxT 0→1), no scan yet
// 'scanning'   → box drawn, AI is actively scanning (scanT 0→1, shows progress %)
// 'verified'   → scan complete, person is in database  → gold box + VERIFIED
// 'unknown'    → scan complete, not in database        → dim silver box + UNKNOWN
function spawnPerson(W, H, xOffset = 0) {
  return {
    id:          rndI(10000, 99999),
    x:           rnd(-80, -40) + xOffset,
    y:           rnd(H * 0.36, H * 0.58),
    vx:          rnd(0.20, 0.42),
    vy:          rnd(-0.03, 0.03),
    w:           rnd(38, 52),
    h:           rnd(78, 108),
    conf:        rnd(94.8, 99.9).toFixed(1),   // revealed only after scan
    willVerify:  Math.random() < VERIFY_RATE,
    state:       'appearing',
    boxT:        0,   // 0→1 box draw animation
    scanT:       0,   // 0→1 scan progress
    alpha:       0,
  }
}

// ── Background / scene ────────────────────────────────────────────────────────
function drawGrid(ctx, w, h) {
  ctx.save()
  ctx.strokeStyle = GOLD_A(0.032)
  ctx.lineWidth   = 0.5
  const gs = 48
  for (let x = 0; x < w; x += gs) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke() }
  for (let y = 0; y < h; y += gs) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke() }
  ctx.restore()
}

function drawScanline(ctx, w, h, t) {
  const y    = ((t * 55) % (h + 120)) - 60
  const grad = ctx.createLinearGradient(0, y - 60, 0, y + 60)
  grad.addColorStop(0,   GOLD_A(0))
  grad.addColorStop(0.5, GOLD_A(0.025))
  grad.addColorStop(1,   GOLD_A(0))
  ctx.fillStyle = grad
  ctx.fillRect(0, y - 60, w, 120)
}

function drawScene(ctx, w, h) {
  ctx.save()
  const fy  = h * 0.76
  const vpX = w * 0.5
  const vpY = h * 0.38

  // perspective lines
  ctx.strokeStyle = WHT_A(0.05)
  ctx.lineWidth   = 0.5
  for (let i = 0; i <= 10; i++) {
    const fx = (w / 10) * i
    ctx.beginPath(); ctx.moveTo(fx, h); ctx.lineTo(vpX, vpY); ctx.stroke()
  }

  // horizon
  ctx.strokeStyle = WHT_A(0.1); ctx.lineWidth = 1
  ctx.beginPath(); ctx.moveTo(0, fy); ctx.lineTo(w, fy); ctx.stroke()

  // gate posts
  const postW = w * 0.24
  ;[-1, 1].forEach((s) => {
    const px = vpX + s * postW
    ctx.strokeStyle = WHT_A(0.22); ctx.lineWidth = 1.5
    ctx.beginPath(); ctx.moveTo(px, vpY - 20); ctx.lineTo(px, fy); ctx.stroke()
    ctx.fillStyle = GOLD; ctx.shadowColor = GOLD; ctx.shadowBlur = 6
    ctx.fillRect(px - 5, vpY - 26, 10, 10)
    ctx.shadowBlur = 0
  })
  ctx.strokeStyle = WHT_A(0.22); ctx.lineWidth = 1.5
  ctx.beginPath(); ctx.moveTo(vpX - postW, vpY - 20); ctx.lineTo(vpX + postW, vpY - 20); ctx.stroke()

  ctx.restore()
}

function drawCameraRig(ctx, w, h) {
  const cy = h * 0.07, cx = w * 0.5
  ctx.save()
  ctx.strokeStyle = WHT_A(0.3); ctx.lineWidth = 1.5
  ctx.beginPath(); ctx.moveTo(cx - 70, cy); ctx.lineTo(cx + 70, cy); ctx.stroke()
  ;[-48, 0, 48].forEach((ox) => {
    const camX = cx + ox
    ctx.fillStyle = '#181A1C'; ctx.strokeStyle = WHT_A(0.35); ctx.lineWidth = 0.8
    ctx.fillRect(camX - 9, cy - 5, 18, 14); ctx.strokeRect(camX - 9, cy - 5, 18, 14)
    ctx.fillStyle = '#0B0C0E'; ctx.strokeStyle = GOLD; ctx.lineWidth = 1
    ctx.beginPath(); ctx.arc(camX, cy + 2, 4.5, 0, Math.PI * 2); ctx.fill(); ctx.stroke()
    ctx.strokeStyle = GOLD_A(0.04); ctx.lineWidth = 0.5
    ctx.beginPath()
    ctx.moveTo(camX - 4, cy + 6); ctx.lineTo(camX - 90, h * 0.78)
    ctx.moveTo(camX + 4, cy + 6); ctx.lineTo(camX + 90, h * 0.78)
    ctx.stroke()
  })
  ctx.restore()
}

function drawHub(ctx, cx, cy, t) {
  ctx.save()
  const hw = 72, hh = 46, hx = cx - hw / 2, hy = cy - hh / 2
  const halo = ctx.createRadialGradient(cx, cy, 0, cx, cy, 90)
  halo.addColorStop(0, GOLD_A(0.07)); halo.addColorStop(1, GOLD_A(0))
  ctx.fillStyle = halo; ctx.fillRect(cx - 90, cy - 90, 180, 180)
  ctx.fillStyle = '#1A1C1E'; ctx.strokeStyle = SLV_A(0.5); ctx.lineWidth = 1
  ctx.fillRect(hx, hy, hw, hh); ctx.strokeRect(hx, hy, hw, hh)
  ctx.strokeStyle = GOLD; ctx.lineWidth = 1
  ctx.beginPath(); ctx.moveTo(hx, hy); ctx.lineTo(hx + hw, hy); ctx.stroke()
  ctx.font = 'bold 6.5px "JetBrains Mono", monospace'; ctx.fillStyle = GOLD; ctx.textAlign = 'center'
  ctx.fillText('URJIONIX', cx, cy - 2)
  ctx.font = '5px "JetBrains Mono", monospace'; ctx.fillStyle = SLV
  ctx.fillText('JETSON ORIN NANO', cx, cy + 8)
  const pulse = 0.55 + 0.45 * Math.sin(t * 3.2)
  ctx.fillStyle = GOLD_A(0.6 + 0.4 * pulse); ctx.shadowColor = GOLD; ctx.shadowBlur = 5 + 5 * pulse
  ctx.beginPath(); ctx.arc(hx + hw - 10, hy + 8, 3, 0, Math.PI * 2); ctx.fill(); ctx.shadowBlur = 0
  ctx.setLineDash([3, 4]); ctx.lineDashOffset = -t * 18
  ctx.strokeStyle = GOLD_A(0.35 + 0.2 * Math.sin(t * 1.8)); ctx.lineWidth = 0.8
  ctx.beginPath(); ctx.moveTo(cx, hy); ctx.lineTo(cx, hy - 55); ctx.stroke(); ctx.setLineDash([])
  const ax = cx, ay = hy - 68
  ctx.strokeStyle = GOLD; ctx.lineWidth = 1.5; ctx.shadowColor = GOLD; ctx.shadowBlur = 5
  ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(ax, ay - 18); ctx.stroke()
  ctx.beginPath(); ctx.moveTo(ax - 8, ay - 4); ctx.lineTo(ax, ay - 14); ctx.lineTo(ax + 8, ay - 4); ctx.stroke()
  ;[1, 2, 3].forEach((i) => {
    ctx.strokeStyle = GOLD_A(Math.max(0, Math.sin(t * 2.2 - i * 0.9)) * 0.5)
    ctx.lineWidth = 0.6; ctx.shadowBlur = 2
    ctx.beginPath(); ctx.arc(ax, ay - 10, i * 11, -Math.PI * 0.7, -Math.PI * 0.3); ctx.stroke()
  })
  ctx.shadowBlur = 0; ctx.restore()
}

// ── Person rendering ──────────────────────────────────────────────────────────
function drawSilhouette(ctx, p) {
  if (p.alpha < 0.02) return
  const { x, y, w: bw, h: bh, alpha } = p
  const cx = x + bw / 2
  ctx.save(); ctx.globalAlpha = alpha * 0.26; ctx.fillStyle = WHT_A(0.6)
  ctx.beginPath(); ctx.arc(cx, y + 11, 7.5, 0, Math.PI * 2); ctx.fill()
  ctx.fillRect(cx - 7, y + 18, 14, 25)
  ctx.fillRect(cx - 7, y + 43, 6, 24); ctx.fillRect(cx + 1, y + 43, 6, 24)
  ctx.restore()
}

function drawBoundingBox(ctx, p, canvasW) {
  if (p.alpha < 0.02 || p.boxT < 0.01) return

  const { x, y, w: bw, h: bh, boxT, scanT, conf, id, state, alpha } = p

  // Color by state
  const col = state === 'verified' ? GOLD
            : state === 'unknown'  ? SLV_A(0.5)
            : SLV  // appearing / scanning → silver

  const cLen = 14 * Math.min(boxT, 1)

  ctx.save()
  ctx.globalAlpha = Math.min(alpha, 0.9)
  ctx.strokeStyle = col
  ctx.lineWidth   = state === 'verified' ? 1.8 : 1.2
  ctx.shadowColor = col
  ctx.shadowBlur  = state === 'verified' ? 7 : 3

  // Corner brackets
  const corners = [
    [x,      y,      +1, +1],
    [x + bw, y,      -1, +1],
    [x,      y + bh, +1, -1],
    [x + bw, y + bh, -1, -1],
  ]
  corners.forEach(([cx2, cy2, sx, sy]) => {
    ctx.beginPath()
    ctx.moveTo(cx2 + sx * cLen, cy2); ctx.lineTo(cx2, cy2); ctx.lineTo(cx2, cy2 + sy * cLen)
    ctx.stroke()
  })

  // Dashed full rect once box is drawn
  if (boxT > 0.5) {
    ctx.globalAlpha = Math.min(alpha, 0.9) * 0.18
    ctx.setLineDash([3, 4]); ctx.strokeRect(x, y, bw, bh); ctx.setLineDash([])
  }

  // Face target circle
  if (boxT > 0.7) {
    const fa = Math.min((boxT - 0.7) / 0.3, 1)
    ctx.globalAlpha = Math.min(alpha, 0.9) * fa * 0.65
    ctx.shadowBlur  = 2
    ctx.beginPath(); ctx.arc(x + bw / 2, y + bh * 0.14, 9, 0, Math.PI * 2); ctx.stroke()
  }

  ctx.globalAlpha = Math.min(alpha, 0.9)
  ctx.shadowBlur  = 0

  // ── SCANNING state: animated sweep line + progress label ────────────────
  if (state === 'scanning') {
    // Sweep line moves top→bottom of box as scanT goes 0→1
    const sweepY = y + bh * scanT
    const sweepGrad = ctx.createLinearGradient(x, sweepY - 8, x, sweepY + 8)
    sweepGrad.addColorStop(0, SLV_A(0))
    sweepGrad.addColorStop(0.5, SLV_A(0.55))
    sweepGrad.addColorStop(1, SLV_A(0))
    ctx.fillStyle = sweepGrad
    ctx.fillRect(x, sweepY - 8, bw, 16)

    // Horizontal scan line
    ctx.strokeStyle = SLV_A(0.7)
    ctx.lineWidth   = 0.8
    ctx.beginPath(); ctx.moveTo(x, sweepY); ctx.lineTo(x + bw, sweepY); ctx.stroke()

    // Label: SCANNING with live percent
    const pct    = Math.floor(scanT * 100)
    ctx.font     = '7.5px "JetBrains Mono", monospace'
    const line1  = `ID: ${id}`
    const line2  = `SCANNING... ${pct}%`
    const lbW    = Math.max(measureText(ctx, line1).width, measureText(ctx, line2).width) + 14
    const lbH    = 24
    const rawLbX = x
    const lbX    = Math.max(4, Math.min(rawLbX, canvasW - lbW - 4))
    const lbY    = y - lbH - 5

    ctx.shadowBlur = 0
    ctx.fillStyle  = 'rgba(11,12,14,0.85)'
    ctx.fillRect(lbX, lbY, lbW, lbH)
    ctx.strokeStyle = SLV_A(0.5); ctx.lineWidth = 0.6
    ctx.strokeRect(lbX, lbY, lbW, lbH)
    ctx.fillStyle = SLV; ctx.fillRect(lbX, lbY, 2, lbH)
    ctx.fillStyle = WHT_A(0.7); ctx.fillText(line1, lbX + 8, lbY + 10)
    ctx.fillStyle = SLV;        ctx.fillText(line2, lbX + 8, lbY + 20)
  }

  // ── VERIFIED state: gold box + ID + confidence ───────────────────────────
  if (state === 'verified') {
    ctx.font     = '7.5px "JetBrains Mono", monospace'
    const line1  = `PERSON_ID: ${id}`
    const line2  = `CONF: ${conf}%  ▮ VERIFIED`
    const lbW    = Math.max(measureText(ctx, line1).width, measureText(ctx, line2).width) + 14
    const lbH    = 24
    const rawLbX = x
    const lbX    = Math.max(4, Math.min(rawLbX, canvasW - lbW - 4))
    const lbY    = y - lbH - 5

    ctx.shadowBlur = 0
    ctx.fillStyle  = 'rgba(11,12,14,0.88)'
    ctx.fillRect(lbX, lbY, lbW, lbH)
    ctx.strokeStyle = GOLD; ctx.lineWidth = 0.6
    ctx.strokeRect(lbX, lbY, lbW, lbH)
    ctx.fillStyle = GOLD; ctx.fillRect(lbX, lbY, 2, lbH)
    ctx.fillStyle = '#ffffff'; ctx.fillText(line1, lbX + 8, lbY + 10)
    ctx.fillStyle = GOLD;     ctx.fillText(line2, lbX + 8, lbY + 20)
  }

  // ── UNKNOWN state: dim box + UNKNOWN ────────────────────────────────────
  if (state === 'unknown') {
    ctx.font     = '7.5px "JetBrains Mono", monospace'
    const line1  = `ID: ${id}`
    const line2  = `◌ NOT IN DATABASE`
    const lbW    = Math.max(measureText(ctx, line1).width, measureText(ctx, line2).width) + 14
    const lbH    = 24
    const rawLbX = x
    const lbX    = Math.max(4, Math.min(rawLbX, canvasW - lbW - 4))
    const lbY    = y - lbH - 5

    ctx.shadowBlur = 0
    ctx.fillStyle  = 'rgba(11,12,14,0.85)'
    ctx.fillRect(lbX, lbY, lbW, lbH)
    ctx.strokeStyle = SLV_A(0.4); ctx.lineWidth = 0.6
    ctx.strokeRect(lbX, lbY, lbW, lbH)
    ctx.fillStyle = SLV_A(0.5); ctx.fillRect(lbX, lbY, 2, lbH)
    ctx.fillStyle = WHT_A(0.5); ctx.fillText(line1, lbX + 8, lbY + 10)
    ctx.fillStyle = SLV_A(0.7); ctx.fillText(line2, lbX + 8, lbY + 20)
  }

  ctx.restore()
}

function drawParticles(ctx, particles) {
  particles.forEach((p) => {
    if (p.alpha < 0.01) return
    ctx.save(); ctx.globalAlpha = p.alpha * 0.6
    ctx.fillStyle = p.gold ? GOLD : '#ffffff'
    ctx.shadowColor = p.gold ? GOLD : '#ffffff'; ctx.shadowBlur = 3
    ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill()
    ctx.restore()
  })
}

function drawHUD(ctx, persons, w, h, t) {
  const verified  = persons.filter((p) => p.state === 'verified').length
  const scanning  = persons.filter((p) => p.state === 'scanning').length
  const active    = persons.filter((p) => p.alpha > 0.3).length

  ctx.save()
  ctx.font      = '7.5px "JetBrains Mono", monospace'
  ctx.textAlign = 'left'

  const rows = [
    ['SYS.STATUS', 'OPERATIONAL'],
    ['IN FRAME',   String(active).padStart(2, '0')],
    ['SCANNING',   String(scanning).padStart(2, '0')],
    ['VERIFIED',   String(verified).padStart(2, '0')],
    ['LATENCY',    `${(11 + Math.sin(t) * 0.4).toFixed(1)} ms`],
    ['SYNC',       'ACTIVE'],
  ]

  rows.forEach(([key, val], i) => {
    const ky = 104 + i * 13
    ctx.fillStyle = GOLD_A(0.5); ctx.fillText(key, 16, ky)
    ctx.fillStyle = '#ffffff';   ctx.fillText(`: ${val}`, 84, ky)
  })

  // Timestamp
  ctx.textAlign = 'right'; ctx.fillStyle = WHT_A(0.28)
  ctx.font      = '6.5px "JetBrains Mono", monospace'
  ctx.fillText(new Date().toISOString().replace('T', ' ').split('.')[0] + ' UTC', w - 14, h - 14)

  // REC
  const recA = 0.5 + 0.5 * Math.sin(t * 2)
  ctx.fillStyle = GOLD_A(recA); ctx.font = '7px "JetBrains Mono", monospace'
  ctx.fillText('● REC', w - 14, 96)

  ctx.restore()
}

// ── Component ─────────────────────────────────────────────────────────────────
export function HeroCanvas() {
  const canvasRef = useRef(null)
  const stateRef  = useRef(null)
  const rafRef    = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const state = { persons: [], particles: [], t: 0 }
    stateRef.current = state

    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    // Stagger initial persons across the screen so they're mid-walk already
    for (let i = 0; i < 5; i++) {
      const p   = spawnPerson(canvas.width, canvas.height)
      // Space them out horizontally so they don't all pile up at the same x
      p.x       = rnd(canvas.width * 0.05, canvas.width * 0.75)
      p.alpha   = rnd(0.4, 1)
      p.boxT    = 1  // box already drawn
      // Pick a random state that makes sense given position
      const progress = p.x / canvas.width
      if (progress < 0.25) {
        p.state = 'scanning'; p.scanT = rnd(0.1, 0.7)
      } else {
        p.state = p.willVerify ? 'verified' : 'unknown'
        p.scanT = 1
      }
      state.persons.push(p)
    }

    // Particles
    for (let i = 0; i < 55; i++) {
      state.particles.push({
        x: rnd(canvas.width * 0.38, canvas.width * 0.62),
        y: rnd(canvas.height * 0.62, canvas.height * 0.78),
        vx: rnd(-0.35, 0.35), vy: rnd(-1.4, -0.4),
        r: rnd(0.8, 2.2), life: rnd(0, 1), alpha: 0,
        gold: Math.random() > 0.45,
      })
    }

    let last = 0

    function frame(ts) {
      const dt = Math.min((ts - last) / 1000, 0.05)
      last = ts; state.t += dt
      const { width: W, height: H } = canvas
      const t = state.t

      ctx.clearRect(0, 0, W, H)
      ctx.fillStyle = '#0B0C0E'; ctx.fillRect(0, 0, W, H)

      // depth fog
      const fog = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, Math.max(W, H) * 0.75)
      fog.addColorStop(0, 'rgba(28,22,8,0.3)'); fog.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = fog; ctx.fillRect(0, 0, W, H)

      drawGrid(ctx, W, H)
      drawScanline(ctx, W, H, t)
      drawScene(ctx, W, H)
      drawCameraRig(ctx, W, H)

      // ── Update + draw persons ────────────────────────────────────────────
      state.persons.forEach((p) => {
        // Move
        p.x += p.vx * 0.45
        p.y += p.vy * 0.18

        // Fade in
        p.alpha = Math.min(1, p.alpha + dt * 0.6)

        // STATE MACHINE ──────────────────────────────────────────────────────
        if (p.state === 'appearing') {
          // Animate box drawing
          p.boxT = Math.min(1, p.boxT + dt * 1.4)
          // Once box is fully drawn, start scanning
          if (p.boxT >= 1) p.state = 'scanning'
        }

        if (p.state === 'scanning') {
          // Advance scan progress
          p.scanT = Math.min(1, p.scanT + dt / SCAN_DURATION)
          // Scan complete → resolve to verified or unknown
          if (p.scanT >= 1) {
            p.state = p.willVerify ? 'verified' : 'unknown'
          }
        }

        // Reset person that walked off-screen
        if (p.x > W + 120) {
          Object.assign(p, spawnPerson(W, H))
        }

        drawSilhouette(ctx, p)
        drawBoundingBox(ctx, p, W)
      })

      drawHub(ctx, W * 0.5, H * 0.76, t)

      // ── Particles ────────────────────────────────────────────────────────
      state.particles.forEach((p) => {
        p.x += p.vx; p.y += p.vy; p.life -= dt * 0.38
        p.alpha = p.life > 0 ? Math.sin(p.life * Math.PI) : 0
        if (p.life <= 0) {
          Object.assign(p, {
            x: rnd(W * 0.40, W * 0.60), y: rnd(H * 0.68, H * 0.78),
            vx: rnd(-0.35, 0.35), vy: rnd(-1.4, -0.4),
            life: rnd(0.5, 1), alpha: 0, gold: Math.random() > 0.45,
          })
        }
      })
      drawParticles(ctx, state.particles)
      drawHUD(ctx, state.persons, W, H, t)

      rafRef.current = requestAnimationFrame(frame)
    }

    rafRef.current = requestAnimationFrame(frame)
    return () => { cancelAnimationFrame(rafRef.current); ro.disconnect() }
  }, [])

  return <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />
}
