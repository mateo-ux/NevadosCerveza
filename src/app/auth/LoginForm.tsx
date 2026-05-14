'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

const LogoPrincipal = () => (
    <svg viewBox="0 0 480 280" width="100%" style={{ maxWidth: 300 }}>
        <polygon points="70,230 130,110 165,148 220,68 275,138 310,100 390,230" fill="#1a2018" />
        <polygon points="220,68 238,90 258,72 274,90 295,76 310,100 292,118 220,105 148,118 130,100 158,84 172,98 198,78 220,68" fill="#2a3228" opacity="0.9" />
        <polygon points="220,68 228,80 236,70 244,80 252,70 260,82 268,72 258,88 240,78 222,90 204,78 212,68 218,78 220,68" fill="#c8bfa8" opacity="0.18" />
        <line x1="140" y1="220" x2="300" y2="220" stroke="#2a3228" strokeWidth="0.5" />
        <text fontFamily="Georgia,serif" fontSize="52" fontWeight="300" fill="#e2d9c2" textAnchor="middle" x="230" y="210" letterSpacing="8">NEVADOS</text>
        <text fontFamily="Arial,sans-serif" fontSize="16" fill="#5a6a50" textAnchor="middle" x="230" y="240" letterSpacing="5">CERVEZA ARTESANAL</text>
        <text fontFamily="Arial,sans-serif" fontSize="15" fill="#3a4535" textAnchor="middle" x="230" y="265" letterSpacing="3">MANIZALES · CALDAS</text>
    </svg>
)

const Frailejones = () => (
    <svg viewBox="0 0 800 140" style={{
        position: 'absolute', bottom: 0, left: 0, width: '100%',
        opacity: 0.15, pointerEvents: 'none',
    }}>
        {[50, 130, 200, 280, 350, 430, 510, 580, 660, 730].map((x, i) => {
            const h = 40 + (i % 4) * 12
            const s = 0.7 + (i % 3) * 0.15
            return (
                <g key={i} transform={`translate(${x}, 140) scale(${s})`}>
                    <rect x="-2" y={-h} width="4" height={h} fill="#4a6040" rx="2" />
                    {[0.3, 0.5, 0.7].map((p, j) => (
                        <g key={j}>
                            <ellipse cx="-5" cy={-h * p} rx="3" ry="6" fill="#3a5030" transform={`rotate(-15, -5, ${-h * p})`} opacity="0.6" />
                            <ellipse cx="5" cy={-h * p} rx="3" ry="6" fill="#3a5030" transform={`rotate(15, 5, ${-h * p})`} opacity="0.6" />
                        </g>
                    ))}
                    {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, j) => {
                        const rad = (angle * Math.PI) / 180
                        const lx = Math.cos(rad) * 14
                        const ly = Math.sin(rad) * 6
                        return (
                            <ellipse key={j} cx={lx} cy={-h + ly} rx="14" ry="3.5"
                                fill="#5a7848" opacity="0.85"
                                transform={`rotate(${angle}, ${lx}, ${-h + ly})`}
                            />
                        )
                    })}
                    <circle cx="0" cy={-h} r="5" fill="#6a8858" />
                    {i % 3 === 0 && (
                        <ellipse cx="0" cy={-h - 10} rx="3" ry="8" fill="#8a9e60" opacity="0.7" />
                    )}
                </g>
            )
        })}
    </svg>
)

export default function LoginForm() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const router = useRouter()
    const supabase = createClient()

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault()
        setLoading(true)
        setError('')
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) {
            setError('Correo o contraseña incorrectos')
            setLoading(false)
        } else {
            router.push('/dashboard')
            router.refresh()
        }
    }

    const stars = [
        { x: '5%', top: 30, s: 1.5, d: 3.2 }, { x: '12%', top: 80, s: 1, d: 2.8 }, { x: '20%', top: 20, s: 2, d: 3.8 },
        { x: '28%', top: 110, s: 1, d: 2.5 }, { x: '35%', top: 45, s: 1.5, d: 4 }, { x: '42%', top: 130, s: 1, d: 3.1 },
        { x: '50%', top: 25, s: 2, d: 2.6 }, { x: '58%', top: 95, s: 1, d: 3.5 }, { x: '65%', top: 55, s: 1.5, d: 2.9 },
        { x: '72%', top: 120, s: 1, d: 4.2 }, { x: '80%', top: 35, s: 2, d: 3 }, { x: '88%', top: 75, s: 1, d: 2.7 },
        { x: '94%', top: 100, s: 1.5, d: 3.6 }, { x: '15%', top: 160, s: 1, d: 2.4 }, { x: '45%', top: 175, s: 1.5, d: 3.3 },
        { x: '70%', top: 155, s: 1, d: 2.8 }, { x: '90%', top: 165, s: 2, d: 3.9 },
    ]

    return (
        <div style={{ position: 'relative', overflow: 'hidden', background: '#0a0c09', borderTop: '0.5px solid #1e2820' }}>

            {stars.map((s, i) => (
                <div key={i} style={{
                    position: 'absolute', left: s.x, top: s.top,
                    width: s.s, height: s.s, background: '#e8dfc8', borderRadius: '50%',
                    animation: `twinkle ${s.d}s ease-in-out infinite ${i * 0.25}s`,
                    pointerEvents: 'none',
                }} />
            ))}

            <Frailejones />

            <div style={{ position: 'relative', zIndex: 2, padding: '48px 20px 60px' }}>
                <div style={{ maxWidth: 440, margin: '0 auto' }}>

                    <div style={{ textAlign: 'center', marginBottom: 36 }}>
                        <LogoPrincipal />
                    </div>

                    <div style={{
                        fontFamily: "'Cormorant Garamond',serif",
                        fontSize: 26, fontWeight: 300, color: '#c8c0b0', marginBottom: 4,
                    }}>Acceso brewmaster</div>
                    <div style={{
                        fontSize: 13, fontWeight: 300, color: '#8a9e80',
                        letterSpacing: '0.12em', marginBottom: 24,
                    }}>Panel de producción y reparto</div>
                    <form onSubmit={handleLogin}>
                        <input
                            type="email"
                            placeholder="correo electrónico"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                            style={{
                                display: 'block', width: '100%', padding: '12px 16px',
                                background: '#141812', border: '0.5px solid #222820',
                                borderRadius: 10, color: '#c8c0b0',
                                fontFamily: "'Jost',sans-serif", fontSize: 14,
                                fontWeight: 300, marginBottom: 12,
                            }}
                        />
                        <input
                            type="password"
                            placeholder="contraseña"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                            style={{
                                display: 'block', width: '100%', padding: '12px 16px',
                                background: '#141812', border: '0.5px solid #222820',
                                borderRadius: 10, color: '#c8c0b0',
                                fontFamily: "'Jost',sans-serif", fontSize: 14,
                                fontWeight: 300, marginBottom: 12,
                            }}
                        />

                        {error && (
                            <div style={{ fontSize: 13, color: '#b04030', marginBottom: 12, textAlign: 'center' }}>
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-login"
                            style={{
                                width: '100%', padding: 14,
                                background: '#2a3828', border: '0.5px solid #3a5035',
                                borderRadius: 10, color: '#8ab080',
                                fontFamily: "'Jost',sans-serif", fontSize: 12,
                                fontWeight: 300, letterSpacing: '0.2em',
                                textTransform: 'uppercase', cursor: 'pointer',
                                transition: 'background 0.2s',
                            }}
                        >
                            {loading ? 'Ingresando...' : 'Ingresar'}
                        </button>
                    </form>

                    <div style={{
                        textAlign: 'center', marginTop: 32,
                        fontSize: 13, fontWeight: 300, color: '#8a9e80', letterSpacing: '0.12em',
                    }}>
                        Elaborada en las faldas del Nevado del Ruiz
                    </div>
                </div>
            </div>
        </div>
    )
}