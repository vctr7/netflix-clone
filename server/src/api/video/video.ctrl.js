import Joi from 'joi';
import Video from '../../models/video';

export const home = async (ctx) => {
    console.log('home : receive data!');
    // const { user } = ctx.state;
    // if (!user) {
    //     ctx.status = 401;
    //     return;
    // }
    const videoinfo = await Video.loadAllData();
    ctx.body = videoinfo;
};

export const play = async (ctx) => {
    console.log('play  : receive data!');
    const video = ctx.request.body;
    const vid = video.vdata._id;

    try {
        await Video.findByIdAndUpdate(vid, {$inc : {play_time: 1} }).exec();
    } catch (e) {
        throw (500, e);
    }
};
