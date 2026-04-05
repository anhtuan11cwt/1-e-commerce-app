import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";
import Title from "../components/Title";
import { ShopContext } from "../context/ShopContext";

const Cart = () => {
  const { products, currency, cartItems, updateQuantity } =
    useContext(ShopContext);
  const [cartData, setCartData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const tempData = [];

    if (products.length > 0) {
      for (const itemId in cartItems) {
        for (const size in cartItems[itemId]) {
          if (cartItems[itemId][size] > 0) {
            const productData = products.find(
              (product) => product._id === itemId,
            );
            if (productData) {
              tempData.push({
                _id: itemId,
                quantity: cartItems[itemId][size],
                size: size,
              });
            }
          }
        }
      }
    }

    setCartData(tempData);
  }, [cartItems, products]);

  const handleQuantityChange = (item, value) => {
    if (value === "" || value === "0") return;
    updateQuantity(item._id, item.size, Number(value));
  };

  const handleDelete = (item) => {
    updateQuantity(item._id, item.size, 0);
  };

  return (
    <div className="border-t pt-16">
      <div className="mb-8">
        <Title text1={"GIỎ"} text2={"HÀNG"} />
      </div>

      {cartData.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <img
            alt="Empty cart"
            className="w-24 h-24 opacity-30 mb-4"
            src={assets.cart_icon}
          />
          <p className="text-gray-500 text-lg mb-4">
            Giỏ hàng của bạn đang trống
          </p>
          <button
            className="bg-black text-white px-8 py-3 text-sm hover:bg-gray-800 transition-colors"
            onClick={() => navigate("/collection")}
            type="button"
          >
            TIẾP TỤC MUA SẮM
          </button>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-10">
          <div className="flex-1">
            <div className="hidden md:grid grid-cols-[2fr_1fr_1fr_1fr] text-gray-500 text-sm font-medium pb-4 border-b">
              <p className="text-left">Sản phẩm</p>
              <p className="text-center">Giá</p>
              <p className="text-center">Số lượng</p>
              <p className="text-center">Xóa</p>
            </div>

            <div className="space-y-4">
              {cartData.map((item) => {
                const productData = products.find(
                  (product) => product._id === item._id,
                );

                if (!productData) return null;

                return (
                  <div
                    className="grid md:grid-cols-[2fr_1fr_1fr_1fr] gap-4 py-4 border-b items-center"
                    key={`${item._id}-${item.size}`}
                  >
                    <div className="flex items-center gap-4">
                      <img
                        alt={productData.name}
                        className="w-16 h-16 object-cover rounded"
                        src={productData.image[0]}
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-800 line-clamp-1">
                          {productData.name}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Size: {item.size}
                        </p>
                        <p className="md:hidden text-sm font-medium text-gray-800">
                          {productData.price.toLocaleString("vi-VN")} {currency}
                        </p>
                      </div>
                    </div>

                    <p className="hidden md:block text-center text-sm text-gray-600">
                      {productData.price.toLocaleString("vi-VN")} {currency}
                    </p>

                    <div className="flex items-center justify-center gap-2">
                      <input
                        className="w-16 border border-gray-300 rounded px-2 py-1 text-center text-sm focus:outline-none focus:border-gray-500"
                        defaultValue={item.quantity}
                        min={1}
                        onChange={(e) =>
                          handleQuantityChange(item, e.target.value)
                        }
                        type="number"
                      />
                    </div>

                    <div className="flex justify-center">
                      <button
                        aria-label="Xóa sản phẩm"
                        className="p-1 cursor-pointer opacity-60 hover:opacity-100 transition-opacity"
                        onClick={() => handleDelete(item)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            handleDelete(item);
                          }
                        }}
                        type="button"
                      >
                        <img
                          alt="Xóa"
                          className="w-5 h-5"
                          src={assets.bin_icon}
                        />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              className="group flex items-center gap-2 mt-8 text-sm text-gray-600 hover:text-gray-900 transition-colors"
              onClick={() => navigate("/collection")}
              type="button"
            >
              <svg
                aria-label="Quay lại"
                className="transform group-hover:-translate-x-1 transition-transform"
                fill="none"
                height="11"
                viewBox="0 0 15 11"
                width="15"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.09 5.5H1M6.143 10 1 5.5 6.143 1"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                />
              </svg>
              Tiếp tục mua sắm
            </button>
          </div>

          <div className="w-full lg:max-w-md">
            <CartTotal />

            <button
              className="w-full bg-black text-white py-3 mt-6 text-sm font-medium hover:bg-gray-800 transition-colors"
              onClick={() => navigate("/place-order")}
              type="button"
            >
              TIẾN HÀNH THANH TOÁN
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
