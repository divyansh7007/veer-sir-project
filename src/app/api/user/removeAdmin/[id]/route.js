import conf from '@/utils/appwriteConfig';
import { NextResponse } from 'next/server';

export async function POST(request, { params }) {
    try {
        const promise = await conf.users.updateLabels(params.id, ['noAdmin'])
        return NextResponse.json({ msg: 'Admin is added!', promise });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}