# KTB 실습 - 커뮤니티 사이트 구축하기

<img width="923" alt="커뮤니티 사이트 미리보기" src="https://github.com/user-attachments/assets/8e14f475-1e03-4a32-ae94-d94e880f8ffa" />

## 프로젝트 소개
커뮤니티 프로젝트는 **React와 TypeScript**를 기반으로 한 현대적인 웹 애플리케이션입니다. Styled Components를 활용한 반응형 디자인을 적용하여 다양한 디바이스에서 최적화된 사용자 경험을 제공합니다.

## 관련 링크
- [시연영상](https://drive.google.com/file/d/1v7JSTjw_RGEk7JXmlao5vI4ezt7EVncS/view?usp=sharing)
- [백엔드 저장소](https://github.com/100-hours-a-week/2-hyuk-kim-community-be)
- [배포 링크] - 준비중

### 개발 기간
2024.10.21 ~ (진행 중)

### 주요 기능
- **사용자 인증**: 로그인, 회원가입, 프로필 관리
- **게시판 기능**: 게시글 CRUD
- **댓글 기능**: 댓글 CRUD
- **좋아요 기능**: 게시글 좋아요/취소
- **반응형 디자인**: 모바일, 태블릿, 데스크톱 지원
- **무한 스크롤**: 게시글 목록 페이지네이션

## 기술 스택

### Frontend
- **Core**
    - React 19.0.0
    - TypeScript 5.7.2
    - Vite 6.0.3

- **상태 관리 & 라우팅**
    - Zustand 5.0.3
    - React Router DOM 7.0.2

- **스타일링**
    - Styled Components 6.1.13
    - Media Query (반응형)
    - Pretendard 폰트

- **네트워크**
    - Axios 1.7.9

### 개발 도구
- **정적 분석**
    - ESLint
    - Prettier
    - TypeScript

## 프로젝트 구조
```bash
src/
├── api/                # API 통신 관련
│   ├── auth.ts        # 인증 API
│   ├── axios.ts       # Axios 인스턴스 설정
│   ├── post.ts        # 게시글 API
│   └── user.ts        # 사용자 API
│
├── components/         # 재사용 컴포넌트
│   ├── CommentList.tsx
│   ├── CustomInput/TextArea
│   ├── DeleteDialog.tsx
│   ├── Header.tsx
│   └── PostList.tsx
│
├── hooks/             # 커스텀 훅
│   ├── authValidation.ts
│   ├── imageUploader.tsx
│   └── infiniteScroll.ts
│
├── pages/             # 페이지 컴포넌트
│   ├── LoginPage.tsx
│   ├── PostPages/
│   └── UserPages/
│
├── store/             # Zustand 스토어
│   ├── useLoadingStore.ts
│   └── useUserStore.ts
│
├── styles/            # 스타일 관련
│   ├── GlobalStyle.ts
│   └── ReactiveStyle.tsx
│
├── types/             # TypeScript 타입
│   └── models/        # 데이터 모델 타입
│
└── utils/             # 유틸리티
    ├── DateFormatter.ts
    └── stringValidators.ts
```

## 설치 및 실행

### 필수 환경
- Node.js 20.x 이상
- npm 11.x 이상

### 설치 방법
1. 저장소 클론
```bash
git clone https://github.com/100-hours-a-week/2-hyuk-kim-community-fe.git
cd ktb-community
```

2. 의존성 설치
```bash
npm install
```

3. 개발 서버 실행
```bash
npm run dev
```

### 빌드
```bash
npm run build
npm run preview  # 빌드 결과물 미리보기
```

## 코드 컨벤션

### Airbnb Style Guide
- ESLint와 Prettier를 통한 코드 품질 관리
- TypeScript strict 모드 사용

### 주요 컨벤션
- 컴포넌트: PascalCase (e.g., `PostList.tsx`)
- 훅/유틸: camelCase (e.g., `useUserStore.ts`)
- 스타일: Styled Components
- 들여쓰기: 4칸
- 세미콜론: 필수


## 추가 예정 기능
- 소셜 로그인
- 게시글 검색
- 사용자 프로필 페이지
- 이미지 최적화