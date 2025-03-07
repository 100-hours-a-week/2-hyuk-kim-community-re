// src/config/vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
    plugins: [
        react({
            include: ["**/*.tsx", "**/*.ts"],
        })
    ],

    assetsInclude: ['**/*.svg'],
    root: process.cwd(),  // src 폴더를 루트로 설정
    server: {
        port: 3000,
        open: true  // 서버 시작 시 브라우저 자동 열기
    },
    build: {
        outDir: 'build',  // 빌드 출력 경로를 상대 경로로 수정
        emptyOutDir: true,
        // skipTypeCheck: true // TypeScript 타입 체크를 건너뛰고 빌드
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src')  // src 폴더에 대한 별칭 설정
        }
    }
})