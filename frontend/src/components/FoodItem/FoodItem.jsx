import React, { useContext } from 'react'
import './FoodItem.css'
import {assets} from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'

const FoodItem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);

  if (!id || !name || !price || !description || !image) {
    console.warn("FoodItem props missing:", { id, name, price, description, image });
    return null;
  }

  return (
    <div className="food-item">
      <div className="food-item-image-con">
        <img className="food-item-image" src={`${url}/images/${image}`} alt={name} />

        {!cartItems?.[id] ? (
          <img className="add" onClick={() => addToCart(id)} src={assets.add_icon_white} alt="Add" />
        ) : (
          <div className="food-item-counter">
            <img src={assets.remove_icon_red} alt="Remove" onClick={() => removeFromCart(id)} />
            <p>{cartItems[id]}</p>
            <img src={assets.add_icon_green} alt="Add" onClick={() => addToCart(id)} />
          </div>
        )}
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="Rating" />
        </div>
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">₹{price}</p>
      </div>
    </div>
  );
};

export default FoodItem