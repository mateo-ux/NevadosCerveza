export default function HeroNevados() {
  const stars = [
    { x: '6%', top: 16, s: 1.5, d: 2.8, del: 0 }, { x: '18%', top: 10, s: 1, d: 3.5, del: 0.5 },
    { x: '32%', top: 26, s: 2, d: 2.2, del: 1 }, { x: '48%', top: 8, s: 1, d: 4, del: 0.3 },
    { x: '61%', top: 22, s: 1.5, d: 3.1, del: 1.5 }, { x: '74%', top: 12, s: 1, d: 2.6, del: 0.8 },
    { x: '85%', top: 30, s: 2, d: 3.8, del: 0.2 }, { x: '92%', top: 14, s: 1, d: 2.4, del: 1.2 },
    { x: '12%', top: 44, s: 1, d: 3, del: 2 }, { x: '42%', top: 50, s: 1.5, d: 2.5, del: 0.9 },
    { x: '68%', top: 40, s: 1, d: 3.7, del: 1.4 }, { x: '55%', top: 60, s: 1, d: 2.9, del: 0.7 },
  ]

  return (
    <div style={{ position: 'relative', width: '100%', minHeight: 340, overflow: 'hidden', background: '#0a0c09', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

      {stars.map((s, i) => (
        <div key={i} style={{
          position: 'absolute', left: s.x, top: s.top,
          width: s.s, height: s.s, background: '#e8dfc8', borderRadius: '50%',
          animation: `twinkle ${s.d}s ease-in-out infinite ${s.del}s`,
        }} />
      ))}

      <div style={{
        position: 'absolute', bottom: 100, left: '-5%', right: '-5%',
        height: 60, background: 'rgba(180,190,170,0.06)', borderRadius: '50%',
        filter: 'blur(20px)', animation: 'drift 8s ease-in-out infinite',
      }} />

      <svg viewBox="0 0 1200 340" preserveAspectRatio="xMidYMax slice"
        style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '100%' }}>
        <polygon points="0,340 150,130 210,180 340,70 440,150 520,95 640,120 740,60 860,110 960,80 1060,120 1200,90 1200,340" fill="#1a2018" />
        <polygon points="0,340 100,220 180,250 280,175 380,210 480,160 580,185 680,145 780,175 880,155 980,180 1080,160 1200,175 1200,340" fill="#111510" />
        <polygon points="340,70 368,100 395,80 415,102 440,85 460,100 440,120 390,108 340,120 295,108 315,88 330,102 340,70" fill="#2a3228" />
        <polygon points="740,60 758,80 774,65 788,82 800,70 812,82 800,96 768,86 740,96 712,86 724,72 736,84 740,60" fill="#c8bfa8" opacity="0.12" />
        <rect x="0" y="310" width="1200" height="30" fill="#0f1210" />
      </svg>

      <div style={{
        position: 'relative', zIndex: 10, textAlign: 'center',
        padding: '60px 24px 80px', animation: 'fadeUp 1s ease both',
      }}>
        <div style={{
          fontFamily: "'Cormorant Garamond',serif", fontSize: 56,
          fontWeight: 300, color: '#e2d9c2', letterSpacing: '0.14em', lineHeight: 1,
        }}>
          Nevados
        </div>
        <div style={{
          fontSize: 10, fontWeight: 200, color: '#8a9280',
          letterSpacing: '0.35em', textTransform: 'uppercase', marginTop: 12,
        }}>
          Cerveza Artesanal · Manizales, Caldas
        </div>
        <div style={{
          display: 'inline-block', marginTop: 14,
          padding: '5px 18px', border: '0.5px solid #3a4035',
          borderRadius: 20, fontSize: 9, fontWeight: 300,
          color: '#6b7a60', letterSpacing: '0.2em', textTransform: 'uppercase',
        }}>
          Colombia · 2.150 msnm
        </div>
      </div>
    </div>
  )
}