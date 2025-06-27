import mongoose from "mongoose";

export const connectDB = async ():Promise<void> => {
    try {
        const mongoURI = process.env.MONGO_URI as string;
        const conn = await mongoose.connect(mongoURI);
        console.log(`MongoDB connected ${conn.connection.host}`);
    } catch (error) {
        console.log(error instanceof Error ? error.message : error);
    }
}