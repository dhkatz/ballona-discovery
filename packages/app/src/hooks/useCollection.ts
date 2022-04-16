import { collection, CollectionReference, Query } from 'firebase/firestore';
import { User } from 'firebase/auth';
import { CollectionDataHook, useCollectionData } from 'react-firebase-hooks/firestore';

import { useAuth } from './useAuth';
import { useFirebase } from './useFirebase';

export const useCollection = <T>(
	collectionName: string,
	buildQuery: (ref: CollectionReference<T>, auth: User) => Query<T>
): CollectionDataHook<T> => {
	const { firestore } = useFirebase();
	const [auth] = useAuth();
	const ref = collection(firestore, collectionName) as CollectionReference<T>;
	const query = auth ? buildQuery(ref, auth) : null;

	const [data, loading, error, snapshot] = useCollectionData<T>(query);

	return [data, loading, error, snapshot];
};
