import Router from 'koa-router';
import posts from './posts';
import auth from './auth';
import movie from './movie/index';
import alarm from './alarm/index';

const api = new Router();

api.use('/posts', posts.routes());
api.use('/auth', auth.routes());
api.use('/movie',movie.routes())
api.use('/alarm',alarm.routes())


// 라우터를 내보냅니다.
export default api;
