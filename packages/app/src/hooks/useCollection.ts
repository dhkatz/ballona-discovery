import {
	collection,
	CollectionReference,
	Query,
	FirestoreDataConverter,
	DocumentData,
	WithFieldValue,
} from 'firebase/firestore';
import { User } from 'firebase/auth';
import { CollectionDataHook, useCollectionData } from 'react-firebase-hooks/firestore';

import { useAuth } from './useAuth';
import { useFirebase } from './useFirebase';
import { useMemo } from 'react';

export const converter = <T>(): FirestoreDataConverter<T> => ({
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

export const useCollection = <T>(
	collectionName: string,
	buildQuery?: (ref: CollectionReference<T>, auth: User) => Query<T>
): CollectionDataHook<T> => {
	const { firestore } = useFirebase();
	const [auth] = useAuth();
	const conv = useMemo(() => converter<T>(), []);
	const ref = useMemo(
		() => collection(firestore, collectionName).withConverter(conv) as CollectionReference<T>,
		[firestore, collectionName, conv]
	);

	const builtQuery = useMemo(
		() => (auth ? (buildQuery ? buildQuery(ref, auth) : ref) : null),
		[auth, buildQuery, ref]
	);

	const [data, loading, error, snapshot] = useCollectionData<T>(builtQuery);

	return [data, loading, error, snapshot];
};
