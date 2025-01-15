import React from 'react';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Header from "./components/Header";

// 컴포넌트 임포트
// import Header from './components/Header';
import './App.css'
import LoginPage from './pages/LoginPage.tsx';
import SignUpPage from "@/pages/SignUpPage.tsx";
import UpdateUserInfoPage from "@/pages/UpdateUserInfoPage.tsx";
import UpdateUserPasswordPage from "@/pages/UpdateUserPasswordPage.tsx";
import PostList from "@/components/PostList.tsx";
import PostListPage from "@/pages/PostListPage.tsx";
import PostCreatePage from "@/pages/PostCreatePage.tsx";
import PostDetailPage from "@/pages/PostDetailPage.tsx";
import PostUpdatePage from "@/pages/PostUpdatePage.tsx";

const App: React.FC = () => {
    return (
        <div className="app">
            <BrowserRouter>
                <Header />
                <main>
                    <Routes>
                        <Route path="/" element={<Navigate to="/posts" replace />} />
                    {/*     auth*/}
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/signup" element={<SignUpPage />} />
                        <Route path="/settings/profile" element={<UpdateUserInfoPage />} />
                        <Route path="/settings/password" element={<UpdateUserPasswordPage />} />

                    {/*    board*/}
                        <Route path="/posts" element={<PostListPage />} />
                        <Route path="/posts/create" element={<PostCreatePage />} />
                        <Route path="/posts/:postId" element={<PostDetailPage />} />
                        <Route path="/posts/:postId/edit" element={<PostUpdatePage />} />
                    </Routes>
                </main>
            </BrowserRouter>
        </div>
    );
};

export default App;