import { TSendLoginAPI } from '@/services/types/types-sendlogin';
import { persist } from 'zustand/middleware';
import { create } from 'zustand';

type TUserStore = {
  user: TSendLoginAPI | null;
  token: string;
  actions: {
    setUser: (user: TSendLoginAPI) => void;
    setToken: (token: string) => void;
    logout: () => void;
  };
};

const userInitialState = {
  user: null,
  token: '',
};

export const useUserStore = create<TUserStore>()(
  persist(
    (set) => ({
      ...userInitialState,
      actions: {
        setUser: (user) => set({ user }),
        setToken: (token) => set({ token }),
        logout: () => set({ ...userInitialState }),
      },
    }),
    {
      name: 'user',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
      }),
    },
  ),
);

export const useUser = () => useUserStore((state) => state.user);
export const useToken = () => useUserStore((state) => state.token);
export const useUserActions = () => useUserStore((state) => state.actions);
