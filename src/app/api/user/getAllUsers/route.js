import conf from '@/utils/appwriteConfig';
import { NextResponse } from 'next/server';

export async function PATCH(request) {
    try {
        const promise = await conf.users.list();
        return NextResponse.json({ users: promise.users });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}