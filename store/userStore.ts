import {create} from 'zustand';
import {persist, PersistOptions} from 'zustand/middleware';

export const useUserStore = create(persist((set) => ({
    user: null,
    accessToken: null,
    refreshToken: null,
    login: (user : any, accessToken : string, refreshToken: string) => set({user, accessToken, refreshToken}),
}), {
    name: 'auth-storage',
    getStorage: () => localStorage,
} as PersistOptions<any>
))