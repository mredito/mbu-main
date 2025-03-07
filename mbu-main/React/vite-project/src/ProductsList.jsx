import { useEffect,  useState } from "react";
import { getProducts,getProductCatageries,getProductForMeUsingCategory  } from "./api";
import { ProductCard } from "./ProductCard/ProductCard";
import { Input } from "./components/ui/input";
import {
  Select,
  SelectContent,
  
  SelectItem,
 
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [categories, setProductCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);

  const fetchProductsData = async () => {
    const data = await getProducts();
    setProducts(data);
  };

  const fetchCategoryData = async () => {
    const data = await getProductCatageries();
    setProductCategory(data);
  };
  // const fetchProductByCategory = async (Category) => {
  //   const data = await getProductByCategory(Category);
  //   setProducts(data);
  // };

  const CategoryUpdateTrigger = async () => {
    console.log(`Inside Trigger; Category Changed to ${selectedCategory}`)
    const recivedData = await getProductForMeUsingCategory(selectedCategory);
    console.log("Received Data",recivedData);
    setProducts(recivedData);
    }
    useEffect(() => {
      console.log("INSIDE USE EFFECT");
        CategoryUpdateTrigger();
    }, [selectedCategory]);

  useEffect(() => {
    fetchCategoryData();
    fetchProductsData();
  }, []); //Component Did Mount

  // useEffect(() => {
  //   if(selectedCategory) {
  //     fetchProductByCategory(selectedCategory)
  //   }

  // }, [selectedCategory])
  useEffect (() => {
    console.log(`Category Changed to ${selectedCategory}`);
  },[selectedCategory])

  console.log(search);
  console.log(categories);
  console.log(selectedCategory);
  console.log(categories);

  const filteredProducts = products.filter((product) => {
    return product.title.includes(search);
  });

  return (
    <>
      <Input
        autoFocus
        className="my-2 mx-auto w-1/2 h-10"
        placeholder="Search Products"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />

<Select onValueChange={(SelectedVal) => {
  setSelectedCategory(SelectedVal)
}}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a items" />
        <SelectContent>
          {
            categories.map((Category) => {
              return <SelectItem key={Category} value={Category}>{Category}</SelectItem>
            })
          }
        </SelectContent>
      </SelectTrigger>
      </Select>

      <div className="grid grid-cols-5 gap-4 p-2">
        {filteredProducts.map((product) => {
          return (
            <ProductCard
              key={product.id}
              imageUrl={product.image}
              price={product.price}
              title={product.title}
            />
          );
        })}
      </div>
    </>
  );
};

export default ProductsList;