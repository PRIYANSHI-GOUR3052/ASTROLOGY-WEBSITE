import { create } from 'zustand'

interface AuthState {
  isLoggedIn: boolean
  user: { name: string; email: string } | null
  setLoggedIn: (user: { name: string; email: string } | null) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  user: null,
  setLoggedIn: (user) => set({ isLoggedIn: true, user }),
  logout: () => set({ isLoggedIn: false, user: null })
})) 