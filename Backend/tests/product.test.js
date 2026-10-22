import { describe, it, expect } from 'vitest';
import request from 'supertest';
import jwt from 'jsonwebtoken';
import app from '../app.js';
import Product from '../models/Product.js';

describe('Product API', () => {
    const getSellerCookie = () => {
        const token = jwt.sign({ email: process.env.SELLER_EMAIL }, process.env.JWT_SECRET, { expiresIn: '7d' });
        return `sellerToken=${token}`;
    };

    it('should list products (empty by default)', async () => {
        const res = await request(app)
            .get('/api/product/list');

        expect(res.status).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.products).toEqual([]);
    });

    it('should fetch a single product by ID', async () => {
        const product = await Product.create({
            name: 'Fresh Apples',
            description: ['Crispy and fresh'],
            price: 5,
            offerPrice: 4,
            image: ['apple.jpg'],
            category: 'fruits',
            inStock: true
        });

        const res = await request(app)
            .get(`/api/product/id?id=${product._id}`);

        expect(res.status).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.product.name).toBe('Fresh Apples');
    });

    it('should allow seller to add a new product', async () => {
        const sellerCookie = getSellerCookie();
        
        const res = await request(app)
            .post('/api/product/add')
            .set('Cookie', sellerCookie)
            .field('productData', JSON.stringify({
                name: 'Organic Bananas',
                description: ['Rich in potassium'],
                price: 3,
                offerPrice: 2,
                category: 'fruits'
            }))
            .attach('images', Buffer.from('fake image content'), 'banana.png');

        expect(res.status).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.message).toBe('Product Added');

        const products = await Product.find({ name: 'Organic Bananas' });
        expect(products.length).toBe(1);
    });

    it('should block adding a product if not authorized as seller', async () => {
        const res = await request(app)
            .post('/api/product/add')
            .field('productData', JSON.stringify({
                name: 'Organic Bananas',
                description: ['Rich in potassium'],
                price: 3,
                offerPrice: 2,
                category: 'fruits'
            }));

        expect(res.body.success).toBe(false);
        expect(res.body.message).toBe('Not Authorized');
    });
});
