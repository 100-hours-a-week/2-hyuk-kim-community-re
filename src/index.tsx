import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// import './index.css';  // 전역 스타일

// React 앱을 DOM에 마운트
ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        {/* 전역 Provider들을 여기서 설정 */}
        <App />
    </React.StrictMode>
);