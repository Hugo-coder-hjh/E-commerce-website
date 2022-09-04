import {Fragment} from "react";
import  {useSelector} from 'react-redux';
// when exporting const, you need to import {}
import { selectCategoriesMap } from '../../store/categories/category.selector';
// when exporting default, you don't need to import {}
import CategoryPreview from "../../components/category-preview/category-preview.component";


const CategoriesPreview = () => {
  const categoriesMap = useSelector(selectCategoriesMap);

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