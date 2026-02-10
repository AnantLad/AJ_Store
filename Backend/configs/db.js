import mongoose from "mongoose";

const connectDB = async () => {
    try {
        mongoose.connection.on('connected', () => 
            console.log("Database Connected")
        );
        
        const mongoURI = process.env.MONGODB_URI
        await mongoose.connect(`${mongoURI}/aj_store`, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    } catch (error) {
        console.error("MongoDB connection error:", error.message);
    }
};

export default connectDB;
