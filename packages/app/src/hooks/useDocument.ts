import { CollectionReference, DocumentReference, collection } from 'firebase/firestore';
import { User } from 'firebase/auth';
import { DocumentDataHook, useDocumentData } from 'react-firebase-hooks/firestore';

import { useAuth } from './useAuth';
import { useFirebase } from './useFirebase';

export const useDocument = <T>(
	collectionName: string,
	buildRef: (ref: CollectionReference, auth: User) => DocumentReference<T> | null
): DocumentDataHook<T> => {
	const { firestore } = useFirebase();
	const [auth] = useAuth();
	const ref = collection(firestore, collectionName);
	const query = auth ? buildRef(ref, auth) : null;

	const [data, loading, error, snapshot] = useDocumentData<T>(query);

	return [data, loading, error, snapshot];
};
