import { useNavigate, Outlet } from 'react-router-dom';
import { useIsAuthenticated } from "@/store/useUserStore.ts";
import { useEffect } from "react";

const ProtectedRoute = () => {
    const navigate = useNavigate();
    const isAuthenticated = useIsAuthenticated();

    useEffect(() => {
        if (!isAuthenticated) {
            alert('로그인이 필요한 서비스입니다.');
            navigate('/login', { replace: true });
        }
    }, []); // 빈 의존성 배열

    if (!isAuthenticated) {
        return null;
    }

    return <Outlet />;
};

export default ProtectedRoute;