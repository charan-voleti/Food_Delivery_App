import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://mohanqwe903:OVCejN1O1tP35P2l@cluster0.aewmw.mongodb.net/food-del').then(()=>console.log("MongoDB connected"));
}