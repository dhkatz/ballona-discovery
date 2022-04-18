import * as functions from 'firebase-functions';
import { initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

const app = initializeApp();
const db = getFirestore(app);

export const authOnCreate = functions.auth.user().onCreate((user) => {
	const { email, uid } = user;

	return db.collection('users').doc(uid).set({ email });
});

export const authOnDelete = functions.auth.user().onDelete((user) => {
	const { uid } = user;

	return db.collection('users').doc(uid).delete();
});
