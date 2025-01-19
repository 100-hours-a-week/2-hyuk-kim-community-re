import { useNavigate, Outlet } from 'react-router-dom';  // Outlet import 추가
import { useIsAuthenticated } from "@/store/useUserStore.ts";
import { useEffect } from "react";

const ProtectedRoute = () => {  // children prop 제거
    const navigate = useNavigate();
    const isAuthenticated = useIsAuthenticated();

    useEffect(() => {
        if (!isAuthenticated) {
            alert('로그인이 필요한 서비스입니다.');
            navigate('/login');
        }
    }, [isAuthenticated, navigate]);

    return <Outlet />;  // children 대신 Outlet 사용
};

export default ProtectedRoute;