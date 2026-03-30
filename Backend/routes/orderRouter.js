import express from 'express';
import authUser from '../middlewares/authUser.js';
import { getUserOrder, placeOrderCOD, placeOrderStripe, verifyStripe, getAllOrder } from '../controllers/orderController.js';
import authSeller from '../middlewares/authSeller.js';

const orderRouter = express.Router();

orderRouter.post('/cod', authUser, placeOrderCOD)
orderRouter.post('/stripe', authUser, placeOrderStripe)
orderRouter.post('/verifyStripe', authUser, verifyStripe)
orderRouter.get('/user', authUser , getUserOrder)
orderRouter.get('/seller' ,authSeller, getAllOrder)

export default orderRouter;