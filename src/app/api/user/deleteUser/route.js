import conf from '@/utils/appwriteConfig';
import { NextResponse } from 'next/server';

export async function POST(request, { params }) {
    try {
        const { _id } = await request.json();
        const promise = await conf.users.delete(_id);
        return NextResponse.json({ promise });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}