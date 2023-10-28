import { account } from '@/appwrite/config';

export const login = async (email, password) => {
    const session = await account.createEmailSession(email, password);
    return session;
}