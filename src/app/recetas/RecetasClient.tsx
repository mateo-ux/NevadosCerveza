'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import NavBar from '@/components/layout/NavBar'

interface Ingrediente {
    id: string
    tipo: string
    nombre: string
    cantidad_gramos: number
    momento: string | null
    orden: number
}

interface Receta {
    id: string
    nombre: string
    estilo: string
    descripcion: string | null
    volumen_final_litros: number
    og: number | null
    fg: number | null
    abv: number | null
    ibu: number | null
    color_ebc: number | null
    receta_ingredientes: Ingrediente[]
}

interface Props {
    recetas: Receta[]
}

const tipoColor: Record<string, string> = {
    malta: '#854f0b',
    lupulo: '#0f6e56',
    levadura: '#534ab7',
    otro: '#4a5545',
}

const estiloLogo: Record<string, { bg: string, accent: string }> = {
    'Rubia': { bg: '#c8a84b', accent: '#3a2e08' },
    'Roja': { bg: '#1a0c0a', accent: '#e8c0b0' },
    'Negra': { bg: '#0e0a08', accent: '#c8a880' },
    'Amarillo Pálido': { bg: '#d4c870', accent: '#2a2808' },
    'Ámbar': { bg: '#c87830', accent: '#2a1808' },
}

export default function RecetasClient({ recetas }: Props) {
    const router = useRouter()
    const [seleccionada, setSeleccionada] = useState<Receta | null>(null)
    const [escala, setEscala] = useState(20)

    function seleccionar(receta: Receta) {
        setSeleccionada(receta)
        setEscala(receta.volumen_final_litros)
    }

    const factor = escala / (seleccionada?.volumen_final_litros ?? 20)

    const maltas = seleccionada?.receta_ingredientes.filter(i => i.tipo === 'malta').sort((a, b) => a.orden - b.orden) ?? []
    const lupulos = seleccionada?.receta_ingredientes.filter(i => i.tipo === 'lupulo').sort((a, b) => a.orden - b.orden) ?? []
    const levaduras = seleccionada?.receta_ingredientes.filter(i => i.tipo === 'levadura') ?? []
    const otros = seleccionada?.receta_ingredientes.filter(i => i.tipo === 'otro') ?? []

    return (
        <main style={{ minHeight: '100vh', background: '#0a0c09', fontFamily: "'Jost',sans-serif", color: '#c8c0b0' }}>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400&family=Jost:wght@200;300;400&display=swap');
        * { box-sizing:border-box; margin:0; padding:0; }
        .receta-card:hover { border-color:#3a4a35 !important; transform:translateY(-2px); }
        .receta-card { transition: border-color 0.2s, transform 0.2s; cursor:pointer; }
        input[type=range] { accent-color: #4a6a40; width:100%; }
        @media (min-width:768px) { .layout { grid-template-columns: 280px 1fr !important; } }
      `}</style>

            <NavBar />

            <div style={{ padding: '24px 20px', maxWidth: 1100, margin: '0 auto' }}>

                <div style={{ marginBottom: 24 }}>
                    <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 32, fontWeight: 300, color: '#e2d9c2' }}>
                        Recetas
                    </h1>
                    <p style={{ fontSize: 12, color: '#4a5545', marginTop: 4 }}>
                        {recetas.length} recetas · selecciona una para ver el detalle
                    </p>
                </div>

                <div className="layout" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 20 }}>

                    {/* LISTA */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        {recetas.map(receta => {
                            const tema = estiloLogo[receta.estilo] ?? { bg: '#1e2820', accent: '#c8c0b0' }
                            const activa = seleccionada?.id === receta.id
                            return (
                                <div key={receta.id} className="receta-card"
                                    onClick={() => seleccionar(receta)}
                                    style={{
                                        background: activa ? '#141812' : '#0f1210',
                                        border: activa ? '0.5px solid #4a6a40' : '0.5px solid #1e2820',
                                        borderRadius: 12, overflow: 'hidden',
                                        display: 'flex', alignItems: 'stretch',
                                    }}>
                                    {/* Franja color estilo */}
                                    <div style={{ width: 6, background: tema.bg, flexShrink: 0 }} />
                                    <div style={{ padding: '14px 16px', flex: 1 }}>
                                        <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 18, fontWeight: 400, color: '#c8c0b0' }}>
                                            {receta.nombre}
                                        </div>
                                        <div style={{ fontSize: 10, color: '#4a5545', letterSpacing: '0.15em', textTransform: 'uppercase', marginTop: 3 }}>
                                            {receta.estilo} · {receta.volumen_final_litros}L
                                        </div>
                                        <div style={{ display: 'flex', gap: 12, marginTop: 10, flexWrap: 'wrap' }}>
                                            {[
                                                { l: 'ABV', v: receta.abv ? `${receta.abv}%` : '—' },
                                                { l: 'IBU', v: receta.ibu ?? '—' },
                                                { l: 'OG', v: receta.og ?? '—' },
                                                { l: 'EBC', v: receta.color_ebc ?? '—' },
                                            ].map(s => (
                                                <div key={s.l}>
                                                    <span style={{ fontSize: 9, color: '#3a4235', letterSpacing: '0.15em', textTransform: 'uppercase' }}>{s.l} </span>
                                                    <span style={{ fontSize: 12, color: '#8a9880' }}>{s.v}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', paddingRight: 14, color: '#3a4235', fontSize: 18 }}>›</div>
                                </div>
                            )
                        })}

                        <button
                            onClick={() => router.push('/lotes/nuevo')}
                            style={{
                                marginTop: 8, padding: '13px',
                                background: '#141812', border: '0.5px solid #2a3828',
                                borderRadius: 12, color: '#6a8060', fontFamily: "'Jost',sans-serif",
                                fontSize: 12, fontWeight: 300, letterSpacing: '0.15em',
                                textTransform: 'uppercase', cursor: 'pointer',
                            }}>
                            + Iniciar nuevo lote
                        </button>
                    </div>

                    {/* DETALLE */}
                    {seleccionada ? (
                        <div style={{ background: '#0f1210', border: '0.5px solid #1e2820', borderRadius: 12, overflow: 'hidden' }}>

                            {/* Header */}
                            <div style={{
                                padding: '20px 24px', borderBottom: '0.5px solid #1e2820',
                                background: (estiloLogo[seleccionada.estilo] ?? { bg: '#1e2820' }).bg,
                            }}>
                                <div style={{
                                    fontFamily: "'Cormorant Garamond',serif", fontSize: 26,
                                    fontWeight: 300, color: (estiloLogo[seleccionada.estilo] ?? { accent: '#c8c0b0' }).accent,
                                }}>
                                    {seleccionada.nombre}
                                </div>
                                <div style={{
                                    fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', marginTop: 4,
                                    color: (estiloLogo[seleccionada.estilo] ?? { accent: '#c8c0b0' }).accent, opacity: 0.7,
                                }}>
                                    {seleccionada.estilo} · Cerveza Artesanal Nevados
                                </div>
                            </div>

                            <div style={{ padding: '20px 24px' }}>

                                {/* ESCALA */}
                                <div style={{ marginBottom: 24, padding: '16px', background: '#141812', borderRadius: 10, border: '0.5px solid #1e2820' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                                        <div style={{ fontSize: 11, color: '#4a5545', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                                            Escalar receta
                                        </div>
                                        <div style={{ fontSize: 20, fontWeight: 300, color: '#8ab080' }}>
                                            {escala}L
                                        </div>
                                    </div>
                                    <input type="range" min={5} max={100} step={5} value={escala}
                                        onChange={e => setEscala(Number(e.target.value))}
                                    />
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: '#3a4235', marginTop: 4 }}>
                                        <span>5L</span><span>100L</span>
                                    </div>
                                    {escala !== seleccionada.volumen_final_litros && (
                                        <div style={{ marginTop: 10, fontSize: 11, color: '#6a8060', textAlign: 'center' }}>
                                            Factor de escala: ×{factor.toFixed(2)} respecto a la receta base de {seleccionada.volumen_final_litros}L
                                        </div>
                                    )}
                                </div>

                                {/* INGREDIENTES POR GRUPO */}
                                {[
                                    { titulo: 'Maltas', items: maltas, tipo: 'malta' },
                                    { titulo: 'Lúpulos', items: lupulos, tipo: 'lupulo' },
                                    { titulo: 'Levadura', items: levaduras, tipo: 'levadura' },
                                    { titulo: 'Otros', items: otros, tipo: 'otro' },
                                ].filter(g => g.items.length > 0).map(grupo => (
                                    <div key={grupo.titulo} style={{ marginBottom: 20 }}>
                                        <div style={{
                                            fontSize: 10, color: tipoColor[grupo.tipo],
                                            letterSpacing: '0.2em', textTransform: 'uppercase',
                                            marginBottom: 10, paddingBottom: 6,
                                            borderBottom: `0.5px solid ${tipoColor[grupo.tipo]}40`,
                                        }}>
                                            {grupo.titulo}
                                        </div>
                                        {grupo.items.map(ing => (
                                            <div key={ing.id} style={{
                                                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                                padding: '8px 0', borderBottom: '0.5px solid #141812',
                                            }}>
                                                <div>
                                                    <div style={{ fontSize: 13, fontWeight: 300, color: '#c8c0b0' }}>{ing.nombre}</div>
                                                    {ing.momento && (
                                                        <div style={{ fontSize: 10, color: '#4a5545', marginTop: 2 }}>{ing.momento}</div>
                                                    )}
                                                </div>
                                                <div style={{ textAlign: 'right' }}>
                                                    <div style={{ fontSize: 14, fontWeight: 300, color: '#8a9880' }}>
                                                        {(ing.cantidad_gramos * factor).toFixed(0)}g
                                                    </div>
                                                    {factor !== 1 && (
                                                        <div style={{ fontSize: 10, color: '#3a4235' }}>
                                                            base: {ing.cantidad_gramos}g
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ))}

                                {/* STATS */}
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 10, marginTop: 8 }}>
                                    {[
                                        { l: 'Gravedad original', v: seleccionada.og ?? '—' },
                                        { l: 'Gravedad final', v: seleccionada.fg ?? '—' },
                                        { l: 'Alcohol (ABV)', v: seleccionada.abv ? `${seleccionada.abv}%` : '—' },
                                        { l: 'Amargor (IBU)', v: seleccionada.ibu ?? '—' },
                                        { l: 'Color (EBC)', v: seleccionada.color_ebc ?? '—' },
                                        { l: 'Volumen base', v: `${seleccionada.volumen_final_litros}L` },
                                    ].map(s => (
                                        <div key={s.l} style={{ background: '#141812', borderRadius: 8, padding: '10px 14px' }}>
                                            <div style={{ fontSize: 9, color: '#3a4235', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 4 }}>{s.l}</div>
                                            <div style={{ fontSize: 16, fontWeight: 300, color: '#8a9880' }}>{s.v}</div>
                                        </div>
                                    ))}
                                </div>

                            </div>
                        </div>
                    ) : (
                        <div style={{
                            background: '#0f1210', border: '0.5px solid #1e2820',
                            borderRadius: 12, display: 'flex', alignItems: 'center',
                            justifyContent: 'center', minHeight: 300,
                            color: '#3a4235', fontSize: 13, letterSpacing: '0.1em',
                        }}>
                            Selecciona una receta para ver el detalle
                        </div>
                    )}
                </div>
            </div>
        </main>
    )
}