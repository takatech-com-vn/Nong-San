// productSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Product {
    id: string;
    title: string;
    price: string;
    thumbnail: string;
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
