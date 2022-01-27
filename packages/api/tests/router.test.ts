import supertest from 'supertest';

import router from '../src/router';
import Koa from 'koa';

const app = new Koa();
const request = supertest(app.callback());

app.use(router.routes());
app.use(router.allowedMethods());

it('should return hello world in the body', async () => {
	const res = await request.get('/').expect(200).send();

	expect(res.text).toEqual('Hello World');
});
