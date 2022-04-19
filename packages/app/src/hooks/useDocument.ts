import { CollectionReference, DocumentReference, collection } from 'firebase/firestore';
import { User } from 'firebase/auth';
import { DocumentDataHook, useDocumentData } from 'react-firebase-hooks/firestore';

import { useAuth } from './useAuth';
import { useFirebase } from './useFirebase';
import { converter } from './useCollection';
import { useMemo } from 'react';

export const useDocument = <T>(
	collectionName: string,
	buildRef: (ref: CollectionReference, auth: User) => DocumentReference<T> | null
): DocumentDataHook<T> => {
	const { firestore } = useFirebase();
	const [auth] = useAuth();
	const conv = useMemo(() => converter<T>(), []);
	const ref = useMemo(
		() => collection(firestore, collectionName).withConverter(converter<T>()),
		[firestore, collectionName, conv]
	);
	const query = useMemo(() => (auth ? buildRef(ref, auth) : null), [auth, ref, buildRef]);

	const [data, loading, error, snapshot] = useDocumentData<T>(query);

	return [data, loading, error, snapshot];
};
