import { users, account } from '@/utils/appwriteConfig';
import { NextResponse } from 'next/server';

export async function GET(res) {
    try {

        const promise = await users.list();
        return NextResponse.json({ promise }, { status: 200 });
    } catch (error) {
        console.log(error.message);
        return NextResponse.json({ error: error.message })
    }
}