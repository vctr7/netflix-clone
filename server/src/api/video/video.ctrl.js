import Joi from 'joi';
import Video from '../../models/video';

export const home = async (ctx) => {
    console.log('home : receive data!');
    const videoInfo = await Video.loadAllData();
    ctx.body = videoInfo;
};

export const play = async (ctx) => {
    console.log('play  : receive data!');
    const video = ctx.request.body;
    const vid = video.vdata._id;
    await Video.increasePlayTime(vid);
    ctx.status = 200;
};
