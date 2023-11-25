import conf from '@/utils/appwriteConfig';
import { NextResponse } from 'next/server';

export async function PUT(request) {
    try {
        const { name, id } = await request.json()
        console.log(name, id);
        const promise = await conf.users.updateName(id, name);
        return NextResponse.json({ promise });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}