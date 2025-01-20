import axios, { InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import useUserStore from '@/store/useUserStore';
import { useLoadingStore } from '@/store/useLoadingStore';

// CustomInternalAxiosRequestConfig 타입 정의
interface CustomInternalAxiosRequestConfig extends InternalAxiosRequestConfig {
    skipLoading?: boolean;
}

const instance = axios.create({
    baseURL: import.meta.env.VITE_REACT_APP_BASE_URL,
    timeout: Number(import.meta.env.VITE_REACT_APP_TIMEOUT) || 5000,
    // headers error !! : 해당 파일이 tsconfig. json에 포함되어 있지 않습니다.
    headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Time-Zone': 'Asia/Seoul',
    }
});

// 요청 인터셉터
instance.interceptors.request.use(
    (config: CustomInternalAxiosRequestConfig) => {
        const user = useUserStore.getState().user;

        // skipLoading이 true가 아닐 때만 로딩 표시
        if (!(config).skipLoading) {
            useLoadingStore.getState().showLoading();
        }

        // 헤더에 인증 정보 추가
        config.headers['userid'] = user?.userId || null;

        return config;
    },
    (error) => {
        if (!(error.config as CustomInternalAxiosRequestConfig).skipLoading) {
            useLoadingStore.getState().hideLoading();
        }
        return Promise.reject(error);
    }
);

// 응답 인터셉터
instance.interceptors.response.use(
    (response: AxiosResponse) => {
        // 로딩 상태 해제
        if (!(response.config as CustomInternalAxiosRequestConfig).skipLoading) {
            useLoadingStore.getState().hideLoading();
        }

        // 기존 로직
        if (response.data?.status === 'success') {
            return response.data;
        }

        if (response.data?.status === 'error' &&
            [401, 403].includes(response.status)) {
            useUserStore.getState().clearUser();
        }

        return Promise.reject(
            new Error(response.data?.message || 'Unknown error occurred')
        );
    },
    (error) => {
        // 로딩 상태 해제
        if (!(error.config as CustomInternalAxiosRequestConfig).skipLoading) {
            useLoadingStore.getState().hideLoading();
        }

        if (error.response?.status === 401) {
            useUserStore.getState().clearUser();
        }
        return Promise.reject(error);
    }
);

export default instance;