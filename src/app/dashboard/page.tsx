import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import DashboardClient from './DashboardClient'

export default async function DashboardPage() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) redirect('/auth')

    const [{ data: lotes }, { data: pedidos }, { data: recetas }] = await Promise.all([
        supabase.from('lotes').select('*, recetas(nombre, estilo)').order('created_at', { ascending: false }).limit(5),
        supabase.from('pedidos').select('*, clientes(nombre)').eq('estado', 'pendiente').order('created_at', { ascending: false }),
        supabase.from('recetas').select('id, nombre, estilo').order('nombre'),
    ])

    return (
        <DashboardClient
            lotes={lotes ?? []}
            pedidos={pedidos ?? []}
            recetas={recetas ?? []}
        />
    )
}