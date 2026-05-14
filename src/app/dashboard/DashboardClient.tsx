'use client'

import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import NavBar from '@/components/layout/NavBar'

interface Lote {
    id: string
    codigo: string
    estado: string
    fecha_coccion: string
    recetas: { nombre: string; estilo: string } | null
}

interface Pedido {
    id: string
    cantidad_litros: number
    estado: string
    clientes: { nombre: string } | null
}

interface Receta {
    id: string
    nombre: string
    estilo: string
}

interface Props {
    lotes: Lote[]
    pedidos: Pedido[]
    recetas: Receta[]
}

const estadoColor: Record<string, string> = {
    planificado: '#4a5545',
    macerado: '#854f0b',
    fermentando: '#185fa5',
    madurando: '#534ab7',
    listo: '#0f6e56',
    embotellado: '#3b6d11',
    agotado: '#a32d2d',
}

const estadoLabel: Record<string, string> = {
    planificado: 'Planificado',
    macerado: 'Macerado',
    fermentando: 'Fermentando',
    madurando: 'Madurando',
    listo: 'Listo',
    embotellado: 'Embotellado',
    agotado: 'Agotado',
}

export default function DashboardClient({ lotes, pedidos, recetas }: Props) {
    const router = useRouter()
    const supabase = createClient()

    async function handleLogout() {
        await supabase.auth.signOut()
        router.push('/auth')
        router.refresh()
    }

    const lotesActivos = lotes.filter(l => !['agotado', 'embotellado'].includes(l.estado))
    const lotosListos = lotes.filter(l => l.estado === 'listo')

    return (
        <main style={{ minHeight: '100vh', background: '#0a0c09', fontFamily: "'Jost', sans-serif", color: '#c8c0b0' }}>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400&family=Jost:wght@200;300;400&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .nav-btn:hover { background: #1e2820 !important; }
        .card-hover:hover { border-color: #3a4a35 !important; transform: translateY(-2px); }
        .card-hover { transition: border-color 0.2s, transform 0.2s; }
        @media (min-width: 640px) { .stats-grid { grid-template-columns: repeat(4, 1fr) !important; } .main-grid { grid-template-columns: 1fr 1fr !important; } }
      `}</style>

            {/* NAV */}
            <NavBar />

            <div style={{ padding: '24px 20px', maxWidth: 960, margin: '0 auto' }}>

                {/* SALUDO */}
                <div style={{ marginBottom: 28 }}>
                    <h1 style={{
                        fontFamily: "'Cormorant Garamond',serif", fontSize: 32,
                        fontWeight: 300, color: '#e2d9c2', lineHeight: 1,
                    }}>Panel de producción</h1>
                    <p style={{ fontSize: 12, color: '#4a5545', marginTop: 6, letterSpacing: '0.05em' }}>
                        Nevados Cerveza Artesanal · Manizales
                    </p>
                </div>

                {/* STATS */}
                <div className="stats-grid" style={{
                    display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: 12, marginBottom: 28,
                }}>
                    {[
                        { label: 'Lotes activos', value: lotesActivos.length, color: '#185fa5' },
                        { label: 'Listos para venta', value: lotosListos.length, color: '#0f6e56' },
                        { label: 'Pedidos pendientes', value: pedidos.length, color: '#854f0b' },
                        { label: 'Recetas', value: recetas.length, color: '#534ab7' },
                    ].map(stat => (
                        <div key={stat.label} style={{
                            background: '#0f1210', border: '0.5px solid #1e2820',
                            borderRadius: 12, padding: '16px 20px',
                        }}>
                            <div style={{ fontSize: 11, color: '#4a5545', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 8 }}>
                                {stat.label}
                            </div>
                            <div style={{ fontSize: 36, fontWeight: 300, color: stat.color, lineHeight: 1 }}>
                                {stat.value}
                            </div>
                        </div>
                    ))}
                </div>

                {/* GRID PRINCIPAL */}
                <div className="main-grid" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 20 }}>

                    {/* LOTES RECIENTES */}
                    <div style={{ background: '#0f1210', border: '0.5px solid #1e2820', borderRadius: 12, overflow: 'hidden' }}>
                        <div style={{
                            padding: '16px 20px', borderBottom: '0.5px solid #1e2820',
                            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                        }}>
                            <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 18, fontWeight: 300, color: '#c8c0b0' }}>
                                Lotes recientes
                            </div>
                            <button onClick={() => router.push('/lotes')} style={{
                                background: '#141812', border: '0.5px solid #2a3228',
                                color: '#6a7862', fontSize: 11, padding: '5px 12px',
                                borderRadius: 6, cursor: 'pointer',
                            }}>
                                Ver todos
                            </button>
                        </div>

                        {lotes.length === 0 ? (
                            <div style={{ padding: '32px 20px', textAlign: 'center', color: '#3a4235', fontSize: 13 }}>
                                No hay lotes registrados aún
                            </div>
                        ) : (
                            lotes.map(lote => (
                                <div key={lote.id} className="card-hover" style={{
                                    padding: '14px 20px', borderBottom: '0.5px solid #141812',
                                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                    cursor: 'pointer',
                                }} onClick={() => router.push('/lotes')}>
                                    <div>
                                        <div style={{ fontSize: 14, fontWeight: 300, color: '#c8c0b0' }}>{lote.codigo}</div>
                                        <div style={{ fontSize: 11, color: '#4a5545', marginTop: 2 }}>
                                            {lote.recetas?.nombre ?? '—'} · {lote.fecha_coccion}
                                        </div>
                                    </div>
                                    <div style={{
                                        fontSize: 10, fontWeight: 300, letterSpacing: '0.1em',
                                        textTransform: 'uppercase', padding: '4px 10px',
                                        borderRadius: 20, border: `0.5px solid ${estadoColor[lote.estado]}`,
                                        color: estadoColor[lote.estado],
                                    }}>
                                        {estadoLabel[lote.estado]}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* PEDIDOS PENDIENTES */}
                    <div style={{ background: '#0f1210', border: '0.5px solid #1e2820', borderRadius: 12, overflow: 'hidden' }}>
                        <div style={{
                            padding: '16px 20px', borderBottom: '0.5px solid #1e2820',
                            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                        }}>
                            <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 18, fontWeight: 300, color: '#c8c0b0' }}>
                                Pedidos pendientes
                            </div>
                            <button onClick={() => router.push('/pedidos')} style={{
                                background: '#141812', border: '0.5px solid #2a3228',
                                color: '#6a7862', fontSize: 11, padding: '5px 12px',
                                borderRadius: 6, cursor: 'pointer',
                            }}>
                                Ver todos
                            </button>
                        </div>

                        {pedidos.length === 0 ? (
                            <div style={{ padding: '32px 20px', textAlign: 'center', color: '#3a4235', fontSize: 13 }}>
                                No hay pedidos pendientes
                            </div>
                        ) : (
                            pedidos.map(pedido => (
                                <div key={pedido.id} className="card-hover" style={{
                                    padding: '14px 20px', borderBottom: '0.5px solid #141812',
                                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                    cursor: 'pointer',
                                }} onClick={() => router.push('/pedidos')}>
                                    <div>
                                        <div style={{ fontSize: 14, fontWeight: 300, color: '#c8c0b0' }}>
                                            {pedido.clientes?.nombre ?? 'Cliente desconocido'}
                                        </div>
                                        <div style={{ fontSize: 11, color: '#4a5545', marginTop: 2 }}>
                                            {pedido.cantidad_litros}L
                                        </div>
                                    </div>
                                    <div style={{
                                        fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase',
                                        padding: '4px 10px', borderRadius: 20,
                                        border: '0.5px solid #854f0b', color: '#854f0b',
                                    }}>
                                        Pendiente
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* MENÚ MÓVIL */}
                <div style={{
                    display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: 10, marginTop: 24,
                }}>
                    {[
                        { label: 'Recetas', emoji: '📋', href: '/recetas' },
                        { label: 'Inventario', emoji: '📦', href: '/inventario' },
                        { label: 'Lotes', emoji: '🍺', href: '/lotes' },
                        { label: 'Clientes', emoji: '👥', href: '/clientes' },
                        { label: 'Pedidos', emoji: '🛒', href: '/pedidos' },
                        { label: 'Reparto', emoji: '🚗', href: '/reparto' },
                    ].map(item => (
                        <button key={item.href} className="card-hover"
                            onClick={() => router.push(item.href)}
                            style={{
                                background: '#0f1210', border: '0.5px solid #1e2820',
                                borderRadius: 12, padding: '16px 8px',
                                cursor: 'pointer', display: 'flex',
                                flexDirection: 'column', alignItems: 'center', gap: 8,
                            }}>
                            <span style={{ fontSize: 24 }}>{item.emoji}</span>
                            <span style={{ fontSize: 11, fontWeight: 300, color: '#6a7862', letterSpacing: '0.1em' }}>
                                {item.label}
                            </span>
                        </button>
                    ))}
                </div>

            </div>
        </main>
    )
}