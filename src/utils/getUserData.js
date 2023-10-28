'use client';
import { useUserStore } from '@/store/useUserStore';
import { account } from '@/appwrite/config';

export const getUserData = async () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { isLogin, setEmail, setUserName } = useUserStore((state) => state)

    if (isLogin) {
        const userData = await account.get();
        setEmail(userData.email);
        setUserName(userData.name);
    }else {
        const userData = undefined;
    }
    return userData;
}