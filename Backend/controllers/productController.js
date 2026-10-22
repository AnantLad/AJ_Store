import {v2 as cloudinary} from "cloudinary";
import Product from "../models/Product.js";
import fs from "fs";


// Add Product : /api/product/add

export const addProduct = async(req , res) =>{
    try {
        let productData = JSON.parse(req.body.productData)

        const images = req.files || [];

        let imagesUrl = await Promise.all(
            images.map(async (item)=>{
                try {
                    let result = await cloudinary.uploader.upload(item.path,{resource_type: 'image'});
                    if (fs.existsSync(item.path)) {
                        fs.unlinkSync(item.path);
                    }
                    return result.secure_url;
                } catch (uploadError) {
                    if (fs.existsSync(item.path)) {
                        fs.unlinkSync(item.path);
                    }
                    throw uploadError;
                }
            })
        )
        await Product.create({...productData, image:imagesUrl})

        res.json({success : true , message:"Product Added"})

    } catch (error) {
        console.log(error.message);
        res.json({success : false, message : error.message});
    }
} 

// Get Product : /api/product/list
export const productList = async(req , res) => {
    try {
        const products = await Product.find();
            res.json({success: true, products});

        }
     catch (error) {
        console.log(error.message);
        res.json({success : false, message : error.message});
    }
}

// Get single Product : /api/product/id
export const productById = async(req , res) => {
    try {
        const id = req.query.id || req.body.id || req.body;
        const product = await Product.findById(id);
        res.json({success:true , product})
    } catch (error) {
        console.log(error.message);
        res.json({success : false, message : error.message});
    }
}

// Chanre Product inStock : /api/product/stock
export const changeStock = async(req , res) => {
    try {
        const { id, inStock } = req.body 
        await Product.findByIdAndUpdate(id, {inStock})
         res.json({success:true , message: "Stock Updated"})
    } catch (error) {
        console.log(error.message);
        res.json({success : false, message : error.message});
    }
}

// Delete Product : /api/product/delete
export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.body;
        await Product.findByIdAndDelete(id);
        res.json({ success: true, message: "Product Deleted" });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};