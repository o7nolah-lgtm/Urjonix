import { useEffect, useRef } from 'preact/hooks'

// ── Text measurement ─────────────────────────────────────────────────────────
// Uses the Canvas 2D text metrics API — same approach as @chenglou/pretext
// (which measures via an offscreen canvas internally). If the pretext package
// becomes buildable in future it can be swapped in here without any other change.
function measureLabel(ctx, text) {
  const m = ctx.measureText(text)
  return {
    width:  m.width,
    height: (m.actualBoundingBoxAscent ?? 7) + (m.actualBoundingBoxDescent ?? 2),
  }
}

// ── Entity helpers ─────────────────────────────────────────────────────────
const rnd  = (a, b) => a + Math.random() * (b - a)
const rndI = (a, b) => Math.floor(rnd(a, b))

function spawnPerson(canvasW, canvasH) {
  return {
    id:          rndI(10000, 99999),
    x:           rnd(-80, -40),
    y:           rnd(canvasH * 0.38, canvasH * 0.60),
    vx:          rnd(0.18, 0.38),
    vy:          rnd(-0.04, 0.04),
    w:           rnd(36, 50),
    h:           rnd(75, 105),
    conf:        rnd(95.2, 99.9).toFixed(1),
    status:      Math.random() > 0.22 ? 'VERIFIED' : 'SCANNING',
    boxT:        0,   // box draw progress 0→1
    alpha:       0,   // fade in progress 0→1
  }
}

// ── Draw helpers ────────────────────────────────────────────────────────────
const GOLD   = '#D4AF37'
const GOLD_A = (a) => `rgba(212,175,55,${a})`
const WHT_A  = (a) => `rgba(255,255,255,${a})`
const SLV    = '#A1A1A1'

function drawGrid(ctx, w, h) {
  ctx.save()
  ctx.strokeStyle = GOLD_A(0.035)
  ctx.lineWidth   = 0.5
  const gs = 48
  for (let x = 0; x < w; x += gs) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke()
  }
  for (let y = 0; y < h; y += gs) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke()
  }
  ctx.restore()
}

function drawScanline(ctx, w, h, t) {
  const y    = ((t * 55) % (h + 120)) - 60
  const grad = ctx.createLinearGradient(0, y - 60, 0, y + 60)
  grad.addColorStop(0,   GOLD_A(0))
  grad.addColorStop(0.5, GOLD_A(0.028))
  grad.addColorStop(1,   GOLD_A(0))
  ctx.fillStyle = grad
  ctx.fillRect(0, y - 60, w, 120)
}

function drawPerspectiveFloor(ctx, w, h) {
  ctx.save()
  const fy  = h * 0.76
  const vpX = w * 0.5
  const vpY = h * 0.38
  ctx.strokeStyle = WHT_A(0.06)
  ctx.lineWidth = 0.5
  for (let i = 0; i <= 10; i++) {
    const fx = (w / 10) * i
    ctx.beginPath(); ctx.moveTo(fx, h); ctx.lineTo(vpX, vpY); ctx.stroke()
  }
  // horizon
  ctx.strokeStyle = WHT_A(0.12)
  ctx.lineWidth = 1
  ctx.beginPath(); ctx.moveTo(0, fy); ctx.lineTo(w, fy); ctx.stroke()
  // gate posts
  const gx = w * 0.5
  const postW = w * 0.24
  ;[-1, 1].forEach((s) => {
    const px = gx + s * postW
    ctx.strokeStyle = WHT_A(0.25)
    ctx.lineWidth = 1.5
    ctx.beginPath(); ctx.moveTo(px, vpY - 20); ctx.lineTo(px, fy); ctx.stroke()
    // gold cap
    ctx.fillStyle   = GOLD
    ctx.shadowColor = GOLD
    ctx.shadowBlur  = 6
    ctx.fillRect(px - 5, vpY - 26, 10, 10)
    ctx.shadowBlur = 0
  })
  ctx.strokeStyle = WHT_A(0.25)
  ctx.lineWidth = 1.5
  ctx.beginPath()
  ctx.moveTo(gx - postW, vpY - 20)
  ctx.lineTo(gx + postW, vpY - 20)
  ctx.stroke()
  ctx.restore()
}

function drawCameraRig(ctx, w, h) {
  const cy  = h * 0.07
  const cx  = w * 0.5
  ctx.save()
  // arm
  ctx.strokeStyle = WHT_A(0.35)
  ctx.lineWidth   = 1.5
  ctx.beginPath(); ctx.moveTo(cx - 70, cy); ctx.lineTo(cx + 70, cy); ctx.stroke()
  // cameras
  ;[-48, 0, 48].forEach((ox) => {
    const camX = cx + ox
    ctx.fillStyle   = '#181A1C'
    ctx.strokeStyle = WHT_A(0.4)
    ctx.lineWidth   = 0.8
    ctx.fillRect(camX - 9, cy - 5, 18, 14)
    ctx.strokeRect(camX - 9, cy - 5, 18, 14)
    // lens
    ctx.fillStyle   = '#0B0C0E'
    ctx.strokeStyle = GOLD
    ctx.lineWidth   = 1
    ctx.beginPath(); ctx.arc(camX, cy + 2, 4.5, 0, Math.PI * 2); ctx.fill(); ctx.stroke()
    // FOV hint
    ctx.strokeStyle = GOLD_A(0.05)
    ctx.lineWidth   = 0.5
    ctx.beginPath()
    ctx.moveTo(camX - 4, cy + 6); ctx.lineTo(camX - 90, h * 0.78)
    ctx.moveTo(camX + 4, cy + 6); ctx.lineTo(camX + 90, h * 0.78)
    ctx.stroke()
  })
  ctx.restore()
}

function drawHub(ctx, cx, cy, t) {
  ctx.save()
  const hw = 72, hh = 46
  const hx = cx - hw / 2, hy = cy - hh / 2
  // glow halo
  const halo = ctx.createRadialGradient(cx, cy, 0, cx, cy, 90)
  halo.addColorStop(0, GOLD_A(0.07))
  halo.addColorStop(1, GOLD_A(0))
  ctx.fillStyle = halo; ctx.fillRect(cx - 90, cy - 90, 180, 180)
  // body
  ctx.fillStyle   = '#1A1C1E'
  ctx.strokeStyle = SLV + '80'
  ctx.lineWidth   = 1
  ctx.fillRect(hx, hy, hw, hh)
  ctx.strokeRect(hx, hy, hw, hh)
  // gold accent line top
  ctx.strokeStyle = GOLD
  ctx.lineWidth   = 1
  ctx.beginPath(); ctx.moveTo(hx, hy); ctx.lineTo(hx + hw, hy); ctx.stroke()
  // text
  ctx.font      = 'bold 6.5px "JetBrains Mono", monospace'
  ctx.fillStyle = GOLD
  ctx.textAlign = 'center'
  ctx.fillText('URJIONIX', cx, cy - 2)
  ctx.font      = '5px "JetBrains Mono", monospace'
  ctx.fillStyle = SLV
  ctx.fillText('JETSON ORIN NANO', cx, cy + 8)
  // LED
  const pulse = 0.55 + 0.45 * Math.sin(t * 3.2)
  ctx.fillStyle   = GOLD_A(0.6 + 0.4 * pulse)
  ctx.shadowColor = GOLD
  ctx.shadowBlur  = 5 + 5 * pulse
  ctx.beginPath(); ctx.arc(hx + hw - 10, hy + 8, 3, 0, Math.PI * 2); ctx.fill()
  ctx.shadowBlur = 0
  // dashed antenna lead
  ctx.setLineDash([3, 4])
  ctx.lineDashOffset = -t * 18
  ctx.strokeStyle    = GOLD_A(0.35 + 0.2 * Math.sin(t * 1.8))
  ctx.lineWidth      = 0.8
  ctx.beginPath(); ctx.moveTo(cx, hy); ctx.lineTo(cx, hy - 55); ctx.stroke()
  ctx.setLineDash([])
  // antenna icon
  const ax = cx, ay = hy - 68
  ctx.strokeStyle = GOLD
  ctx.lineWidth   = 1.5
  ctx.shadowColor = GOLD
  ctx.shadowBlur  = 5
  ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(ax, ay - 18); ctx.stroke()
  ctx.beginPath()
  ctx.moveTo(ax - 8, ay - 4); ctx.lineTo(ax, ay - 14); ctx.lineTo(ax + 8, ay - 4)
  ctx.stroke()
  // signal arcs
  ;[1, 2, 3].forEach((i) => {
    const ra = Math.max(0, Math.sin(t * 2.2 - i * 0.9)) * 0.5
    ctx.strokeStyle = GOLD_A(ra)
    ctx.lineWidth   = 0.6
    ctx.shadowBlur  = 2
    ctx.beginPath()
    ctx.arc(ax, ay - 10, i * 11, -Math.PI * 0.7, -Math.PI * 0.3)
    ctx.stroke()
  })
  ctx.shadowBlur = 0
  ctx.restore()
}

function drawSilhouette(ctx, p) {
  if (p.alpha < 0.02) return
  const { x, y, w: bw, h: bh, alpha } = p
  const cx = x + bw / 2
  ctx.save()
  ctx.globalAlpha = alpha * 0.28
  ctx.fillStyle   = WHT_A(0.6)
  // head
  ctx.beginPath(); ctx.arc(cx, y + 11, 7.5, 0, Math.PI * 2); ctx.fill()
  // torso
  ctx.fillRect(cx - 7, y + 18, 14, 25)
  // legs
  ctx.fillRect(cx - 7, y + 43, 6, 24)
  ctx.fillRect(cx + 1, y + 43, 6, 24)
  ctx.restore()
}

function drawBoundingBox(ctx, p) {
  if (p.alpha < 0.02) return
  const { x, y, w: bw, h: bh, boxT, conf, id, status, alpha } = p
  const isVerified = status === 'VERIFIED'
  const col        = isVerified ? GOLD : SLV
  const cLen       = 14 * Math.min(boxT, 1)

  ctx.save()
  ctx.globalAlpha = Math.min(alpha, 0.92)
  ctx.strokeStyle = col
  ctx.lineWidth   = 1.5
  ctx.shadowColor = col
  ctx.shadowBlur  = 5

  // corner brackets
  const corners = [
    [x,      y,      +1, +1],
    [x + bw, y,      -1, +1],
    [x,      y + bh, +1, -1],
    [x + bw, y + bh, -1, -1],
  ]
  corners.forEach(([cx2, cy2, sx, sy]) => {
    ctx.beginPath()
    ctx.moveTo(cx2 + sx * cLen, cy2)
    ctx.lineTo(cx2,             cy2)
    ctx.lineTo(cx2,             cy2 + sy * cLen)
    ctx.stroke()
  })

  // dashed full-rect at mid progress
  if (boxT > 0.4) {
    ctx.globalAlpha = Math.min(alpha, 0.92) * 0.25
    ctx.setLineDash([3, 4])
    ctx.strokeRect(x, y, bw, bh)
    ctx.setLineDash([])
  }

  // face circle
  if (boxT > 0.65) {
    const fa = (boxT - 0.65) / 0.35
    ctx.globalAlpha = Math.min(alpha, 0.92) * fa * 0.7
    ctx.shadowBlur  = 3
    ctx.beginPath(); ctx.arc(x + bw / 2, y + bh * 0.14, 9, 0, Math.PI * 2); ctx.stroke()
  }

  // ── metadata label ─────────────────────────────────────────────────────
  if (boxT > 0.82) {
    const la = ((boxT - 0.82) / 0.18)
    ctx.globalAlpha = Math.min(alpha, 0.92) * la

    const fontSpec  = '7.5px "JetBrains Mono", monospace'
    ctx.font        = fontSpec
    const lineH     = 11
    const line1     = `PERSON_ID: ${id}`
    const line2     = `CONF: ${conf}%  ` + (isVerified ? '▮ VERIFIED' : '◌ SCANNING')
    const m1        = measureLabel(ctx, line1, lineH)
    const m2        = measureLabel(ctx, line2, lineH)
    const lbW       = Math.max(m1.width, m2.width) + 14
    const lbH       = lineH * 2 + 8
    const lbX       = x
    const lbY       = y - lbH - 5

    // label bg
    ctx.shadowBlur  = 0
    ctx.fillStyle   = 'rgba(11,12,14,0.88)'
    ctx.fillRect(lbX, lbY, lbW, lbH)
    ctx.strokeStyle = col
    ctx.lineWidth   = 0.6
    ctx.strokeRect(lbX, lbY, lbW, lbH)

    // accent left bar
    ctx.fillStyle = col
    ctx.fillRect(lbX, lbY, 2, lbH)

    // text
    ctx.fillStyle = '#ffffff'
    ctx.fillText(line1, lbX + 8, lbY + lineH)
    ctx.fillStyle = isVerified ? GOLD : SLV
    ctx.fillText(line2, lbX + 8, lbY + lineH * 2 + 2)
  }

  ctx.restore()
}

function drawParticles(ctx, particles) {
  particles.forEach((p) => {
    if (p.alpha < 0.01) return
    ctx.save()
    ctx.globalAlpha = p.alpha * 0.65
    ctx.fillStyle   = p.gold ? GOLD : '#ffffff'
    ctx.shadowColor = p.gold ? GOLD : '#ffffff'
    ctx.shadowBlur  = 3
    ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill()
    ctx.restore()
  })
}

function drawStatusHUD(ctx, persons, w, h, t) {
  const active = persons.filter((p) => p.alpha > 0.5).length
  ctx.save()
  ctx.font      = '7.5px "JetBrains Mono", monospace'
  ctx.textAlign = 'left'

  const rows = [
    ['SYS.STATUS',  'OPERATIONAL'],
    ['DETECTIONS',  String(active).padStart(2, '0')],
    ['LATENCY',     `${(11 + Math.sin(t) * 0.5).toFixed(1)} ms`],
    ['DATA SYNC',   'ACTIVE'],
    ['MODEL',       'YOLOV9-EDGE'],
  ]

  // Start below the 72px fixed header + 16px padding
  rows.forEach(([key, val], i) => {
    const ky = 104 + i * 13
    ctx.fillStyle = GOLD_A(0.5)
    ctx.fillText(key, 16, ky)
    ctx.fillStyle = '#ffffff'
    ctx.fillText(`: ${val}`, 80, ky)
  })

  // timestamp bottom-right
  ctx.textAlign = 'right'
  ctx.fillStyle = WHT_A(0.3)
  ctx.font      = '6.5px "JetBrains Mono", monospace'
  ctx.fillText(new Date().toISOString().replace('T', ' ').split('.')[0] + ' UTC', w - 14, h - 14)

  // REC indicator top-right
  const recAlpha = 0.5 + 0.5 * Math.sin(t * 2)
  ctx.fillStyle  = GOLD_A(recAlpha)
  ctx.textAlign  = 'right'
  ctx.font       = '7px "JetBrains Mono", monospace'
  ctx.fillText('● REC', w - 14, 96)

  ctx.restore()
}

// ── Component ────────────────────────────────────────────────────────────────
export function HeroCanvas() {
  const canvasRef  = useRef(null)
  const stateRef   = useRef(null)
  const rafRef     = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    // Init state
    const state = {
      persons:   [],
      particles: [],
      t:         0,
    }
    stateRef.current = state

    const resize = () => {
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    // Spawn initial persons
    for (let i = 0; i < 6; i++) {
      const p  = spawnPerson(canvas.width, canvas.height)
      p.x     += (canvas.width / 6) * i * 0.6   // stagger start positions
      p.boxT   = rnd(0, 0.6)
      p.alpha  = rnd(0, 0.8)
      state.persons.push(p)
    }

    // Spawn particles
    for (let i = 0; i < 55; i++) {
      state.particles.push({
        x:    rnd(canvas.width * 0.38, canvas.width * 0.62),
        y:    rnd(canvas.height * 0.62, canvas.height * 0.78),
        vx:   rnd(-0.35, 0.35),
        vy:   rnd(-1.4, -0.4),
        r:    rnd(0.8, 2.2),
        life: rnd(0, 1),
        alpha: 0,
        gold: Math.random() > 0.45,
      })
    }

    let last = 0

    function frame(ts) {
      const dt = Math.min((ts - last) / 1000, 0.05)
      last = ts
      state.t += dt

      const { width: W, height: H } = canvas
      const t = state.t

      ctx.clearRect(0, 0, W, H)

      // ── Background ──
      ctx.fillStyle = '#0B0C0E'
      ctx.fillRect(0, 0, W, H)

      // radial depth fog
      const fog = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, Math.max(W, H) * 0.75)
      fog.addColorStop(0, 'rgba(28,22,8,0.35)')
      fog.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = fog; ctx.fillRect(0, 0, W, H)

      drawGrid(ctx, W, H)
      drawScanline(ctx, W, H, t)
      drawPerspectiveFloor(ctx, W, H)
      drawCameraRig(ctx, W, H)

      // ── Persons ──
      state.persons.forEach((p) => {
        p.x     += p.vx * 0.45
        p.y     += p.vy * 0.18
        p.alpha  = Math.min(1, p.alpha + dt * 0.55)
        p.boxT   = Math.min(1, p.boxT  + dt * 1.3)

        if (p.x > W + 120) {
          Object.assign(p, spawnPerson(W, H))
        }

        drawSilhouette(ctx, p)
        drawBoundingBox(ctx, p)
      })

      // ── Hub ──
      drawHub(ctx, W * 0.5, H * 0.76, t)

      // ── Particles ──
      state.particles.forEach((p) => {
        p.x    += p.vx
        p.y    += p.vy
        p.life -= dt * 0.38
        p.alpha = p.life > 0 ? Math.sin(p.life * Math.PI) : 0
        if (p.life <= 0) {
          Object.assign(p, {
            x:    rnd(W * 0.40, W * 0.60),
            y:    rnd(H * 0.68, H * 0.78),
            vx:   rnd(-0.35, 0.35),
            vy:   rnd(-1.4, -0.4),
            life: rnd(0.5, 1),
            alpha: 0,
            gold: Math.random() > 0.45,
          })
        }
      })
      drawParticles(ctx, state.particles)

      // ── HUD ──
      drawStatusHUD(ctx, state.persons, W, H, t)

      rafRef.current = requestAnimationFrame(frame)
    }

    rafRef.current = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(rafRef.current)
      ro.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{ display: 'block', width: '100%', height: '100%' }}
    />
  )
}
