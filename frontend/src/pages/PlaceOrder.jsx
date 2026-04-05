import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";
import Title from "../components/Title";
import { ShopContext } from "../context/ShopContext";

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  const [formData, setFormData] = useState({
    city: "",
    country: "",
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    state: "",
    street: "",
    zipCode: "",
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const {
    cartItems,
    products,
    getCartAmount,
    deliveryFee,
    setCartItems,
    backendURL,
    token,
  } = useContext(ShopContext);

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    const orderItems = [];
    for (const itemId in cartItems) {
      for (const size in cartItems[itemId]) {
        if (cartItems[itemId][size] > 0) {
          const product = products.find((p) => p._id === itemId);
          if (product) {
            orderItems.push({
              ...product,
              quantity: cartItems[itemId][size],
              size,
            });
          }
        }
      }
    }

    if (orderItems.length === 0) {
      toast.error("Giỏ hàng trống!");
      return;
    }

    setLoading(true);

    try {
      const orderData = {
        address: formData,
        amount: getCartAmount() + deliveryFee,
        items: orderItems,
      };

      switch (method) {
        case "cod":
          if (token) {
            const response = await axios.post(
              `${backendURL}/api/order/place`,
              orderData,
              { headers: { token } },
            );
            if (response.data.success) {
              setCartItems({});
              localStorage.setItem("cartItems", JSON.stringify({}));
              navigate("/orders");
              toast.success("Đặt hàng thành công!");
            } else {
              toast.error(response.data.message || "Đặt hàng thất bại");
            }
            setLoading(false);
            return;
          }
          console.log("COD Order (demo):", orderData);
          setCartItems({});
          localStorage.setItem("cartItems", JSON.stringify({}));
          navigate("/orders");
          toast.success("Đặt hàng thành công!");
          setLoading(false);
          return;

        case "stripe":
          if (token) {
            const response = await axios.post(
              `${backendURL}/api/order/stripe`,
              orderData,
              { headers: { token } },
            );
            if (response.data.success && response.data.session_url) {
              window.location.replace(response.data.session_url);
              return;
            }
          } else {
            const response = await axios.post(
              `${backendURL}/api/order/stripe`,
              orderData,
            );
            if (response.data.success && response.data.session_url) {
              window.location.replace(response.data.session_url);
              return;
            }
          }
          break;

        default:
          break;
      }
    } catch (error) {
      console.log(error);
      toast.error("Có lỗi xảy ra. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="flex flex-col sm:flex-row justify-between gap-8 pt-5 sm:pt-14 min-h-[80vh]"
      onSubmit={onSubmitHandler}
    >
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"THÔNG TIN"} text2={"GIAO HÀNG"} />
        </div>

        <div className="flex gap-3">
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            name="firstName"
            onChange={onChangeHandler}
            placeholder="Họ"
            required
            type="text"
            value={formData.firstName}
          />
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            name="lastName"
            onChange={onChangeHandler}
            placeholder="Tên"
            required
            type="text"
            value={formData.lastName}
          />
        </div>

        <input
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          name="email"
          onChange={onChangeHandler}
          placeholder="Email"
          required
          type="email"
          value={formData.email}
        />

        <input
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          name="street"
          onChange={onChangeHandler}
          placeholder="Địa chỉ"
          required
          type="text"
          value={formData.street}
        />

        <div className="flex gap-3">
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            name="city"
            onChange={onChangeHandler}
            placeholder="Thành phố"
            required
            type="text"
            value={formData.city}
          />
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            name="state"
            onChange={onChangeHandler}
            placeholder="Quận/Huyện"
            required
            type="text"
            value={formData.state}
          />
        </div>

        <div className="flex gap-3">
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            name="zipCode"
            onChange={onChangeHandler}
            placeholder="Mã bưu điện"
            required
            type="text"
            value={formData.zipCode}
          />
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            name="country"
            onChange={onChangeHandler}
            placeholder="Quốc gia"
            required
            type="text"
            value={formData.country}
          />
        </div>

        <input
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          name="phone"
          onChange={onChangeHandler}
          placeholder="Số điện thoại"
          required
          type="tel"
          value={formData.phone}
        />
      </div>

      <div className="mt-8">
        <div className="mt-8 min-w-[300px] sm:min-w-[400px]">
          <CartTotal />
        </div>

        <div className="mt-8">
          <Title text1={"PHƯƠNG THỨC"} text2={"THANH TOÁN"} />
        </div>

        <div className="flex flex-col gap-3 mt-3">
          <button
            className="flex items-center gap-3 cursor-pointer border border-gray-200 rounded p-3 hover:border-gray-400 transition-colors text-left"
            onClick={() => setMethod("stripe")}
            type="button"
          >
            <div
              className={`min-w-4 h-4 border rounded-full ${
                method === "stripe"
                  ? "bg-green-500 border-green-500"
                  : "border-gray-400"
              }`}
            />
            <img alt="Stripe" className="h-5" src={assets.stripe_logo} />
          </button>

          <button
            className="flex items-center gap-3 cursor-pointer border border-gray-200 rounded p-3 hover:border-gray-400 transition-colors text-left"
            onClick={() => setMethod("cod")}
            type="button"
          >
            <div
              className={`min-w-4 h-4 border rounded-full ${
                method === "cod"
                  ? "bg-green-500 border-green-500"
                  : "border-gray-400"
              }`}
            />
            <p className="text-gray-700 font-medium">
              THANH TOÁN KHI NHẬN HÀNG
            </p>
          </button>
        </div>

        <button
          className="mt-8 bg-black text-white px-8 py-3 text-sm font-medium rounded hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
          disabled={loading}
          type="submit"
        >
          {loading ? "ĐANG XỬ LÝ..." : "ĐẶT HÀNG NGAY"}
        </button>
      </div>
    </form>
  );
};

export default PlaceOrder;
