import mongoose, { Schema } from 'mongoose';

// Video's Schema
const VideoSchema = new Schema({
    url:{
        type: String
    },
    info:{
        type: String
    },
    uploadDate: {
        type: Date,
        default: Date.now,
    },
    thumbnail:{
        //img url
        type: String,
        default: 'https://2.bp.blogspot.com/-muVbmju-gkA/Vir94NirTeI/AAAAAAAAT9c/VoHzHZzQmR4/s1600/placeholder-image.jpg'
    },
    genre:{
        type: Object,
        default: {}
    }
});


// Find video in mongodb
VideoSchema.statics.loadAllData = function () {
    return this.find({});
};



const Video = mongoose.model('Video', VideoSchema);
export default Video;
