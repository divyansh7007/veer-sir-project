import conf from '@/utils/appwriteConfig';
import { NextResponse } from 'next/server';

export async function PUT(request) {
    try {
        const { email, id } = await request.json()
        const promise = await conf.users.updateEmail(id, email);
        return NextResponse.json({ promise });
        return NextResponse.json();
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}