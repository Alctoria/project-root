import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <img src={product.images[0]} alt={product.title} />
      <h3>{product.title}</h3>
      <p>${product.price.toFixed(2)}</p>
      <p>{product.description.substring(0, 100)}...</p>
      <p>Seller: {product.seller.name}</p>
    </div>
  );
};

export default ProductCard;