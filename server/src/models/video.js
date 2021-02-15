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

VideoSchema.statics.loadAllData = function () {
    return this.find({}).sort({ v_url: 1 });
};

VideoSchema.statics.increasePlayTime = function (id) {
    this.findByIdAndUpdate(id, { $inc: { playCount: 1 } }, function (err) {
        if (err) {
            console.log('err');
        }
    });
};

// Find video in mongodb
VideoSchema.statics.findByVideoId = function (id) {
    return this.findOne(id);
};

const Video = mongoose.model('Video', VideoSchema);
export default Video;
