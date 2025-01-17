import React, { useState, useCallback } from 'react';
import { ShoppingCartProps, CartItem, CartState } from '../types/ShoppingCart';
import { useCartCalculations } from '../hooks/useCartCalculations';
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";

export const ShoppingCart: React.FC<ShoppingCartProps> = ({
  products,
  taxRate,
  shippingRules,
  discounts,
  minimumOrderValue,
  onCheckout,
}) => {
  const [allProducts, setAllProducts] = useState(products);

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
      <header className="header">
        <h2>Shopping Cart/ {allProducts.length} items</h2>
        <button onClick={removeAllItemsFromCart}>Clear cart</button>
      </header>

      <main className="main">
        <ul className="data-cart">
          {allProducts.map(product => {
            const {id, name, price, weight, stock} = product;

            return <li key={id} className="data-cart-item" >
              <h3>{name}</h3>
              <p>Price: {(price * weight)}</p>
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

        <input type="text" placeholder="Add a promo code" className="promo-code" />

        <div className="purchase-amount-preview">
          <h3>Purchase amount</h3>
          <dl>
            <dt>
              <span>Subtotal </span>
            </dt>
            <dt>
              <span>Discount amount </span>
            </dt>
          </dl>

          <h3>Total price . . .</h3>
        </div>

        <button onClick={placeAnOrder}>Place an order</button>
      </main>
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
