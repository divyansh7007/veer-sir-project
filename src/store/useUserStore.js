import { create } from 'zustand'

export const useUserStore = create((set) => ({
    isLogin: true,
    email: '',
    userName: '',
    isAdmin: false,
    premium: false,
    userId: '',
    increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
    removeAllBears: () => set({ bears: 0 }),
    setLogin: (login) => {
        if (login) {
            return set({ isLogin: login })
        }else {
            return set({ isLogin: login, isAdmin: false })
        }
    },
    setEmail: (enteredEmail) => set({ email: enteredEmail }),
    setUserName: (enteredUserName) => set({ userName: enteredUserName }),
    setAdmin: (admin) => set({ isAdmin: admin }),
    setPremium: (isPremium) => set({ premium: isPremium }),
    setUserId: (enteredUserId) => set({ userId: enteredUserId }),
}))
