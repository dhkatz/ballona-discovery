import React, { useCallback, useMemo } from 'react';
import {
	addDoc,
	updateDoc,
	doc,
	collection,
	CollectionReference,
	FirestoreDataConverter,
	Query,
	DocumentData,
	WithFieldValue,
	FirestoreError,
} from 'firebase/firestore';
import { User } from 'firebase/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import { useAuth } from './useAuth';
import { useFirebase } from './useFirebase';

export const buildConverter = <T>(): FirestoreDataConverter<T> => ({
	fromFirestore(snapshot, options) {
		const data = snapshot.data(options);

		return {
			...data,
			id: snapshot.id,
		} as any;
	},
	toFirestore(modelObject: WithFieldValue<T>): DocumentData {
		return modelObject as DocumentData;
	},
});

export const buildAudit = (auth: User) => ({
	uid: auth.uid,
});

export type CollectionHook<T> = [
	T[] | undefined,
	{
		loading: boolean;
		error: FirestoreError | undefined;
		update: (id: string, data: Partial<T>) => Promise<void>;
		add: (data: Partial<T>) => Promise<void>;
		remove: (id: string) => Promise<void>;
	}
];

export const useCollection = <T extends { id: string } = any>(
	collectionName: string,
	buildQuery?: (ref: CollectionReference<T>, auth: User) => Query<T>
): CollectionHook<T> => {
	const { firestore } = useFirebase();
	const [auth] = useAuth();

	const converter = useMemo(() => buildConverter<T>(), []);
	const collectionRef = useMemo(
		() =>
			collection(firestore, collectionName).withConverter(
				converter
			) as CollectionReference<T>,
		[firestore, collectionName, converter]
	);

	const builtQuery = useMemo(
		() => (auth ? (buildQuery ? buildQuery(collectionRef, auth) : collectionRef) : null),
		[auth, buildQuery, collectionRef]
	);

	const [data, loading, error] = useCollectionData<T>(builtQuery);

	const update = useCallback(
		async (id, data) => {
			if (!auth) return;

			const docRef = doc(firestore, collectionName, id);

			return updateDoc(docRef, { ...data, audit: buildAudit(auth) });
		},
		[collectionRef, auth]
	);

	const add = useCallback(
		async (data: Partial<T>) => {
			if (!auth) return;

			await addDoc<T>(collectionRef, { ...data, audit: buildAudit(auth) } as any);
		},
		[collectionRef, auth]
	);

	const remove = useCallback(
		async (id: string) => {
			if (!auth) return;

			const docRef = doc(firestore, collectionName, id);

			await updateDoc(docRef, {
				audit: {
					...buildAudit(auth),
					delete: true,
				},
			});
		},
		[collectionRef, auth]
	);

	return useMemo(
		() => [data, { loading, error, update, add, remove }],
		[data, loading, error, update, add, remove]
	) as CollectionHook<T>;
};
