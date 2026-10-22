import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import { beforeAll, afterAll, beforeEach, vi } from 'vitest';

// Mock Cloudinary globally for all tests
vi.mock('cloudinary', () => {
    return {
        v2: {
            config: vi.fn(),
            uploader: {
                upload: vi.fn().mockResolvedValue({
                    secure_url: 'https://res.cloudinary.com/dummy/image/upload/v12345/sample.jpg'
                })
            }
        }
    };
});

beforeAll(async () => {
    const mongoURI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017";
    // Connect to a separate test database
    await mongoose.connect(`${mongoURI}/aj_store_test`);
});

afterAll(async () => {
    await mongoose.connection.close();
});

beforeEach(async () => {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
        await collections[key].deleteMany({});
    }
});
