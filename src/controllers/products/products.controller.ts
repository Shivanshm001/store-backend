import { randomBytes } from 'crypto';
import { Request, Response } from 'express';
import { ProductModel as Product, ProductModel } from '../../database/models/Products';
import { IProduct } from '../../interfaces/IProduct';
import { deleteImageFromS3, getImageFromS3, uploadImageToS3 } from './productImageHandlers';



export async function getAllProducts(req: Request, res: Response) {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 6; //Number of items displayed on a single page.

    try {
        const totalItems = await ProductModel.countDocuments();
        const totalPages = Math.ceil(totalItems / limit);
        const products = await Product.find({}).skip((page - 1) * limit).limit(limit);
        if (products.length <= 0) {
            res.status(404).json({ error: "All products : No products found." });
            return;
        }
        for (const product of products) {
            const imageUrl = await getImageFromS3(product.imageName);
            product.imageUrl = imageUrl;
        }
        res.status(200).json({ products, currentPage: Number(page), totalPages })

    } catch (error) {
        if (error) console.error(error);
        res.status(500).json({ error });
    }
}

export async function getSingleProduct(req: Request, res: Response) {
    const { productID } = req.params;
    try {
        const product = await Product.findOne({ productID });
        if (!product) {
            res.status(404).json({ error: 'Single product : Product not found' });
            return;
        }
        const imageUrl = await getImageFromS3(product.imageName);
        product.imageUrl = imageUrl;
        res.status(200).json({ product });


    } catch (error) {
        if (error) {
            console.error(error);
            res.status(500).json({ error })
        }
    }
}


export async function addNewProduct(req: Request, res: Response) {
    const productInfo: IProduct = req.body;
    const randomID = randomBytes(16).toString('hex');
    const randomImageName = randomBytes(16).toString('hex');
    console.log(req.body, req.file);
    try {
        if (!req.file) {
            res.status(401).json({ error: "Product image missing." });
            return;
        };
        await uploadImageToS3(req.file, randomImageName);
        const newProduct = new Product({ ...productInfo, productID: randomID, imageName: randomImageName, imageUrl: " " });
        await newProduct.save();
        res.status(201).json({ newProduct })
    } catch (error) {
        if (error) {
            console.error(error);
            res.status(500).json({ error })
        }
    }

}


export async function deleteProduct(req: Request, res: Response) {
    const { productID } = req.params;
    try {
        const product = await Product.findOne({ productID });
        if (!product) {
            res.status(404).json({ error: "Delete product : Product not found." });
            return;
        }

        await deleteImageFromS3(product.imageName);
        const deletedProduct = await Product.findOneAndDelete({ productID });
        if (deletedProduct) res.status(200).json({ deletedProduct });
        else res.status(404).json({ error: "Delete product : Product not found." });

    } catch (error) {
        if (error) {
            console.error(error);
            res.status(500).json({ error })
        }
    }
}

export async function updateProduct(req: Request, res: Response) {
    const { productID } = req.params;
    try {
        const updatedProduct = await Product.findOneAndUpdate({ productID });
        if (updatedProduct) res.status(200).json({ updatedProduct });
        else res.status(204).json({ error: "Update product : Product not found." });
    } catch (error) {
        if (error) {
            console.error(error);
            res.status(500).json({ error })
        }
    }
}



export async function getProductsOfCategory(req: Request, res: Response) {
    const { category } = req.params;

    try {
        const products = await Product.find({ category });
        if (!products) res.status(404).json(`Product in category ${category} not found.`);
        for (const product of products) {
            const imageUrl = await getImageFromS3(product.imageName);
            product.imageUrl = imageUrl;
        }
        res.status(200).json({ products });
    } catch (error) {
        if (error) {
            console.error(error);
            res.status(500).json({ error })
        }
    }
}


export async function searchProductByName(req: Request, res: Response) {
    const { name } = req.query;
    try {
        const products = await Product.find({ name: { $regex: name, $options: 'i' } })
        if (products) res.status(200).json({ products });
        else res.status(404).json({ error: 'Product by name : Product not found' });
    } catch (error) {
        res.status(500).json({ error });
    }
};


export async function filterProducts(req: Request, res: Response) {
    const price = req.query?.price;
    const company = req.query?.company;
    const category = req.query?.category;
    const page = Number(req.query?.page) || 1;
    const limit = Number(req.query?.limit) || 6;

    try {
        const filteredProducts = await Product.find({
            company, category, price: { $gte: 0, $lte: Number(price) || 10000 },
        }).skip((page - 1) * limit).limit(limit);

        if (filteredProducts && filterProducts.length > 0) res.status(200).json({ products: filteredProducts });
        else res.status(404).json({ error: "Filter products : No products found." });
    } catch (error) {
        if (error) {
            console.error(error);
            res.status(500).json({ error })
        }
    }
}