import React, { useCallback, useMemo } from 'react';
import {
	CollectionReference,
	DocumentReference,
	collection,
	doc,
	updateDoc,
	FirestoreError,
} from 'firebase/firestore';
import { User } from 'firebase/auth';
import { useDocumentData } from 'react-firebase-hooks/firestore';

import { useAuth } from './useAuth';
import { useFirebase } from './useFirebase';
import { buildAudit, buildConverter } from './useCollection';

export type DocumentHook<T> = [
	T | undefined,
	{
		loading: boolean;
		error: FirestoreError | undefined;
		update: (data: Partial<T>) => Promise<void>;
		remove: () => Promise<void>;
	}
];

export const useDocument = <T extends { id: string } = any>(
	collectionName: string,
	buildRef: (ref: CollectionReference, auth: User) => DocumentReference<T> | null
): DocumentHook<T> => {
	const { firestore } = useFirebase();
	const [auth] = useAuth();

	const converter = useMemo(() => buildConverter<T>(), []);
	const collectionRef = useMemo(
		() => collection(firestore, collectionName).withConverter(buildConverter<T>()),
		[firestore, collectionName, converter]
	);
	const query = useMemo(
		() => (auth ? buildRef(collectionRef, auth) : null),
		[auth, collectionRef, buildRef]
	);

	const [data, loading, error] = useDocumentData<T>(query);

	const update = useCallback(
		async (newData) => {
			if (!auth || !data) return;

			const docRef = doc(firestore, collectionName, data.id);

			await updateDoc(docRef, { ...newData, ...buildAudit(auth) });
		},
		[collectionRef, auth, data]
	);

	const remove = useCallback(async () => {
		if (!auth || !data) return;

		const docRef = doc(firestore, collectionName, data.id);

		await updateDoc(docRef, {
			...buildAudit(auth),
			delete: true,
		});
	}, [collectionRef, auth, data]);

	return useMemo(
		() => [data, { loading, error, update, remove }],
		[data, loading, error, update, remove]
	) as DocumentHook<T>;
};
