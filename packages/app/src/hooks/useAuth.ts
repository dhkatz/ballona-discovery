import { useAuthState } from 'react-firebase-hooks/auth';
import { useFirebase } from './useFirebase';

export const useAuth = (): ReturnType<typeof useAuthState> => {
	const { auth } = useFirebase();
	const [user, loading, error] = useAuthState(auth);

	return [user, loading, error];
};
