import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import RecetasClient from './RecetasClient'

export default async function RecetasPage() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) redirect('/auth')

    const { data: recetas } = await supabase
        .from('recetas')
        .select('*, receta_ingredientes(*)')
        .order('nombre')

    return <RecetasClient recetas={recetas ?? []} />
}