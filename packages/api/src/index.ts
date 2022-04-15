/* istanbul ignore file */
import * as functions from 'firebase-functions';
import { Middleware } from 'koa';

import app from './app';
import router from './router';

const rewrite = (prefix: string): Middleware => {
	return async (ctx, next) => {
		if (ctx.url.startsWith(prefix)) {
			const original = ctx.url;
			ctx.url = ctx.url.replace(prefix, '');

			await next();

			ctx.url = original;
		}

		return next();
	};
};

app.use(rewrite('/api'));

app.use(router.routes());
app.use(router.allowedMethods());

export const api = functions.https.onRequest(app.callback());
