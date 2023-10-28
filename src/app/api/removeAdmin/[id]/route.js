import sdk from 'node-appwrite';
import { NextResponse } from 'next/server';

const client = new sdk.Client().setEndpoint('https://cloud.appwrite.io/v1').setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID).setKey('580b6ef592a169bf80bfe9f8c0103c756b623aaa4bd4978a9ac6ac6b2add97b3b5cb89ff599bc823f112658dc5ce024bf75fe056da0843f2980521b1710fd5a388e65a578a2f2ef2fe8dfcb1d730f78b0182d6cb9dc6a600cb485f60a57918065fb71c74b733232c444227b69c20729500d50dc839311228d7c0fe39afd76817');

const users = new sdk.Users(client);

export async function GET(request, { params }) {
    try {
        const { id } = params;
        const promise = await users.updateLabels(id, ['noAdmin'])
        return NextResponse.json({ promise }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error })
    }
}