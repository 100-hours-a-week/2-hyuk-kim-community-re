import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// 컴포넌트 임포트
// import Header from './components/Header';
import LoginPage from './pages/auth/LoginPage';

const App: React.FC = () => {
    return (
        <div className="app">
            <BrowserRouter>
                {/*<Header />*/}
                <main>
                    <Routes>
                        <Route path="/Login" element={<LoginPage />} />
                    </Routes>
                </main>
            </BrowserRouter>
        </div>
    );
};

export default App;