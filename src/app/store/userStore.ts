/* eslint-disable @typescript-eslint/no-explicit-any */
import {create} from "zustand";

interface UserState {
  user: { userName: string; password: string } | null;
  setUser: (user: { userName: string; password: string }) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>((set: any) => ({
  user: null,
  setUser: (user: any) => set({ user }),
  clearUser: () => set({ user: null }),
}));
