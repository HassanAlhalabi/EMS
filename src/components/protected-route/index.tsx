import { Navigate } from 'react-router-dom';
import useIsAuth from '../../hooks/useAuth';

const ProtectedRoute = ({ children }: {children: JSX.Element}) => {
  const isAuth = useIsAuth();
    if (!isAuth) {
      return <Navigate to="/sign-in" replace />;
    }
    return children;
};

export default ProtectedRoute