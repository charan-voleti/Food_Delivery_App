// import React, { useContext, useEffect, useState } from "react";
// import "./PlaceOrder.css";
// import { StoreContext } from "../../context/StoreContext";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";


// const PlaceOrder = () => {
//   const { getTotalCartAmount, token, food_list, cartItems, url } =
//     useContext(StoreContext);

//   const [data, setData] = new useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     street: "",
//     city: "",
//     state: "",
//     zipcode: "",
//     country: "",
//     phone: "",
//   });

//   const onChangeHandler = (event) => {
//     const name = event.target.name;
//     const value = event.target.value;
//     setData((data) => ({ ...data, [name]: value }));
//   };

//   const placeOrder = async (event) => {
//     event.preventDefault();
//     let orderItems = [];
//     food_list.map((item) => {
//       if (cartItems[item._id] > 0) {
//         let itemInfo = item;
//         itemInfo["quantity"] = cartItems[item._id];
//         orderItems.push(itemInfo);
//       }
//     });

//     let orderData = {
//       address: data,
//       items: orderItems,
//       amount: getTotalCartAmount() + 59,
//     };

//      let response = await axios.post(url+"/api/order/place",orderData,{headers:{token}});
    
//       if (response.data.success){
//         const {session_url} = response.data;
//         window.location.replace(session_url);
//       }
//       else{
//         alert("Error" + response.data.message);
//       }

//     }

//   //   try {
//   //     let response = await axios.post(url + "/api/order/place", orderData, {
//   //       headers: { token },
//   //     });
//   //     console.log(response.data);

//   //     if (response.data.success) {
//   //       const { session_url } = response.data;
//   //       window.location.replace(session_url); // This should redirect to Stripe checkout
//   //     } else {
//   //       alert("Error: " + response.data.message); // Improved error message
//   //     }
//   //   } catch (error) {
//   //     console.error("Error placing order:", error);
//   //     alert("An unexpected error occurred. Please try again.");
//   //   }
//   // };

//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!token) {
//       navigate("/cart");
//     } 
//     else if (getTotalCartAmount() === 0) {
//       navigate("/cart");
//     }
//   }, [token])

//   return (
//     <form onSubmit={placeOrder} className="place-order">
//       <div className="place-order-left">
//         <p className="title">Delivery Information</p>
//         <div className="multi-fields">
//           <input
//             required
//             name="firstName"
//             onChange={onChangeHandler}
//             value={data.firstName}
//             type="text"
//             placeholder="First name"
//           />
//           <input
//             required
//             name="lastName"
//             onChange={onChangeHandler}
//             value={data.lastName}
//             type="text"
//             placeholder="Last name"
//           />
//         </div>
//         <input
//           required
//           name="email"
//           onChange={onChangeHandler}
//           value={data.email}
//           type="email"
//           placeholder="Email Address"
//         />
//         <input
//           required
//           name="street"
//           onChange={onChangeHandler}
//           value={data.street}
//           type="text"
//           placeholder="Street"
//         />
//         <div className="multi-fields">
//           <input
//             required
//             name="city"
//             onChange={onChangeHandler}
//             value={data.city}
//             type="text"
//             placeholder="City"
//           />
//           <input
//             required
//             name="state"
//             onChange={onChangeHandler}
//             value={data.state}
//             type="text"
//             placeholder="State"
//           />
//         </div>
//         <div className="multi-fields">
//           <input
//             required
//             name="zipcode"
//             onChange={onChangeHandler}
//             value={data.zipcode}
//             type="text"
//             placeholder="Zip Code"
//           />
//           <input
//             required
//             name="country"
//             onChange={onChangeHandler}
//             value={data.country}
//             type="text"
//             placeholder="Country"
//           />
//         </div>
//         <input
//           required
//           name="phone"
//           onChange={onChangeHandler}
//           value={data.phone}
//           type="text"
//           placeholder="Phone Number"
//         />
//       </div>
//       <div className="place-order-right">
//         <div className="cart-total">
//           <h2>Cart Totals</h2>
//           <div>
//             <div className="cart-total-details">
//               <p>SubTotal</p>
//               <p>₹{getTotalCartAmount()}</p>
//             </div>
//             <hr />
//             <div className="cart-total-details">
//               <p>Delivery Fee</p>
//               <p>₹{getTotalCartAmount() === 0 ? 0 : 59}</p>
//             </div>
//             <hr />
//             <div className="cart-total-details">
//               <b>Total</b>
//               <b>
//                 ₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 59}
//               </b>
//             </div>
//           </div>
//           <button type="submit">Proceed To Payment</button>
//         </div>
//       </div>
//     </form>
//   );
// };

// export default PlaceOrder;




// import React, { useContext, useEffect, useState } from "react";
// import "./PlaceOrder.css";
// import { StoreContext } from "../../context/StoreContext";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const PlaceOrder = () => {
//   const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);

//   const [data, setData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     street: "",
//     city: "",
//     state: "",
//     zipcode: "",
//     country: "",
//     phone: "",
//   });

//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!token || getTotalCartAmount() === 0) {
//       navigate("/cart");
//     }
//   }, [token]);

//   const onChangeHandler = (event) => {
//     const name = event.target.name;
//     const value = event.target.value;
//     setData((data) => ({ ...data, [name]: value }));
//   };

//   // Stripe Online Payment
//   const placeOrder = async (event) => {
//     event.preventDefault();

//     let orderItems = [];
//     food_list.forEach((item) => {
//       if (cartItems[item._id] > 0) {
//         let itemInfo = { ...item, quantity: cartItems[item._id] };
//         orderItems.push(itemInfo);
//       }
//     });

//     const orderData = {
//       address: data,
//       items: orderItems,
//       amount: getTotalCartAmount() + 59,
//       paymentMethod: "stripe"
//     };

//     try {
//       let response = await axios.post(url + "/api/order/place", orderData, {
//         headers: { token },
//       });

//       if (response.data.success) {
//         const { session_url } = response.data;
//         window.location.replace(session_url);
//       } else {
//         alert("Error: " + response.data.message);
//       }
//     } catch (error) {
//       console.error("Stripe order error:", error);
//       alert("Order failed. Please try again.");
//     }
//   };

//   // Cash On Delivery
// const placeCODOrder = async () => {
//   // Validate fields manually
//   for (let key in data) {
//     if (!data[key]) {
//       alert(`Please fill in the "${key}" field.`);
//       return;
//     }
//   }

//   let orderItems = [];
//   food_list.forEach((item) => {
//     if (cartItems[item._id] > 0) {
//       let itemInfo = { ...item, quantity: cartItems[item._id] };
//       orderItems.push(itemInfo);
//     }
//   });

//   const orderData = {
//     address: data,
//     items: orderItems,
//     amount: getTotalCartAmount() + 59,
//     paymentMethod: "cod"
//   };

//   try {
//     let response = await axios.post(url + "/api/order/place", orderData, {
//       headers: { token },
//     });

//     if (response.data.success) {
//       navigate("/myorders");
//     } else {
//       alert("Error: " + response.data.message);
//     }
//   } catch (err) {
//     alert("COD Order Failed");
//     console.log(err);
//   }
// };


//   return (
//     <form onSubmit={placeOrder} className="place-order">
//       <div className="place-order-left">
//         <p className="title">Delivery Information</p>
//         <div className="multi-fields">
//           <input
//             required
//             name="firstName"
//             onChange={onChangeHandler}
//             value={data.firstName}
//             type="text"
//             placeholder="First name"
//           />
//           <input
//             required
//             name="lastName"
//             onChange={onChangeHandler}
//             value={data.lastName}
//             type="text"
//             placeholder="Last name"
//           />
//         </div>
//         <input
//           required
//           name="email"
//           onChange={onChangeHandler}
//           value={data.email}
//           type="email"
//           placeholder="Email Address"
//         />
//         <input
//           required
//           name="street"
//           onChange={onChangeHandler}
//           value={data.street}
//           type="text"
//           placeholder="Street"
//         />
//         <div className="multi-fields">
//           <input
//             required
//             name="city"
//             onChange={onChangeHandler}
//             value={data.city}
//             type="text"
//             placeholder="City"
//           />
//           <input
//             required
//             name="state"
//             onChange={onChangeHandler}
//             value={data.state}
//             type="text"
//             placeholder="State"
//           />
//         </div>
//         <div className="multi-fields">
//           <input
//             required
//             name="zipcode"
//             onChange={onChangeHandler}
//             value={data.zipcode}
//             type="text"
//             placeholder="Zip Code"
//           />
//           <input
//             required
//             name="country"
//             onChange={onChangeHandler}
//             value={data.country}
//             type="text"
//             placeholder="Country"
//           />
//         </div>
//         <input
//           required
//           name="phone"
//           onChange={onChangeHandler}
//           value={data.phone}
//           type="text"
//           placeholder="Phone Number"
//         />
//       </div>
//       <div className="place-order-right">
//         <div className="cart-total">
//           <h2>Cart Totals</h2>
//           <div>
//             <div className="cart-total-details">
//               <p>SubTotal</p>
//               <p>₹{getTotalCartAmount()}</p>
//             </div>
//             <hr />
//             <div className="cart-total-details">
//               <p>Delivery Fee</p>
//               <p>₹{getTotalCartAmount() === 0 ? 0 : 59}</p>
//             </div>
//             <hr />
//             <div className="cart-total-details">
//               <b>Total</b>
//               <b>₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 59}</b>
//             </div>
//           </div>

//           {/* Buttons */}
//           <div className="button-group">
//             <button type="submit">Proceed To Online Payment</button>
//             <button type="button" onClick={placeCODOrder}>Cash On Delivery</button>
//           </div>
//         </div>
//       </div>
//     </form>
//   );
// };

// export default PlaceOrder;




import React, { useContext, useEffect, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url, clearCart } = useContext(StoreContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (!token || getTotalCartAmount() === 0) {
      navigate("/cart");
    }
  }, [token]);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const buildOrderItems = () => {
    return food_list
      .filter((item) => cartItems[item._id] > 0)
      .map((item) => ({
        ...item,
        quantity: cartItems[item._id],
      }));
  };

  // Stripe Online Payment
  const placeOrder = async (event) => {
    event.preventDefault();
    const orderItems = buildOrderItems();
    const orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 59,
      paymentMethod: "stripe",
    };

    try {
      const response = await axios.post(url + "/api/order/place", orderData, {
        headers: { token },
      });

      if (response.data.success) {
        window.location.replace(response.data.session_url);
      } else {
        toast.error("Stripe Error: " + response.data.message);
      }
    } catch (error) {
      toast.error("Stripe Order Failed");
      console.error(error);
    }
  };

  // Cash On Delivery
  const placeCODOrder = async () => {
    // Manually validate delivery form
    for (let key in data) {
      if (!data[key]) {
        toast.warn(`Please fill in "${key}"`);
        return;
      }
    }

    const orderItems = buildOrderItems();
    const orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 59,
      paymentMethod: "cod",
    };

    try {
      const response = await axios.post(url + "/api/order/place", orderData, {
        headers: { token },
      });

      if (response.data.success) {
        await clearCart();
        toast.success("Order placed successfully with COD payment");
        setTimeout(() => navigate("/myorders"), 1500);
      } else {
        toast.error("COD Error: " + response.data.message);
      }
    } catch (err) {
      toast.error("COD Order Failed");
      console.error(err);
    }
  };

  return (
    <>
      <form onSubmit={placeOrder} className="place-order">
        <div className="place-order-left">
          <p className="title">Delivery Information</p>
          <div className="multi-fields">
            <input required name="firstName" onChange={onChangeHandler} value={data.firstName} type="text" placeholder="First name" />
            <input required name="lastName" onChange={onChangeHandler} value={data.lastName} type="text" placeholder="Last name" />
          </div>
          <input required name="email" onChange={onChangeHandler} value={data.email} type="email" placeholder="Email Address" />
          <input required name="street" onChange={onChangeHandler} value={data.street} type="text" placeholder="Street" />
          <div className="multi-fields">
            <input required name="city" onChange={onChangeHandler} value={data.city} type="text" placeholder="City" />
            <input required name="state" onChange={onChangeHandler} value={data.state} type="text" placeholder="State" />
          </div>
          <div className="multi-fields">
            <input required name="zipcode" onChange={onChangeHandler} value={data.zipcode} type="text" placeholder="Zip Code" />
            <input required name="country" onChange={onChangeHandler} value={data.country} type="text" placeholder="Country" />
          </div>
          <input required name="phone" onChange={onChangeHandler} value={data.phone} type="text" placeholder="Phone Number" />
        </div>

        <div className="place-order-right">
          <div className="cart-total">
            <h2>Cart Totals</h2>
            <div>
              <div className="cart-total-details">
                <p>SubTotal</p>
                <p>₹{getTotalCartAmount()}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <p>Delivery Fee</p>
                <p>₹{getTotalCartAmount() === 0 ? 0 : 59}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <b>Total</b>
                <b>₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 59}</b>
              </div>
            </div>

            <div className="button-group">
              <button type="submit">Proceed To Online Payment</button>
              <button type="button" onClick={placeCODOrder}>Cash On Delivery</button>
            </div>
          </div>
        </div>
      </form>
      <ToastContainer position="top-center" autoClose={2000} hideProgressBar />
    </>
  );
};

export default PlaceOrder;



