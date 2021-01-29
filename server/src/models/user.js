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
});

// Encrypt password
UserSchema.methods.setPassword = async function (password) {
    const hash = await bcrypt.hash(password, 10);
    this.hashedPassword = hash;
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
