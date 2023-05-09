import mongoose from "mongoose";

export default async function connectMongo() {
    const url = `mongodb+srv://oangsa:oangsa58528@smh.ozvpalw.mongodb.net/?retryWrites=true&w=majority`
    if (mongoose.connection.readyState === 1) return mongoose.connection.asPromise();
    return await mongoose.connect(url);
}