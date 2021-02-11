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

