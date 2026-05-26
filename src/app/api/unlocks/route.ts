import { NextRequest, NextResponse } from 'next/server'

/**
 * POST /api/unlocks
 * Body: { lead_id: string; caregiver_id: string }
 *
 * MVP: Changes the unlock status to 'oplacone' (paid).
 * Production: This endpoint should verify payment before updating the status.
 */
export async function POST(req: NextRequest) {
  try {
    const { lead_id, caregiver_id } = await req.json()

    if (!lead_id || !caregiver_id) {
      return NextResponse.json(
        { error: 'lead_id i caregiver_id są wymagane' },
        { status: 400 }
      )
    }

    // In production: verify payment with Stripe/Przelewy24, then upsert to Supabase
    // const supabase = createClient(...)
    // const { data, error } = await supabase
    //   .from('fact_unlocks')
    //   .upsert({ lead_id, caregiver_id, kwota_prowizji: 49, status_platnosci: 'oplacone' })

    // MVP: Return success to simulate a paid unlock
    return NextResponse.json({
      success: true,
      unlock: {
        lead_id,
        caregiver_id,
        status_platnosci: 'oplacone',
        kwota_prowizji: 49,
        data_odblokowania: new Date().toISOString(),
      },
    })
  } catch {
    return NextResponse.json({ error: 'Błąd serwera' }, { status: 500 })
  }
}
