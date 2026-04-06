import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const Verify = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { backendURL, setCartItems, token } = useContext(ShopContext);
  const [status, setStatus] = useState("Đang xác minh thanh toán...");

  useEffect(() => {
    const verifyPayment = async () => {
      const success = searchParams.get("success");
      const orderId = searchParams.get("orderId");

      console.log("Verify - success:", success, "orderId:", orderId);
      console.log("Verify - token:", token);

      if (!orderId) {
        setStatus("Đơn hàng không hợp lệ");
        setTimeout(() => navigate("/cart"), 2000);
        return;
      }

      try {
        const response = await axios.post(
          `${backendURL}/api/order/verifyStripe`,
          { orderId, success },
          { headers: { token } },
        );

        console.log("Verify response:", response.data);

        if (response.data.success) {
          setCartItems({});
          setStatus("Thanh toán thành công!");
          setTimeout(() => navigate("/orders"), 1500);
        } else {
          setStatus("Thanh toán thất bại");
          setTimeout(() => navigate("/cart"), 2000);
        }
      } catch (error) {
        console.log("Verify error:", error);
        setStatus("Lỗi xác minh");
        setTimeout(() => navigate("/cart"), 2000);
      }
    };

    verifyPayment();
  }, [searchParams, backendURL, token, navigate, setCartItems]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <div className="w-16 h-16 border-4 border-gray-300 border-t-black rounded-full animate-spin" />
      <p className="text-gray-600 text-lg">{status}</p>
    </div>
  );
};

export default Verify;
