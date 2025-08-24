import axios from "axios";
import { createContext, useEffect, useState } from "react";

// ✅ Provide safe defaults so useContext never returns null
export const StoreContext = createContext({
  cartItems: {},
  food_list: [],
  setCartItems: () => {},
  addToCart: () => {},
  removeFromCart: () => {},
  getTotalCartAmount: () => 0,
  clearCart: () => {},
  url: "",
  token: "",
  setToken: () => {}
});

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const url = "https://my-food-backend-go23.onrender.com";
  const [token, setToken] = useState("");
  const [food_list, setFoodList] = useState([]);

  // ✅ Add item to cart
  const addToCart = async (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1
    }));

    if (token) {
      try {
        await axios.post(
          url + "/api/cart/add",
          { itemId },
          { headers: { token } }
        );
      } catch (error) {
        console.error("Failed to add to cart:", error);
      }
    }
  };

  // ✅ Remove item from cart (never negative)
  const removeFromCart = async (itemId) => {
    setCartItems((prev) => {
      const newQty = Math.max((prev[itemId] || 0) - 1, 0);
      return { ...prev, [itemId]: newQty };
    });

    if (token) {
      try {
        await axios.post(
          url + "/api/cart/remove",
          { itemId },
          { headers: { token } }
        );
      } catch (error) {
        console.error("Failed to remove from cart:", error);
      }
    }
  };

  // ✅ Calculate cart total
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const itemInfo = food_list.find((product) => product._id === item);
        if (itemInfo) {
          totalAmount += itemInfo.price * cartItems[item];
        }
      }
    }
    return totalAmount;
  };

  // ✅ Fetch food list
  const fetchFoodList = async () => {
    try {
      const response = await axios.get(url + "/api/food/list");
      setFoodList(response.data.data || []);
    } catch (error) {
      console.error("Failed to fetch food list:", error);
    }
  };

  // ✅ Load cart data if token exists
  const loadCartData = async (token) => {
    try {
      const response = await axios.get(
        url + "/api/cart/get",
        {},
        { headers: { token } }
      );
      setCartItems(response.data.cartData || {});
    } catch (error) {
      console.error("Failed to load cart data:", error);
    }
  };

  // ✅ Clear cart locally + server
  const clearCart = async () => {
    setCartItems({});
    if (token) {
      try {
        await axios.post(url + "/api/cart/clear", {}, { headers: { token } });
      } catch (error) {
        console.error("Failed to clear cart from server:", error);
      }
    }
  };

  // ✅ Load data on mount
  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      const savedToken = localStorage.getItem("token");
      if (savedToken) {
        setToken(savedToken);
        await loadCartData(savedToken);
      }
    }
    loadData();
  }, []);

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    clearCart,
    url,
    token,
    setToken
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
