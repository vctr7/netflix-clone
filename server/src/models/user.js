import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// User's Schema
const UserSchema = new Schema({
    email: {
        type: String,
        default: '',
    },
    hashedPassword: {
        type: String,
    },
    plan: {
        type: String,
    },
    creditInfo: {
        type: Object,
        firstName: { type: String },
        lastName: {
            type: String,
        },
        zipCode: {
            type: String,
        },
        cardNumber: {
            type: String,
        },
        expirationDate: {
            type: String,
        },
        cvv: {
            type: String,
        },
    },
    createdDate: {
        type: Date,
        default: Date.now,
    },
    myList: {
        type: Object,
        default: {},
    },
    likeVideo: {
        type: Object,
        default: {},
    },
    dislikeVideo: {
        type: Object,
        default: {},
    },
    recentlyWatched: {
        type: Object,
        default: {},
    },
});

// Encrypt password
UserSchema.methods.setPassword = async function (password) {
    const hash = await bcrypt.hash(password, 10);
    this.hashedPassword = hash;
};

// Add movie to myList
UserSchema.statics.addMyList = function (user, videoInfo) {
    const uid = user.data._id;

    if (user.data.myList.find((video) => video.v_url === videoInfo.v_url)) {
        this.findByIdAndUpdate(uid, { $pull: { myList: { _id: videoInfo._id } } }, function (err) {
                if (err) console.log('err');
            },
        );
    }
    else {
        this.findByIdAndUpdate(uid, { $push: { myList: videoInfo } }, function (err) {
                if (err) console.log('err');
            },
        );
    }
};

// Add movie to likeList
UserSchema.statics.addLikeVideo = function (user, videoInfo) {
    const uid = user.data._id;

    if (user.data.likeVideo.find((video) => video.v_url === videoInfo.v_url)) {
        this.findByIdAndUpdate(uid, { $pull: { likeVideo: { _id: videoInfo._id } } }, function (err) {
                if (err) console.log('err');
            },
        );
    }
    else if (user.data.dislikeVideo.find((video) => video.v_url === videoInfo.v_url)) {
        this.findByIdAndUpdate(uid, { $pull: { dislikeVideo: { _id: videoInfo._id } } }, function (err) {
                if (err) console.log('err');
            },
        );
        this.findByIdAndUpdate(uid, { $push: { likeVideo: videoInfo } }, function (err) {
                if (err) console.log('err');
            },
        );
    }
    else {
        this.findByIdAndUpdate(uid, { $push: { likeVideo: videoInfo } }, function (err) {
                if (err) console.log('err');
            },
        );
    }
};

// Add movie to dislikeList
UserSchema.statics.addDislikeVideo = function (user, videoInfo) {
    const uid = user.data._id;

    if (user.data.likeVideo.find((video) => video.v_url === videoInfo.v_url)) {
        this.findByIdAndUpdate(uid, { $pull: { likeVideo: { _id: videoInfo._id } } }, function (err) {
                if (err) console.log('err');
            },
        );
        this.findByIdAndUpdate(uid, { $push: { dislikeVideo: videoInfo } }, function (err) {
                if (err) console.log('err');
            },
        );
    } 
    else if (user.data.dislikeVideo.find((video) => video.v_url === videoInfo.v_url)) {
        this.findByIdAndUpdate(uid, { $pull: { dislikeVideo: { _id: videoInfo._id } } }, function (err) {
                if (err) console.log('err');
            },
        );
    }
    else {
        this.findByIdAndUpdate(uid, { $push: { dislikeVideo: videoInfo } }, function (err) {
                if (err) console.log('err');
            },
        );
    }
};

// Add movie to recentlyWatched
UserSchema.statics.addRecentlyWatched = function (uid, videoInfo) {
    this.findByIdAndUpdate(
        uid,
        { $pull: { recentlyWatched: { _id: videoInfo._id } } },
        { safe: true, upsert: true },
        function (err, node) {
            if (err) {
                console.log('err');
            }
        },
    );
    this.findByIdAndUpdate(
        uid,
        { $push: { recentlyWatched: videoInfo } },
        function (err) {
            if (err) {
                console.log('err');
            }
        },
    );
};

// Check password when login
UserSchema.methods.checkPassword = async function (password) {
    const result = await bcrypt.compare(password, this.hashedPassword);
    return result;
};

// Find user in mongodb
UserSchema.statics.findByUserEmail = function (email) {
    return this.findOne({ email });
};

// Serialize User record
UserSchema.methods.serialize = function () {
    const data = this.toJSON();
    delete data.hashedPassword;
    return data;
};

// Generate token for user
UserSchema.methods.generateToken = function () {
    const token = jwt.sign(
        {
            _id: this.id,
            userId: this.email,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '7d',
        },
    );
    return token;
};

const User = mongoose.model('User', UserSchema);
export default User;
