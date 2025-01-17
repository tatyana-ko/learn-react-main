import './App.css';
import { ShoppingCart } from './components/ShoppingCart';
import { Product } from './types/ShoppingCart';

const initialCart = [
  {
    id: "1",
    name: "product-1",
    price: 10,
    weight: 1,
    stock: 5,
  },
  {
    id: "2",
    name: "product-2",
    price: 20,
    weight: 2,
    stock: 10,
  }
];

function App() {
  return (
    <>
      <ShoppingCart products={initialCart} />
    </>
  )
}

export default App;
