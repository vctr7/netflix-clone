import mongoose, { Schema } from 'mongoose';

// Video's Schema
const VideoSchema = new Schema({
    url:{
        type: String
    },
    info:{
        type: Object
    },
    thumbnail:{
        type: String,
        default: 'https://2.bp.blogspot.com/-muVbmju-gkA/Vir94NirTeI/AAAAAAAAT9c/VoHzHZzQmR4/s1600/placeholder-image.jpg'
    },
    title:{
        type: String,
        default: 'x'
    }
});


// Find video in mongodb
VideoSchema.statics.loadAllData = function () {
    return this.find({}).sort({"v_url":1});
};



const Video = mongoose.model('Video', VideoSchema);
export default Video;
