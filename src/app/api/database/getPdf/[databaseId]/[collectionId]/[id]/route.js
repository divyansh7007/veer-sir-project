import conf from '@/utils/appwriteConfig';
import { NextResponse } from 'next/server';

export async function PATCH(request, params) {
    try {
        const promise = await conf.databases.getDocument(params.params.databaseId, params.params.collectionId, params.params.id);
        return NextResponse.json({ promise });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}