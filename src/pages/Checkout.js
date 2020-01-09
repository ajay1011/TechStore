import React from "react";
import { UserContext } from "../context/user";
import { CartContext } from "../context/cart";
import { useHistory } from "react-router-dom";
import EmptyCart from "../components/Cart/EmptyCart";
// react-stripe elements
import {
  CardElement,
  StripeProvider,
  injectStripe,
  Elements
} from "react-stripe-elements";
import submitOrder from "../strapi/submitOrder";

function Checkout(props) {
  const { cart, total, clearCart } = React.useContext(CartContext);
  const { user, alert, showAlert, hideAlert } = React.useContext(UserContext);
  const history = useHistory();
  // state values
  const [name, setName] = React.useState("");
  const [error, setError] = React.useState("");

  let isEmpty = !name || alert.show;

  async function handleSubmit(e) {
    showAlert({ msg: "submitting order....please wait" });
    e.preventDefault();
    const response = await props.stripe
      .createToken()
      .catch(error => console.log(error));
    const { token } = response;
    if (token) {
      setError("");
      const { id } = token;
      let order = await submitOrder({
        name: name,
        total: total,
        item: cart,
        stripeTokenId: id,
        userToken: user.token
      });
      if (order) {
        showAlert({ msg: "Your order is complte" });
        clearCart();
        history.push("/");
        return;
      } else {
        showAlert({
          msg: "There was something wrong with your order. Please try again",
          type: "danger"
        });
      }
    } else {
      hideAlert();
      setError(response.error.message);
    }
  }

  if (cart.length < 1) {
    return <EmptyCart />;
  }

  return (
    <section className="section form">
      <h2 className="section-title">checkout</h2>
      <form className="checkout-form">
        <h3>
          order total : <span>${total}</span>
        </h3>
        {/* single input */}
        <div className="form-control">
          <label htmlFor="name">name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={e => {
              setName(e.target.value);
            }}
          />
        </div>
        {/* end of single input */}
        {/* card element */}
        <div className="stripe-input">
          <label htmlFor="card-element">Credit or Debit card</label>
          <p className="stripe-info">
            Test using this credit card : <span>4242 4242 4242 4242</span>
            <br />
            Enter any 5 digits for the zip code
            <br />
            Enter any 3 digits for the CVC
          </p>
        </div>
        {/* end of card element */}
        {/* STRIPE ELEMENTS */}
        <CardElement className="card-element"></CardElement>
        {/* stripe errors */}
        {error && <p className="form-empty">{error}</p>}
        {/* empty value */}
        {isEmpty ? (
          <p className="form-empty">Please fill out the name field</p>
        ) : (
          <button
            type="submit"
            className="btn btn-primary btn-block"
            onClick={handleSubmit}
          >
            submit
          </button>
        )}
      </form>
    </section>
  );
}
const CardForm = injectStripe(Checkout);

const stripeWrapper = () => {
  return (
    <StripeProvider apiKey="pk_test_C68JDPOTeGsh9cLoOp1vJ26N00k9V7wSKw">
      <Elements>
        <CardForm></CardForm>
      </Elements>
    </StripeProvider>
  );
};
export default stripeWrapper;
