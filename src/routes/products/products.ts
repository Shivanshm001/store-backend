import express, { Router } from 'express';
import {
    addNewProduct,
    deleteProduct,
    filterProducts,
    getAllProducts,
    getProductsOfCategory,
    getSingleProduct,
    searchProductByName,
    updateProduct
} from '../../controllers/products/products';
import { validateProduct } from '../../middleware/productValidator';
import { config } from '../../config/config';

const { multerUpload } = config;
const router: Router = express.Router();

router.get("/", getAllProducts);
router.get("/search", searchProductByName);
router.get("/filter", filterProducts);
router.get("/:id", getSingleProduct);
router.get("/category/:category", getProductsOfCategory);

router.post("/", multerUpload.single("image"), validateProduct, addNewProduct);

router.put("/:productID", updateProduct);

router.delete("/:productID", deleteProduct);


export {
    router
}