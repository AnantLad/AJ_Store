import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../app.js';

describe('User Authentication API', () => {
    it('should register a new user successfully', async () => {
        const res = await request(app)
            .post('/api/user/register')
            .send({
                name: 'John Doe',
                email: 'john@example.com',
                password: 'password123'
            });

        expect(res.status).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.user).toBeDefined();
        expect(res.body.user.name).toBe('John Doe');
        expect(res.body.user.email).toBe('john@example.com');
        expect(res.headers['set-cookie']).toBeDefined();
    });

    it('should fail registration if details are missing', async () => {
        const res = await request(app)
            .post('/api/user/register')
            .send({
                email: 'john@example.com'
            });

        expect(res.body.success).toBe(false);
        expect(res.body.message).toContain('Missing Details');
    });

    it('should login an existing user', async () => {
        await request(app)
            .post('/api/user/register')
            .send({
                name: 'John Doe',
                email: 'john@example.com',
                password: 'password123'
            });

        const res = await request(app)
            .post('/api/user/login')
            .send({
                email: 'john@example.com',
                password: 'password123'
            });

        expect(res.status).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.user.email).toBe('john@example.com');
        expect(res.headers['set-cookie']).toBeDefined();
    });

    it('should fail login with incorrect password', async () => {
        await request(app)
            .post('/api/user/register')
            .send({
                name: 'John Doe',
                email: 'john@example.com',
                password: 'password123'
            });

        const res = await request(app)
            .post('/api/user/login')
            .send({
                email: 'john@example.com',
                password: 'wrongpassword'
            });

        expect(res.body.success).toBe(false);
        expect(res.body.message).toContain('Invaild Email and password');
    });

    it('should check auth status using cookie', async () => {
        const regRes = await request(app)
            .post('/api/user/register')
            .send({
                name: 'John Doe',
                email: 'john@example.com',
                password: 'password123'
            });

        const cookie = regRes.headers['set-cookie'][0];

        const res = await request(app)
            .get('/api/user/is-auth')
            .set('Cookie', cookie);

        expect(res.status).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.user.email).toBe('john@example.com');
    });

    it('should logout a logged in user', async () => {
        const regRes = await request(app)
            .post('/api/user/register')
            .send({
                name: 'John Doe',
                email: 'john@example.com',
                password: 'password123'
            });

        const cookie = regRes.headers['set-cookie'][0];

        const res = await request(app)
            .get('/api/user/logout')
            .set('Cookie', cookie);

        expect(res.status).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.message).toBe('Logged Out');
    });
});
