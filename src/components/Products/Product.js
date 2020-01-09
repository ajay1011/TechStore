import React from "react";
import { Link } from "react-router-dom";

export default function Product({ product }) {
  //console.log(product);
  const { id, title, image, price } = product;

  return (
    <article className="product">
      <div className="img-container">
        <img src={image} alt={title} />
        <Link to={`products/${id}`} className="btn btn-primary product-link">
          details
        </Link>
      </div>
      <div className="product-footer">
        <p className="prouct-title">{title}</p>
        <p className="product-price">{price}</p>
      </div>
    </article>
  );
}
