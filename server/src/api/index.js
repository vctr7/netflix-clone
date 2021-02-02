import Router from 'koa-router';
import auth from './auth';
import video from './video';

const api = new Router();

api.use('/auth', auth.routes());
api.use('/video', video.routes());

export default api;