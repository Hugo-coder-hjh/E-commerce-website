import { createContext, useState } from "react";

import PRODUCTS from '../../shop-data.json';

export const ProductsContext = createContext({
    // product data is a json file so we need to initiate it as an array
    products: [],
});

export const ProductsProvider = ({children}) => {
    const [products, setProducts] = useState(PRODUCTS);
    const value = {products};
    return (
        <ProductsContext.Provider value = {value}>{children}</ProductsContext.Provider>
    )
};