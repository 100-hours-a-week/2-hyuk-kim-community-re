import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import {User} from "@/types/models/user.ts";
// import
//
// // 1. 기본 타입 정의
// interface User {
//     id: string
//     profile: string | null
// }

interface UserState {
    user: User | null
    isAuthenticated: boolean
    setUser: (user: User) => void
    updateUser: (user: User) => void
    clearUser: () => void
}

// 2. 주요 store 생성
const useUserStore = create<UserState>()(
    persist(
        (set) => ({
            // 초기 상태
            user: null,
            isAuthenticated: false,

            // 유저 설정 (로그인)
            setUser: (user) =>
                set({
                    user,
                    isAuthenticated: true,
                }),

            // 유저 제거 (로그아웃)
            clearUser: () =>
                set({
                    user: null,
                    isAuthenticated: false,
                }),

            // 유저 업데이트
            updateUser: (updates) =>
                set((state) => ({
                    user: state.user ? { ...state.user, ...updates } : null,
                    // isAuthenticated는 유지 (이미 로그인된 상태의 업데이트이므로)
                    isAuthenticated: state.isAuthenticated,
                })),
        }),
        {
            // 세션 스토리지 설정
            name: 'user-storage',
            storage: createJSONStorage(() => sessionStorage),
            partialize: (state) => ({
                user: state.user,
                isAuthenticated: state.isAuthenticated,
            }),
        }
    )
)

// 3. 커스텀 훅 내보내기
export const useUser = () => useUserStore((state) => state.user)
export const useIsAuthenticated = () => useUserStore((state) => state.isAuthenticated)
export const useUserActions = () => ({
    setUser: useUserStore((state) => state.setUser),
    clearUser: useUserStore((state) => state.clearUser),
})

export default useUserStore