import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/auth-context';

const ProtectedRoute = ({ children }: {children: JSX.Element}) => {
    const { isAuthUser } = useContext(AuthContext);
    if (!isAuthUser) {
      return <Navigate to="/sign-in" replace />;
    }
    return children;
};

export default ProtectedRoute