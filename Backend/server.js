import dotenv from 'dotenv';
dotenv.config();
import app from './app.js';
import connectDB from './configs/db.js'; 
import connectCloudinary from './configs/cloudinary.js';

const port = process.env.PORT || 4000;

await connectDB();
await connectCloudinary();

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});