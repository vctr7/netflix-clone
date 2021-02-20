import Router from 'koa-router';
import * as videoCtrl from './video.ctrl';

const video = new Router();

video.get('/home', videoCtrl.home);
video.get('/popular', videoCtrl.popular);
video.get('/anime', videoCtrl.anime);
video.get('/hollywood', videoCtrl.hollywood);
video.get('/britain', videoCtrl.britain);
video.get('/marvel', videoCtrl.marvel);
video.get('/japan', videoCtrl.japan);
video.get('/hongkong', videoCtrl.hongkong);
video.get('/france', videoCtrl.france);
video.get('/scifi', videoCtrl.scifi);
video.get('/year90', videoCtrl.year90);
video.get('/classic', videoCtrl.classic);
video.get('/woodyallen', videoCtrl.woodyallen);
video.get('/series', videoCtrl.series);
video.get('/music', videoCtrl.music);
video.get('/romance', videoCtrl.romance);

video.post('/play', videoCtrl.play);

export default video;