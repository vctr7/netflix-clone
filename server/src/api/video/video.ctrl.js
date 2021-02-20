import Joi from 'joi';
import Video from '../../models/video';

export const home = async (ctx) => {
    console.log('home : receive data!');
    const videoInfo = await Video.loadAll();
    ctx.body = videoInfo;
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
