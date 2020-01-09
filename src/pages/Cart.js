import React from "react";
import { CartContext } from "../context/cart";
import { UserContext } from "../context/user";

import EmptyCart from "../components/Cart/EmptyCart";
import CartItem from "../components/Cart/CartItem";
import { Link } from "react-router-dom";
//import UserContext from '../context/user'

export default function Cart() {
  const { cart, total } = React.useContext(CartContext);
  const { user } = React.useContext(UserContext);
  //console.log({ cart, total });
  if (cart.length === 0) {
    return <EmptyCart />;
  }
  return (
    <section className="cart-items section">
      <h2>your cart</h2>
      {cart.map(item => {
        return <CartItem key={item.id} {...item} />;
      })}
      <h2>Total : ${total}</h2>
      {user.token ? (
        <Link className="btn btn-primary btn-block" to="/checkout">
          checkout
        </Link>
      ) : (
        <Link className="btn btn-primary btn-block" to="/login">
          login
        </Link>
      )}
    </section>
  );
}
