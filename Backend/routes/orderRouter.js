import express from 'express';
import authUser from '../middlewares/authUser.js';
import { getUserOrder, placeOrderCOD } from '../controllers/orderController.js';
import authSeller from '../middlewares/authSeller.js';
import { getAddress } from '../controllers/addressController.js';

const orderRouter = express.Router();

orderRouter.post('.cod', authUser, placeOrderCOD)
orderRouter.get('/user', authUser , getUserOrder)
orderRouter.post('/seller' ,authSeller, getAddress)

export default orderRouter;