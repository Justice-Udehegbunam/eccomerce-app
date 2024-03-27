import { ReactElement, createContext, useEffect, useState } from "react";

export type ProductType = {
  sku: string;
  name: string;
  price: number;
};

const initState: ProductType[] = [];

// const initState: ProductType[] = [
//   {
//     sku: "item001",
//     name: "Widget",
//     price: 9.99,
//   },
//   {
//     sku: "item002",
//     name: "Premium Widget",
//     price: 19.99,
//   },
//   {
//     sku: "item003",
//     name: "Deluxe Widget",
//     price: 29.99,
//   },
// ];

export type useProductContextType = { products: ProductType[] };

const initContextState: useProductContextType = { products: [] };

const productsContext = createContext<useProductContextType>(initContextState);

type ChildrenType = { children?: ReactElement | ReactElement[] };

export const ProductsProvider = ({ children }: ChildrenType): ReactElement => {
  const [products, setProducts] = useState<ProductType[]>(initState);

  useEffect(() => {
    const fetchProducts = async (): Promise<ProductType[]> => {
      const data = await fetch("http://localhost:3500/products")
        .then((res) => {
          return res.json();
        })
        .catch((err) => {
          if (err instanceof Error) console.log(err.message);
        });
      return data;
    };

    fetchProducts().then((products) => setProducts(products));
  }, []);

  return (
    <productsContext.Provider value={{ products }}>
      {children}
    </productsContext.Provider>
  );
};

export default productsContext;
