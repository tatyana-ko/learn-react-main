import { useState } from 'react';
import './App.css';
import { ShoppingCart } from './components/ShoppingCart';
import { Product } from './types/ShoppingCart';

interface Item {
  id: string;
  name: string;
  price: number;
  stock: number;
}

const initialProductsArray: Item[] = [
  {
    id: "1",
    name: "Product-1",
    price: 10,
    stock: 5,
  },
  {
    id: "2",
    name: "Product-2",
    price: 20,
    stock: 10,
  },
  {
    id: "3",
    name: "Product-3",
    price: 30,
    stock: 20,
  }
];

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addProductToCart = (product: Item) => {
    const newProduct: Product = {
      ...product,
      weight: 1,
    };

    setProducts(prev => {
      return [...prev, newProduct]
    });
  };

  return (
    <>
      <header className="header">
        <button onClick={() => setIsCartOpen(true)}>Cart /{products.length}</button>
      </header>

      <main className="main">
        <ul className="products-container">
          {initialProductsArray.map(product => {
            const { id, name, price, stock } = product;

            return <li key={id} className="product-item">
              <h3>{name}</h3>
              <p>Price: {price}</p>
              <p>In stock: {stock}</p>
              <button onClick={() => addProductToCart(product)}>Add to cart</button>
            </li>
          })}
        </ul>
      </main>

      <ShoppingCart products={products} isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />
    </>

  )
}

export default App;
