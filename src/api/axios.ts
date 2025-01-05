import axios from 'axios';
import {STORAGE_KEYS} from '@/constants/storage.ts';

const instance = axios.create({
    baseURL: import.meta.env.VITE_REACT_APP_BASE_URL,
    timeout: Number(import.meta.env.VITE_REACT_APP_TIMEOUT) || 5000,
    headers: {
        'Content-Type': 'application/json;  charset=utf-8',
        'Time-Zone': 'Asia/Seoul',
        'sessionid': `${sessionStorage.getItem(STORAGE_KEYS.SESSION_ID)}` || null,
        'userid': `${sessionStorage.getItem(STORAGE_KEYS.USER_ID)}` || null,
    }
});

// response.data.data.key로 받아야하는 문제를 해결하기 위한 인터셉터
instance.interceptors.response.use(
    (response) => {
        // status 확인 및 데이터 구조 가공
        if (response.data?.status === 'success') { // status를 확인해서 success일 경우 status, message 삭제!
            return response.data; // 중첩 제거 후 반환
        }
        // status가 성공이 아닌 경우 에러 객체 생성
        return Promise.reject(new Error(response.data?.message || 'Unknown error occurred'));
    },
    (error) => {
        // 네트워크 에러 또는 서버 에러 처리
        return Promise.reject(error);
    }
);

export default instance;