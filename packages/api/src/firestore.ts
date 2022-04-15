import * as functions from 'firebase-functions';
import { initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

const app = initializeApp();
const firestore = getFirestore(app);

export const authOnCreate = functions.auth.user().onCreate((user) => {
	const { email, uid } = user;

	return firestore.collection('users').doc(uid).set({ email });
});

export const authOnDelete = functions.auth.user().onDelete((user) => {
	const { uid } = user;

	return firestore.collection('users').doc(uid).delete();
});