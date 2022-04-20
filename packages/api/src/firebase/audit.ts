import * as functions from 'firebase-functions';
import { getFirestore, Timestamp } from 'firebase-admin/firestore';

const db = getFirestore();

export const auditCreate = functions.firestore
	.document('{collection}/{id}')
	.onCreate(async (snapshot, context) => {
		const { collection } = context.params;

		if (collection === 'audits') return;

		const path = snapshot.ref.path;
		const { eventType, eventId } = context;

		const afterData = snapshot.data() ?? null;

		const audit = afterData?.audit ?? {};

		const data = {
			after: afterData,
			metadata: {
				timestamp: snapshot.updateTime ?? convertTimestamp(context.timestamp),
				uid: context.auth?.uid ?? audit.uid ?? 'UNAVAILABLE',
				path,
				event: {
					type: eventType,
					id: eventId,
				},
			},
		};

		await db.collection('audits').add(data);
	});

export const auditUpdate = functions.firestore
	.document('{collection}/{id}')
	.onUpdate(async (change, context) => {
		const { collection } = context.params;

		if (collection === 'audits') return;

		const path = change.after.ref.path;
		const { eventType, eventId } = context;

		const beforeData = change.before.exists ? change.before.data() : null;
		const afterData = change.after.exists ? change.after.data() : null;

		const audit = afterData?.audit ?? {};

		if (audit.delete) {
			return await db.doc(path).delete({ lastUpdateTime: change.after.updateTime });
		}

		const data = {
			before: beforeData,
			after: afterData,
			metadata: {
				...audit,
				timestamp: change.after.updateTime ?? convertTimestamp(context.timestamp),
				uid: context.auth?.uid ?? audit.uid ?? 'UNAVAILABLE',
				path,
				event: {
					type: eventType,
					id: eventId,
				},
			},
		};

		await db.collection('audits').add(data);
	});

export const auditDelete = functions.firestore
	.document('{collection}/{id}')
	.onDelete(async (snapshot, context) => {
		const { collection } = context.params;

		if (collection === 'audits') return;

		const path = snapshot.ref.path;
		const { eventType, eventId } = context;

		const beforeData = snapshot.data() ?? null;

		const audit = beforeData?.audit ?? {};

		const data = {
			before: beforeData,
			metadata: {
				timestamp: snapshot.updateTime ?? convertTimestamp(context.timestamp),
				uid: context.auth?.uid ?? audit.uid ?? 'UNAVAILABLE',
				path,
				event: {
					type: eventType,
					id: eventId,
				},
			},
		};

		await db.collection('audits').add(data);
	});

function convertTimestamp(timestamp: string) {
	if (!timestamp || !timestamp.length || timestamp.length !== 27) return Timestamp.now();

	const [date, time] = timestamp.split('T');
	const [year, month, day] = date.split('-');
	const [left, right] = time.split('.');
	const [hour, minute, second] = left.split(':');
	const seconds =
		new Date(
			Date.UTC(
				Number.parseInt(year),
				Number.parseInt(month) - 1,
				Number.parseInt(day),
				Number.parseInt(hour),
				Number.parseInt(minute),
				Number.parseInt(second)
			)
		).getTime() / 1000;

	const nanos = Number.parseInt(right.substring(0, 6)) * 1000;

	return new Timestamp(seconds, nanos);
}
