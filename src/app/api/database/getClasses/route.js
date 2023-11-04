import conf from '@/utils/appwriteConfig';
import { NextResponse } from 'next/server';

export async function PATCH(request) {
    try {
        const promise = await conf.databases.list();
        return NextResponse.json({ classes: promise });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}