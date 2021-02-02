import Router from 'koa-router';
import * as videoCtrl from './video.ctrl';

const video = new Router();

// video.post('/register', video.register);
// video.post('/login', video.login);
video.get('/home', videoCtrl.home);
// video.post('/logout', video.logout);

export default video;