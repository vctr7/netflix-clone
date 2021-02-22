import { func } from 'joi';
import mongoose, { Schema } from 'mongoose';

// Video's Schema
const VideoSchema = new Schema({
    url: {
        type: String,
    },
    info: {
        type: Object,
    },
    thumbnail: {
        type: String,
        default:
            'https://2.bp.blogspot.com/-muVbmju-gkA/Vir94NirTeI/AAAAAAAAT9c/VoHzHZzQmR4/s1600/placeholder-image.jpg',
    },
    title: {
        type: String,
        default: 'x',
    },
    playCount: {
        type: Number,
        default: 0,
    },
});

VideoSchema.statics.loadAll = function (page) {
    if (page === 1) {
        return this.find({}).sort({ v_url: 1 }).skip(0).limit(30);
    } else {
        return this.find({})
            .sort({ v_url: 1 })
            .skip((page - 2) * 12 + 30)
            .limit(12);
    }
};

VideoSchema.statics.loadSearch = function (search) {
    if (search==='') return null;

    return this.find({
        $or: [
            { 'info.english_name': new RegExp(search, 'i') },
            { 'info.director': new RegExp(search, 'i') },
            { 'info.actors': new RegExp(search, 'i') },
            { 'info.genre': new RegExp(search, 'i') },
            { 'info.country': new RegExp(search, 'i') },
            { 'info.series': new RegExp(search, 'i') },
        ],
    });
};

VideoSchema.statics.loadPopular = function () {
    return this.find({ playCount: { $gt: 0 } })
        .sort({ playCount: -1 })
        .limit(12);
};

VideoSchema.statics.loadHollywood = function () {
    return this.find({ 'info.country': 'US' }).sort({ 'info.english_name': 1 });
};

VideoSchema.statics.loadAnimation = function () {
    return this.find({ 'info.genre': 'Animation' }).sort({
        'info.english_name': 1,
    });
};

VideoSchema.statics.loadBritain = function () {
    return this.find({ 'info.country': 'UK' }).sort({ 'info.english_name': 1 });
};

VideoSchema.statics.loadMarvel = function () {
    return this.find({ 'info.series': 'Marvel' }).sort({
        'info.english_name': 1,
    });
};

VideoSchema.statics.loadJapan = function () {
    return this.find({ 'info.country': 'Japan' }).sort({
        'info.english_name': 1,
    });
};

VideoSchema.statics.loadHK = function () {
    return this.find({ 'info.country': 'Hong Kong' }).sort({
        'info.english_name': 1,
    });
};

VideoSchema.statics.loadFrance = function () {
    return this.find({ 'info.country': 'France' }).sort({
        'info.english_name': 1,
    });
};

VideoSchema.statics.loadSF = function () {
    return this.find({ 'info.genre': 'Sci-Fi' }).sort({
        'info.english_name': 1,
    });
};
VideoSchema.statics.load90 = function () {
    return this.find({ 'info.year': { $in: [1990, 2000] } }).sort({
        'info.english_name': 1,
    });
};
VideoSchema.statics.loadClassic = function () {
    return this.find({ 'info.year': { $lt: 1990 } }).sort({
        'info.english_name': 1,
    });
};
VideoSchema.statics.loadWoodyAllen = function () {
    return this.find({ 'info.director': 'Woody Allen' }).sort({
        'info.year': -1,
    });
};
VideoSchema.statics.loadSeries = function () {
    return this.find({ 'info.series': { $ne: '' } }).sort({
        'info.english_name': 1,
    });
};
VideoSchema.statics.loadMusic = function () {
    return this.find({
        $or: [{ 'info.genre': 'Music' }, { 'info.genre': 'Musical' }],
    }).sort({ 'info.english_name': 1 });
};
VideoSchema.statics.loadRomance = function () {
    return this.find({ 'info.genre': 'Romance' }).sort({
        'info.english_name': 1,
    });
};

VideoSchema.statics.increasePlayTime = function (id) {
    this.findByIdAndUpdate(id, { $inc: { playCount: 1 } }, function (err) {
        if (err) console.log('err');
    });
};

// Find video in mongodb
VideoSchema.statics.findByVideoId = function (id) {
    return this.findOne(id);
};

const Video = mongoose.model('Video', VideoSchema);
export default Video;
