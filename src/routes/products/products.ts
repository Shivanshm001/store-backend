import express, { Router } from 'express';
import { config } from '@/config/config';
import {
    addNewProduct,
    deleteProduct,
    filterProducts,
    getAllProducts,
    getProductsOfCategory,
    getSingleProduct,
    searchProductByName,
    updateProduct
} from '@/controllers/products/products.controller';
import { validateProduct } from '@/middleware/productValidator';

const { multerUpload } = config;
const router: Router = express.Router();

router.get("/all", getAllProducts);
router.get("/search", searchProductByName);
router.get("/filter", filterProducts);
router.get("/product/:productID", getSingleProduct);
router.get("/category/:category", getProductsOfCategory);

router.post("/", multerUpload.single("image"), validateProduct, addNewProduct);

router.put("/:productID", updateProduct);

router.delete("/:productID", deleteProduct);


export {
    router
};
