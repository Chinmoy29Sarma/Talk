import mongoose from "mongoose";

export const connectToDb = async () => {
  const MONGO_URL = process.env.MONGO_URL;
  try {
    const instance = await mongoose.connect(MONGO_URL);
    console.log(`Database Connected ${instance.connection.host}`);
  } catch (err) {
    console.log(err);
  }
};
