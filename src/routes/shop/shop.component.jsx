import { useContext } from "react";
// when exporting const, you need to import {}
import { ProductsContext } from "../../components/contexts/products.context";
// when exporting default, you don't need to import {}
import ProductCard from "../../components/product-card/product-card.component";
// to deal with the over-big product card question
import './shop.styles.scss';

const Shop = () => {
    const {products} = useContext(ProductsContext);
   return(
    <div className='products-container'>
      {products.map((product) => (
       <ProductCard  key={product.id} product = {product}/>
        ))}
    </div>
   ) 
}

export default Shop;