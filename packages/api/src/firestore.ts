import * as functions from 'firebase-functions';
import { initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';

const app = initializeApp();

const auth = getAuth(app);
const db = getFirestore(app);

export const authOnCreate = functions.auth.user().onCreate(async ({ email, uid }) => {
	const role = 'user';

	console.log(`Creating user ${email} with role ${role}`);

	await auth.setCustomUserClaims(uid, {
		role,
	});

	return db.collection('users').doc(uid).set({ email, role });
});

export const authOnDelete = functions.auth.user().onDelete(({ uid }) => {
	console.log(`Deleting user ${uid}`);

	return db.collection('users').doc(uid).delete();
});

export const updateClaims = functions.firestore
	.document('users/{userId}')
	.onUpdate((change, { params }) => {
		const value = change.after.data();
		const claims = {
			role: value.role,
		};

		console.log(`Updating claims for ${params.userId} to ${JSON.stringify(claims)}`);

		return auth.setCustomUserClaims(params.userId, claims);
	});
