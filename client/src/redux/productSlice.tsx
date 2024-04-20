// productSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Product {
    asin: string;
    product_title: string;
    product_price: string;
    product_photo: string;
}

interface ProductState {
    products: Product[];
}

const initialState: ProductState = {
    products: [],
};

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setProducts: (state, action: PayloadAction<Product[]>) => {
            state.products = action.payload;
        },
    },
});

export const { setProducts } = productSlice.actions;

export default productSlice.reducer;
