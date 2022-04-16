import { FunctionComponent } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { User } from 'firebase/auth';

import { useAuth } from '../hooks';

export interface ProtectedRouteProps {
	allow?: (user: User) => boolean;
	redirectTo?: string;
}

export const ProtectedRoute: FunctionComponent<ProtectedRouteProps> = ({
	children,
	allow,
	redirectTo,
}) => {
	const [auth] = useAuth();

	if (!auth || (allow && !allow(auth))) {
		return <Navigate replace to={redirectTo ?? '/login'} />;
	}

	return children ? <>children</> : <Outlet />;
};
