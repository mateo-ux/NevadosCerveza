'use client'

import { useRouter, usePathname } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

const links = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Recetas', href: '/recetas' },
    { label: 'Inventario', href: '/inventario' },
    { label: 'Lotes', href: '/lotes' },
    { label: 'Clientes', href: '/clientes' },
    { label: 'Pedidos', href: '/pedidos' },
    { label: 'Reparto', href: '/reparto' },
]

export default function NavBar() {
    const router = useRouter()
    const pathname = usePathname()
    const supabase = createClient()

    async function handleLogout() {
        await supabase.auth.signOut()
        router.push('/auth')
        router.refresh()
    }

    return (
        <nav style={{
            background: '#0c0e0b', borderBottom: '0.5px solid #1e2820',
            padding: '0 20px', height: 56, position: 'sticky', top: 0, zIndex: 50,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            overflowX: 'auto',
        }}>
            <div style={{
                fontFamily: "'Cormorant Garamond',serif", fontSize: 20,
                fontWeight: 300, color: '#e2d9c2', letterSpacing: '0.1em',
                flexShrink: 0, marginRight: 20, cursor: 'pointer',
            }} onClick={() => router.push('/dashboard')}>
                Nevados
            </div>

            <div style={{ display: 'flex', gap: 4, alignItems: 'center', overflowX: 'auto' }}>
                {links.map(link => {
                    const activo = pathname === link.href
                    return (
                        <button key={link.href}
                            onClick={() => router.push(link.href)}
                            style={{
                                background: activo ? '#1e2820' : 'transparent',
                                border: activo ? '0.5px solid #2a3828' : 'none',
                                color: activo ? '#8ab080' : '#6a7862',
                                fontSize: 11, fontWeight: 300, letterSpacing: '0.05em',
                                padding: '6px 10px', borderRadius: 6,
                                cursor: 'pointer', flexShrink: 0,
                                whiteSpace: 'nowrap',
                            }}>
                            {link.label}
                        </button>
                    )
                })}

                <button onClick={handleLogout} style={{
                    background: 'transparent', border: '0.5px solid #2a3228',
                    color: '#6a7862', fontSize: 11, fontWeight: 300,
                    padding: '6px 12px', borderRadius: 6,
                    cursor: 'pointer', flexShrink: 0, marginLeft: 8,
                }}>
                    Salir
                </button>
            </div>
        </nav>
    )
}