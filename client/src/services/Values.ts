export interface Values {
    category_product: string;
    quantity_product: number;
    price_product: number;
    price_coupons: number;
    coupons_product: string;
    imageFileList : string;
}
export interface ProductVariationsProps {
    onSubmit: (values: Values) => void;
  }