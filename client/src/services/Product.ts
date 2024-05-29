export interface Product {
    createdAt: string;
    name: string;
    thumbnail: string[];
    price: number;
    quantity: number;
    brand: string;
    mota: string;
    thongsokithuat: [];
    id: string;
    variations: { price: number; capacity: string; }[]; 
    category: string;
    danhmuc: string
}


