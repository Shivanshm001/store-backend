import express, { Router } from 'express';
import {
    addNewProduct,
    deleteProduct,
    filterProducts,
    getAllProducts,
    getProductCategories,
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
router.get("/categories", getProductCategories);
router.get("/:category", getProductsOfCategory);

router.post("/", validateProduct, multerUpload.single("image"), addNewProduct);

router.put("/:productID", updateProduct);

router.delete("/:productID", deleteProduct);


export {
    router
}