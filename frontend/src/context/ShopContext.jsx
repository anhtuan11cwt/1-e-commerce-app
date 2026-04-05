/* eslint-disable react-refresh/only-export-components */
import axios from "axios";
import { createContext, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { products as localProducts } from "../assets/assets";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "₫";
  const deliveryFee = 30000;

  const backendURL =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : {};
  });
  const [products, setProducts] = useState([]);

  const [token, setToken] = useState(() => localStorage.getItem("token") || "");

  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Vui lòng chọn kích thước");
      return;
    }

    if (!token) {
      toast.error("Vui lòng đăng nhập để thêm vào giỏ hàng");
      navigate("/login");
      return;
    }

    const cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    setCartItems(cartData);

    toast.success("Thêm vào giỏ hàng thành công");

    if (token) {
      try {
        await axios.post(
          `${backendURL}/api/cart/add`,
          { itemId, size },
          { headers: { token } },
        );
      } catch (error) {
        console.log(error);
      }
    }
  };

  const updateQuantity = async (itemId, size, quantity) => {
    const cartData = structuredClone(cartItems);

    cartData[itemId][size] = quantity;

    if (quantity === 0) {
      delete cartData[itemId][size];
    }

    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(
          `${backendURL}/api/cart/update`,
          { itemId, quantity, size },
          { headers: { token } },
        );
      } catch (error) {
        console.log(error);
      }
    }
  };

  const getCartCount = () => {
    let totalCount = 0;

    for (const items in cartItems) {
      for (const size in cartItems[items]) {
        totalCount += cartItems[items][size];
      }
    }

    return totalCount;
  };

  const getCartAmount = () => {
    let totalAmount = 0;

    for (const itemId in cartItems) {
      const itemInfo = products.find((p) => p._id === itemId);

      for (const size in cartItems[itemId]) {
        if (itemInfo) {
          totalAmount += itemInfo.price * cartItems[itemId][size];
        }
      }
    }

    return totalAmount;
  };

  const getProductsData = useCallback(async () => {
    try {
      const response = await axios.get(`${backendURL}/api/product/list`);
      if (response.data.success) {
        setProducts(response.data.products);
      }
    } catch {
      console.log("Using local products (backend unavailable)");
      setProducts(localProducts);
    }
  }, []);

  const getUserCart = useCallback(async (userToken) => {
    try {
      const response = await axios.post(
        `${backendURL}/api/cart/get`,
        {},
        { headers: { token: userToken } },
      );

      if (response.data.success) {
        setCartItems(response.data.cartData);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  // Fetch products on mount
  useEffect(() => {
    getProductsData();
  }, [getProductsData]);

  // Fetch user cart when token changes
  useEffect(() => {
    if (token) {
      getUserCart(token);
    }
  }, [token, getUserCart]);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const value = {
    addToCart,
    backendURL,
    cartItems,
    currency,
    deliveryFee,
    getCartAmount,
    getCartCount,
    getProductsData,
    getUserCart,
    navigate,
    products,
    search,
    setCartItems,
    setSearch,
    setShowSearch,
    setToken,
    showSearch,
    token,
    updateQuantity,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
