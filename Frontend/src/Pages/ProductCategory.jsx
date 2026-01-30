import { useParams } from "react-router";
import { useAppContext } from "../context/Appcontext"
import { categories } from "../assets/assets";
import Productcart from "../components/Productcart";

export default function ProductCategory() {
    const { products } = useAppContext();
    const { category } = useParams()
    const searchCategory = categories.find((item) => item.path.toLocaleLowerCase() === category)
    const filterProduct = products.filter((product) => product.category.toLowerCase() === category)
    

    return (
        
        <div className="mt-16">
            {searchCategory && (
                <div className="flex flex-col items-end w-max">
                    <p className="text-2xl font-medium">{searchCategory.text.toLowerCase()}</p>
                    <div className="w-16 h-0.5 bg-green-600 rounded-full"></div>
                </div>
            )}
           
          {filterProduct.length > 0 ? (
             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4  gap-3 md:gap-6 mt-6">
                {filterProduct.map((product)=>(
                    <Productcart key={product._id} product={product}/>
                ))}
            </div>
          ):(
            <div className="flex items-center justify-center h-[60vh]">
                <p className="text-2xl font-medium text-primary">No Product Found In This Category</p>
            </div>
          )}

        </div>
    )
}
