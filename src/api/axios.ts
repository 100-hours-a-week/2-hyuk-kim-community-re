import axios from 'axios';
import useUserStore from '@/store/useUserStore';
import {STORAGE_KEYS} from '@/constants/storage';

const instance = axios.create({
    baseURL: import.meta.env.VITE_REACT_APP_BASE_URL,
    timeout: Number(import.meta.env.VITE_REACT_APP_TIMEOUT) || 5000,
    headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Time-Zone': 'Asia/Seoul',
    }
});

// 요청 인터셉터: 매 요청마다 최신 유저 정보 사용
instance.interceptors.request.use(
    (config) => {
        // zustand store에서 직접 현재 상태 가져오기
        const user = useUserStore.getState().user;

        // 헤더에 인증 정보 추가
        // config.headers['sessionid'] = user?.sessionId || null;
        config.headers['userid'] = user?.userId || null;

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 응답 인터셉터
instance.interceptors.response.use(
    (response) => {
        // 성공적인 응답 처리
        if (response.data?.status === 'success') {
            return response.data;
        }

        // 인증 오류 처리 (401, 403 등)
        if (response.data?.status === 'error' &&
            [401, 403].includes(response.status)) {
            // zustand store의 clearUser 액션 직접 호출
            useUserStore.getState().clearUser();
        }

        return Promise.reject(
            new Error(response.data?.message || 'Unknown error occurred')
        );
    },
    (error) => {
        // 네트워크 오류 또는 서버 오류 처리
        if (error.response?.status === 401) {
            useUserStore.getState().clearUser();
        }
        return Promise.reject(error);
    }
);

export default instance;