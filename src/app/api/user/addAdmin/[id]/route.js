import conf from '@/utils/appwriteConfig';
import { NextResponse } from 'next/server';

export async function POST(request, { params }) {
    try {
        const promise = await conf.users.updateLabels(params.id, ['admin'])
        return NextResponse.json({ msg: 'Admin is added!' });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}