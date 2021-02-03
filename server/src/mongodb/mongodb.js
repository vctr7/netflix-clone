import mongoose from 'mongoose';
require("dotenv").config();

const { MONGO_URI, mDB_USER, mDB_PASSWORD } = process.env;
// Connect to MongoDB
export const connect = () => mongoose
  .connect(`mongodb://${mDB_USER}:${encodeURIComponent(mDB_PASSWORD)}@localhost:27017/admin`, {
    dbName: "netflix",
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((e) => {
    console.error(e);
  });

// connect();

mongoose.connection.on('error', (error) => {
  console.error("MongoDB connection error", error);
})

mongoose.connection.on('disconnected', () => {
    console.error("reconnect to MongoDB");
    connect();
})

// module.exports = connect;