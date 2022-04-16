import { useDocumentData } from 'react-firebase-hooks/firestore';
import { doc } from 'firebase/firestore';

import { useAuth } from './useAuth';
import { useFirebase } from './useFirebase';

export const useUser = (id?: string) => {
	const { firestore } = useFirebase();
	const [auth] = useAuth();
	const uid = id || auth?.uid;

	const [data, loading, error] = useDocumentData(!uid ? null : doc(firestore, `users/${uid}`));

	return [data, loading, error];
};
