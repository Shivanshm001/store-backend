import { randomBytes } from 'crypto';
import { Request, Response } from 'express';
import { ProductModel as Product } from '../../database/models/Products';
import { IProduct } from '../../interfaces/IProduct';
import { deleteImageFromS3, getImageFromS3, uploadImageToS3 } from './productImageHandlers';



export async function getAllProducts(req: Request, res: Response) {

    try {
        const products = await Product.find({});
        if (products.length <= 0) {
            res.status(404).json({ error: "No products found." });
            return;
        }
        for (const product of products) {
            const imageUrl = await getImageFromS3(product.imageName);
            product.imageUrl = imageUrl;
        }
        res.status(200).json({ products })

    } catch (error) {
        if (error) console.error(error);
        res.status(500).json({ error });
    }
}

export async function getSingleProduct(req: Request, res: Response) {
    const { productID } = req.params;
    try {
        const product = await Product.findById(productID);
        if (!product) {
            res.status(404).json({ error: 'Product not found' });
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

    try {
        if (!req.file) {
            res.status(401).json({ error: "Product image missing." });
            return;
        };
        await uploadImageToS3(req.file, randomImageName);
        const newProduct = new Product({ ...productInfo, productID: randomID, imageName: randomImageName });
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
            res.status(404).json({ error: "Product not found." });
            return;
        }

        await deleteImageFromS3(product.imageName);
        const deletedProduct = await Product.findOneAndDelete({ productID });
        if (deletedProduct) res.status(200).json({ deletedProduct });
        else res.status(204).json({ error: "Product not found." });

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
        else res.status(204).json({ error: "Product not found." });
    } catch (error) {
        if (error) {
            console.error(error);
            res.status(500).json({ error })
        }
    }
}

export async function getProductCategories(req: Request, res: Response) {
    try {
        const categories = await Product.distinct('category');
        console.log(categories);
        if (categories) res.status(200).json({ categories });
        else res.status(404).json({ error: "No categories found." });
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
        if (products) res.status(200).json({ products });
        else res.status(404).json({ error: `Product in category ${category} not found.` });
    } catch (error) {
        if (error) {
            console.error(error);
            res.status(500).json({ error })
        }
    }
}


export async function searchProductByName(req: Request, res: Response) {
    const { name } = req.query;
    const products = await Product.find({ name: { $regex: name, $options: 'i' } })
    if (products) res.status(200).json({ products });
    else res.status(404).json({ error: 'Product not found' });
};


export async function filterProducts(req: Request, res: Response) {
    const filters = { ...req.query };
    try {
        const filteredProducts = await Product.find({
            ...filters,
            price: { $gte: filters?.price || 0 },
            rating: { $gte: filters?.frating || 1 }
        });
        if (filteredProducts && filterProducts.length > 0) res.status(200).json({ filteredProducts });
        else res.status(404).json({ error: "No products found." });
    } catch (error) {
        if (error) {
            console.error(error);
            res.status(500).json({ error })
        }
    }
}