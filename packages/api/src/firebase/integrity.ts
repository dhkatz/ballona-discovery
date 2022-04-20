import * as functions from 'firebase-functions';
import { getFirestore } from 'firebase-admin/firestore';

import { integrify } from 'integrify';

const db = getFirestore();

integrify({ config: { db, functions } });

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const replUserAttrs = integrify({
	rule: 'REPLICATE_ATTRIBUTES',
	source: {
		collection: 'users',
	},
	targets: [
		{
			collection: 'profiles',
			foreignKey: 'userId',
			attributeMapping: {
				role: 'role',
			},
		},
	],
});
