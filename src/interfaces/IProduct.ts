export interface IProduct {
    productID: string;
    name: string;
    imageName: string,
    imageUrl?: string,
    category: string;
    company: string;
    featured: boolean;
    rating: number;
    price: number;
}