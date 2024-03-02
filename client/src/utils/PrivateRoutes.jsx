import { Outlet, Navigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const PrivateRoutes = () => {
    const [cookies] = useCookies(['token']);
    const isAuthenticated = cookies.token !== undefined;

    return (
        isAuthenticated ? <Outlet /> : <Navigate to="/login" />
    );
};

export default PrivateRoutes;