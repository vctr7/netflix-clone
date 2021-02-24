import Joi from 'joi';
import Video from '../../models/video';

export const search = async (ctx) => {
    console.log('search : receive data!');

    const query = ctx.query.search;
    // console.log(query);
    const result = await Video.loadSearch(query);
    ctx.body = result;
}

export const movie = async (ctx) => {
    console.log('home : receive data!');

    // console.log(ctx.query.page);
    const page = Number(ctx.query.p);
    const result = await Video.loadAll(page);
    if (result) ctx.body = result;
    else ctx.body = [];
};

export const home = async (ctx) => {
    console.log('home : receive data!');
    const page = Number(ctx.query.p);
    // console.log(page);
    let categories = [];
    switch (page) {
        case 1: {
            categories.push({ 'TOP 12 🍿': await Video.loadPopular() });
            categories.push({ Anime: await Video.loadAnimation() });
            break;
        }
        case 2: {
            categories.push({ 'UK 🇬🇧': await Video.loadBritain() });
            break;
        }
        case 3: {
            categories.push({ Marvel: await Video.loadMarvel() });
            break;
        }
        case 4: {
            categories.push({ 'Japan 🇯🇵': await Video.loadJapan() });
            break;
        }
        case 5: {
            categories.push({ 'HongKong 🇭🇰': await Video.loadHK() });
            break;
        }
        case 6: {
            categories.push({ 'French Chic 🇫🇷': await Video.loadFrance() });
            break;
        }
        case 7: {
            categories.push({ 'Sci-Fi': await Video.loadSF() });
            break;
        }
        case 8: {
            categories.push({ "90's": await Video.load90() });
            break;
        }
        case 9: {
            categories.push({ Classic: await Video.loadClassic() });
            break;
        }
        case 10: {
            categories.push({ 'Woody Allen 👓': await Video.loadWoodyAllen() });
            break;
        }
        case 11: {
            categories.push({ Series: await Video.loadSeries() });
            break;
        }
        case 12: {
            categories.push({ Music: await Video.loadMusic() });
            break;
        }
        case 13: {
            categories.push({ Romance: await Video.loadRomance() });
            break;
        }

        case 14: {
            categories.push({ Hollywood: await Video.loadHollywood() });
            break;
        }

        default: {
            break;
        }
    }

    ctx.body = categories;
};

export const popular = async (ctx) => {
    console.log('home : receive data!');
    const videoInfo = await Video.loadPopular();
    ctx.body = videoInfo;
};

export const hollywood = async (ctx) => {
    console.log('home : receive data!');
    const videoInfo = await Video.loadHollywood();
    ctx.body = videoInfo;
};

export const anime = async (ctx) => {
    console.log('home : receive data!');
    const videoInfo = await Video.loadAnimation();
    ctx.body = videoInfo;
};

export const britain = async (ctx) => {
    console.log('home : receive data!');
    const videoInfo = await Video.loadBritain();
    ctx.body = videoInfo;
};

export const marvel = async (ctx) => {
    console.log('home : receive data!');
    const videoInfo = await Video.loadMarvel();
    ctx.body = videoInfo;
};

export const japan = async (ctx) => {
    console.log('home : receive data!');
    const videoInfo = await Video.loadJapan();
    ctx.body = videoInfo;
};

export const hongkong = async (ctx) => {
    console.log('home : receive data!');
    const videoInfo = await Video.loadHK();
    ctx.body = videoInfo;
};

export const france = async (ctx) => {
    console.log('home : receive data!');
    const videoInfo = await Video.loadFrance();
    ctx.body = videoInfo;
};

export const scifi = async (ctx) => {
    console.log('home : receive data!');
    const videoInfo = await Video.loadSF();
    ctx.body = videoInfo;
};

export const year90 = async (ctx) => {
    console.log('home : receive data!');
    const videoInfo = await Video.load90();
    ctx.body = videoInfo;
};

export const classic = async (ctx) => {
    console.log('home : receive data!');
    const videoInfo = await Video.loadClassic();
    ctx.body = videoInfo;
};

export const woodyallen = async (ctx) => {
    console.log('home : receive data!');
    const videoInfo = await Video.loadWoodyAllen();
    ctx.body = videoInfo;
};

export const series = async (ctx) => {
    console.log('home : receive data!');
    const videoInfo = await Video.loadSeries();
    ctx.body = videoInfo;
};
export const music = async (ctx) => {
    console.log('home : receive data!');
    const videoInfo = await Video.loadMusic();
    ctx.body = videoInfo;
};
export const romance = async (ctx) => {
    console.log('home : receive data!');
    const videoInfo = await Video.loadRomance();
    ctx.body = videoInfo;
};

export const play = async (ctx) => {
    console.log('play  : receive data!');
    const video = ctx.request.body;
    const vid = video.vdata._id;
    await Video.increasePlayTime(vid);
    ctx.status = 200;
};
