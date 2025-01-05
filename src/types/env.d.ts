declare namespace NodeJS {
    interface ProcessEnv {
        VITE_REACT_APP_PORT: string;

        VITE_REACT_APP_BASE_URL: string;
        VITE_REACT_APP_TIMEOUT: string;
    }
}