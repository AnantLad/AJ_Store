import { describe, it, expect } from 'vitest';
import request from 'supertest';
import jwt from 'jsonwebtoken';
import app from '../app.js';
import User from '../models/User.js';

describe('Cart API', () => {
    const getUserCredentials = async (email, name) => {
        const user = await User.create({
            name,
            email,
            password: 'hashed_password_placeholder',
            cartItems: {}
        });
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        return { user, cookie: `token=${token}` };
    };

    it('should update cart items for the logged in user', async () => {
        const { user, cookie } = await getUserCredentials('userA@example.com', 'User A');
        
        const cartItems = { 'product_123': 2 };

        const res = await request(app)
            .post('/api/cart/update')
            .set('Cookie', cookie)
            .send({
                userId: 'some_other_id', // Spoofed ID to test IDOR vulnerability fix
                cartItems
            });

        expect(res.status).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.message).toBe('Cart Updated');

        const updatedUser = await User.findById(user._id);
        expect(updatedUser.cartItems).toEqual(cartItems);
    });

    it('should prevent cart updates if not logged in', async () => {
        const res = await request(app)
            .post('/api/cart/update')
            .send({
                userId: 'some_id',
                cartItems: { 'product_123': 2 }
            });

        expect(res.body.success).toBe(false);
        expect(res.body.message).toBe('Not Authorized');
    });
});
