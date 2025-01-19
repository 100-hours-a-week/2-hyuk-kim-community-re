// store/useLoadingStore.ts
import { create } from 'zustand';

// 스토어의 상태와 액션들의 타입을 정의
interface LoadingStore {
    isLoading: boolean;      // 현재 로딩 상태
    loadingCount: number;    // 동시에 여러 API 호출이 있을 경우를 대비한 카운터
    showLoading: () => void; // 로딩 시작 액션
    hideLoading: () => void; // 로딩 종료 액션
}

// Zustand store 생성
export const useLoadingStore = create<LoadingStore>((set) => ({
    // 초기 상태
    isLoading: false,
    loadingCount: 0,

    // 로딩 시작: 카운트 증가 및 로딩 상태 true로 설정
    showLoading: () => set((state) => ({
        loadingCount: state.loadingCount + 1,
        isLoading: true,
    })),

    // 로딩 종료: 카운트 감소, 모든 로딩이 완료되면 로딩 상태 false로 설정
    hideLoading: () => set((state) => ({
        loadingCount: state.loadingCount - 1,
        isLoading: state.loadingCount > 1,
    })),
}));