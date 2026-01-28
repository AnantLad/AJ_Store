import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
        name :{type: String , required : true},
        description:{type: Array , required : true},
        price:{type: Number , required : true},
        offerPrice: {type: Number , require: true},
        image: {type: Array , require: true},
        category: {type: String , require: true},
        inStock:{type: Boolean , default :true},
    },{timestamps: true})
    
    const Product = mongoose.model.product || mongoose.model('product' , productSchema)
    
    export default Product
