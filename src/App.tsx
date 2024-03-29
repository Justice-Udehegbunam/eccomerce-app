import { useState } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Cart from "./components/Cart";
import ProductList from "./components/ProductList";

function App() {
  const [viewCart, setViewCart] = useState(false);

  const pageContent = viewCart ? <Cart /> : <ProductList />;

  const content = (
    <>
      <Header viewCart={viewCart} setViewCart={setViewCart} />
      {pageContent}
      <Footer viewCart={viewCart} />
    </>
  );

  return content;
}

export default App;
