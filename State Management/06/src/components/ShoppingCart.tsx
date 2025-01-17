import React, { useEffect, useState } from 'react';
import { Product, ShoppingCartProps } from '../types/ShoppingCart';
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";

export const ShoppingCart: React.FC<ShoppingCartProps> = ({
  products,
  taxRate,
  shippingRules,
  discounts,
  minimumOrderValue,
  onCheckout,
  isCartOpen,
  setIsCartOpen,
}) => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);

  useEffect(() => {
    setAllProducts(products);
  }, [products]);

  const removeAllItemsFromCart = () => {
    setAllProducts([]);
  };

  const placeAnOrder = () => {
    console.log("place an order");
    // onCheckout();
  };

  const removeProductFromCart = (id: string) => {
    setAllProducts(prevState => {
      return [...prevState.filter(prod => prod.id !== id)]
    })
  };

  return (
    <>
      <aside className={isCartOpen? "fixed-position-cart": "none-position-cart"}>
        <div className="cart-header">
          <h2>Shopping Cart/ {allProducts.length} items</h2>
          <button className="close-cart-btn" onClick={() => setIsCartOpen(false)}>
            <IoMdClose className="close-cart-icon"/>
          </button>
        </div>

        <div className="cart-main">
          <ul className="data-cart">
            {allProducts.map(product => {
              const { id, name, price, weight, stock } = product;

              return <li key={id} className="data-cart-item" >
                <h3>{name}</h3>
                <p>Total price: {(price * weight)}</p>
                <div className="quantity-settings">
                  <button className='quantity-settings-btn' disabled={weight <= 1}>
                    <CiCircleMinus className="plus-minus" />
                  </button>
                  <p>{weight}</p>
                  <button className='quantity-settings-btn' disabled={stock <= 0}>
                    <CiCirclePlus className="plus-minus" />
                  </button>
                </div>
                <button className="delete-item-btn">
                  <RiDeleteBin6Line className="delete-item-btn-icon" onClick={() => removeProductFromCart(id)} />
                </button>
              </li>
            })}
          </ul>

          <div className="purchase-amount-preview">
            <h3>Purchase amount</h3>
            <dl>
              <div>
                <dt><p>Subtotal</p></dt>
                <p>{999} $</p>
              </div>

              <div>
                <dt><p>Discount amount</p></dt>
                <p> - {999} $</p>
              </div>
            </dl>

            <h3>Cart total price . . . {1000} $</h3>
          </div>

          <button onClick={placeAnOrder} disabled={allProducts.length === 0}>Place an order</button>
          <button disabled={allProducts.length === 0} onClick={removeAllItemsFromCart}>Clear cart</button>
        </div>
      </aside>
    </>
  );
};

// TODO: Implement the component
// 1. Initialize cart state
// 2. Create handlers for:
//    - Adding items
//    - Updating quantity
//    - Removing items
//    - Applying discount
// 3. Use useCartCalculations for derived state
// 4. Implement UI for:
//    - Product list
//    - Cart items
//    - Totals
//    - Discount form
// 5. Add error handling and validation
