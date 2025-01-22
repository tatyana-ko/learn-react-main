import React, { useState } from 'react';
import { Discount, ShoppingCartProps } from '../types/ShoppingCart';
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useSelector, useDispatch } from 'react-redux';
import { removeProduct, increaseQuantity, decreaseQuantity, removeAllProducts } from '../redux/cartSlice';
import { RootState } from '../app/store';
import { useCartCalculations } from '../hooks/useCartCalculations';

export const ShoppingCart: React.FC<ShoppingCartProps> = ({
  taxRate,
  shippingRules,
  discounts,
  minimumOrderValue,
  isCartOpen,
  setIsCartOpen,
  totalCountOfProducts,
}) => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const [discount, setDiscount] = useState<Discount>({ type: "fixed", value: 0, code: "initial" });
  const [errors, setErrors] = useState<{ invalidCode?: string }>({});
  const { totals, isValid } = useCartCalculations(cartItems, taxRate, shippingRules, discount);
  const freeShipping = 20 - totalCountOfProducts;

  const placeAnOrder = () => {
    console.log("place an order");
    // onCheckout();
  };

  const removeAllProductsFromCart = () => {
    //popup для подтверждения очистки корзины
     dispatch(removeAllProducts());   
  };

  const calculateDiscount: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    let discountValue = (form.elements.namedItem('discount') as HTMLInputElement).value;

    const discountForApplication = discounts.find(d => d.code === discountValue);

    if (discountForApplication) {
      setDiscount(discountForApplication);
      setErrors({});
    } else {
      (form.elements.namedItem('discount') as HTMLInputElement).value = "";
      setErrors({ ...errors, invalidCode: "invalid code" });
    };
  };

  const cancelDiscount = () => {
    setDiscount({ type: "fixed", value: 0, code: "initial" });
  };

  return (
    <>
      <aside className={isCartOpen ? "fixed-position-cart" : "none-position-cart"}>
        <div className="cart-header">
          <div>
            <h2>Shopping Cart/ {totalCountOfProducts} items</h2>
            <p>Min quantity of products: {minimumOrderValue}</p>
          </div>
          <button className="close-cart-btn" onClick={() => setIsCartOpen(false)}>
            <IoMdClose className="close-cart-icon" />
          </button>
        </div>

        {totalCountOfProducts === 0 ? <div>
          <h3>The shopping cart is empty</h3>
          <button onClick={() => setIsCartOpen(false)}>Order products</button>
        </div> : <div className="cart-main">

          <ul className="data-cart">
            {cartItems.map(product => {
              const { id, name, price, stock, quantity } = product;

              return <li key={id} className="data-cart-item" >
                <h3>{name}</h3>
                <p>Total price: {(price * quantity)}</p>
                <div className="quantity-settings">
                  <button className='quantity-settings-btn' disabled={quantity <= 1} onClick={() => dispatch(decreaseQuantity(id))}>
                    <CiCircleMinus className="plus-minus" />
                  </button>
                  <p>{quantity}</p>
                  <button className='quantity-settings-btn' disabled={stock <= 0} onClick={() => dispatch(increaseQuantity(id))}>
                    <CiCirclePlus className="plus-minus" />
                  </button>
                </div>
                <button className="delete-item-btn" onClick={() => dispatch(removeProduct(id))}>
                  <RiDeleteBin6Line className="delete-item-btn-icon" />
                </button>
              </li>
            })}
          </ul>

          {freeShipping > 0 ? <p>Number of products before free shipping: {freeShipping}</p> : ""}

          <div className="purchase-amount-preview">
            {discount.code === "initial" ?
              <form className="discount-form" onSubmit={e => calculateDiscount(e)}>
                <label className="discount-group">
                  <input type="text" id="discount" placeholder="enter discount code" className="discount" />
                  {errors.invalidCode && <span className="error-message">{errors.invalidCode}</span>}
                </label>
                <button>Apply</button>
              </form> : <button onClick={cancelDiscount}>Cancel discount</button>}

            <h3>Purchase amount</h3>
            <dl>
              <div>
                <dt><p>Subtotal</p></dt>
                <p>{totals.subtotal} $</p>
              </div>

              <div>
                <dt><p>Discount amount</p></dt>
                <p> - {totals.discount} $</p>
              </div>

              <div>
                <dt><p>Shipping cost</p></dt>
                <p>{totals.shipping} $</p>
              </div>

              <div>
                <dt><p>Tax</p></dt>
                <p>{totals.tax} $</p>
              </div>
            </dl>

            <h3 className="total-price">Cart total price: {totals.total} $</h3>
          </div>

          <button disabled={cartItems.length === 0 || isValid || totalCountOfProducts < minimumOrderValue} onClick={placeAnOrder}>Place an order</button>
          <button disabled={cartItems.length === 0} onClick={removeAllProductsFromCart}>Clear cart</button>
        </div>}
      </aside>
    </>
  );
};