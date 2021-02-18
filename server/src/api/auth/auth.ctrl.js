import Joi from 'joi';
import User from '../../models/user';

export const register = async (ctx) => {
    console.log('register : receive data!');
    // const schema = Joi.object().keys({
    //   userId: Joi.string().required(),
    //   password: Joi.string().required(),
    //   userName: Joi.string().min(2).max(20).required(),
    //   emailAddress: Joi.string(),
    //   signBy: Joi.string().required(),
    // });

    // const result = schema.validate(ctx.request.body);
    // if (result.error) {
    //   ctx.status = 400;
    //   ctx.body = result.error;
    //   return;
    // }

    const { personalInfo, creditInfo } = ctx.request.body;

    const email = personalInfo.email;
    const password = personalInfo.password;
    const plan = personalInfo.plan;

    try {
        const exists = await User.findByUserEmail(email);
        if (exists) {
            ctx.status = 409;
            console.log('Already exist');
            return;
        }

        const user = new User({
            email,
            plan,
            creditInfo,
        });

        await user.setPassword(password);
        await user.save();
        ctx.body = user.serialize();
        const token = user.generateToken();
        ctx.cookies.set('access_token', token, {
            maxAge: 1000 * 60 * 60 * 24 * 7,
            httpOnly: true,
        });
    } catch (e) {
        ctx.throw(500, e);
    }
};

export const login = async (ctx) => {
    console.log('login : receive data!');
    const { account, password } = ctx.request.body;

    if (!account || !password) {
        ctx.status = 401;
        return;
    }

    try {
        const user = await User.findByUserEmail(account);
        if (!user) {
            ctx.status = 401;
            return;
        }
        const valid = await user.checkPassword(password);

        if (!valid) {
            ctx.status = 401;
            return;
        }

        ctx.body = user.serialize();

        const token = user.generateToken();
        ctx.cookies.set('access_token', token, {
            maxAge: 1000 * 60 * 60 * 24 * 7,
            httpOnly: true,
        });
    } catch (e) {
        throw (500, e);
    }
};

export const check = async (ctx) => {
    console.log('check : receive data!');
    const { user } = ctx.state;
    if (!user) {
        ctx.status = 401;
        return;
    }
    // console.log(user);
    const userinfo = await User.findByUserEmail(user.userId);
    ctx.body = userinfo;
};

export const logout = async (ctx) => {
    console.log('logout : receive data!');
    ctx.cookies.set('access_token');
    ctx.status = 204;
};

export const watched = async (ctx) => {
    console.log('watched : receive data!');
    const { user, vdata } = ctx.request.body;
    const uid = user.data._id;
    await User.addRecentlyWatched(uid, vdata);
};

export const mylist = async (ctx) => {
    console.log('mylist : receive data!');
    // console.log(ctx.request.body)
    const { user, videoInfo } = ctx.request.body;
    const uid = user.data._id;
    await User.addMyList(user, videoInfo);
};

export const likeVideo = async (ctx) => {
    console.log('likeVideo : receive data!');
    const { user, videoInfo } = ctx.request.body;
    const uid = user.data._id;
    await User.addLikeVideo(uid, videoInfo);
};

export const dislikeVideo = async (ctx) => {
    console.log('dislikeVideo : receive data!');
    const { user, videoInfo } = ctx.request.body;
    const uid = user.data._id;
    await User.addDislikeVideo(uid, videoInfo);
};