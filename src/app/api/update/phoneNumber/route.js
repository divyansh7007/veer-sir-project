import conf from '@/utils/appwriteConfig';
import { NextResponse } from 'next/server';

export async function PUT(request) {
    try {
        const { number, id } = await request.json()
        const promise = await conf.users.updatePhone(id, number);
        return NextResponse.json({ promise });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}