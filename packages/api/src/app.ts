/* istanbul ignore file */
import Koa from 'koa';
import cors from '@koa/cors';

const app = new Koa();

app.use(
	cors({
		origin: '*',
		credentials: true,
		keepHeadersOnError: true,
	})
);

export default app;
