import { useContext, Fragment} from "react";
// when exporting const, you need to import {}
import { CategoriesContext } from "../../components/contexts/categories.context";
// when exporting default, you don't need to import {}
import CategoryPreview from "../../components/category-preview/category-preview.component";


const CategoriesPreview = () => {
    const {categoriesMap} = useContext(CategoriesContext);

   return(
    <Fragment>
      {Object.keys(categoriesMap).map((title)=>{
        const products = categoriesMap[title];
        return (
          <CategoryPreview key = {title} title = {title} products = {products}/>
        );
      })}
    </Fragment>  
   ) 
}

export default CategoriesPreview;