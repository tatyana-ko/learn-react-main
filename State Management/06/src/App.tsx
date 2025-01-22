import { useState } from 'react';
import './App.css';
import { ShoppingCart } from './components/ShoppingCart';
import { Discount, Product, ShippingRule } from './types/ShoppingCart';
import { useSelector, useDispatch } from 'react-redux';
import { addProduct } from './redux/cartSlice';
import { RootState } from './app/store';
import { calculateTotalCount } from './utils/calculateTotal';

const initialProductsArray: Product[] = [
  {
    id: "1",
    name: "Product-1",
    price: 10,
    weight: 1,
    stock: 5,
  },
  {
    id: "2",
    name: "Product-2",
    price: 20,
    weight: 1,
    stock: 10,
  },
  {
    id: "3",
    name: "Product-3",
    price: 30,
    weight: 1,
    stock: 20,
  }
];

const discount: Discount[] = [
  { type: 'percentage', value: 10, code: 'SAVE10' },
  { type: 'fixed', value: 5, code: 'MINUS5' },
];

const shippingRules: ShippingRule[] = [
  { minOrderValue: 0, cost: 5 },
  { minOrderValue: 20, cost: 0 },
];

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const totalCountOfProducts = calculateTotalCount(cartItems);

  return (
    <>
      <header className="header">
        <button onClick={() => setIsCartOpen(true)}>Cart / {totalCountOfProducts}</button>
      </header>

      <main className="main">
        <ul className="products-container">
          {initialProductsArray.map(product => {
            const { id, name, price, stock } = product;

            return <li key={id} className="product-item">
              <h3>{name}</h3>
              <p>Price: {price}</p>
              <p>In stock: {stock}</p>
              <button onClick={() => dispatch(addProduct(product))}>Add to cart</button>
            </li>
          })}
        </ul>
      </main>

      <ShoppingCart
        taxRate={0.05}
        discounts={discount}
        minimumOrderValue={10}
        shippingRules={shippingRules}
        isCartOpen={isCartOpen}
        setIsCartOpen={setIsCartOpen}
        totalCountOfProducts={totalCountOfProducts} />
    </>
  )
};

export default App;