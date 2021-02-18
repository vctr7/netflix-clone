import Router from 'koa-router';
import * as authCtrl from './auth.ctrl';

const auth = new Router();

auth.post('/register', authCtrl.register);
auth.post('/login', authCtrl.login);
auth.get('/check', authCtrl.check);
auth.post('/logout', authCtrl.logout);

auth.post('/watched', authCtrl.watched)
auth.post('/mylist', authCtrl.mylist);
auth.post('/likeVideo', authCtrl.likeVideo);
auth.post('/dislikeVideo', authCtrl.dislikeVideo);

export default auth;