import { Navigate } from 'react-router-dom';
import { isAuthUser } from '../../util';

const ProtectedRoute = ({ children }: {children: JSX.Element}) => {
    if (!isAuthUser()) {
      return <Navigate to="/sign-in" replace />;
    }
    return children;
};

export default ProtectedRoute