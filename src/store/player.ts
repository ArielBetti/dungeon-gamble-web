import { TPlayerInfoAPI } from '@/services/types/types-get-player-info';
import { create } from 'zustand';

type TPlayerStore = {
  player: TPlayerInfoAPI | null;
  actions: {
    setPlayer: (player: TPlayerInfoAPI) => void;
  };
};

const playerInitialState = {
  player: null,
};

export const usePlayerStore = create<TPlayerStore>((set) => ({
  ...playerInitialState,
  actions: {
    setPlayer: (player) => set({ player }),
  },
}));

export const usePlayer = () => usePlayerStore((state) => state.player);
export const usePlayerActions = () => usePlayerStore((state) => state.actions);
