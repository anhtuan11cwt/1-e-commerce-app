import axios from "axios";
import { useCallback, useContext, useEffect, useState } from "react";
import Title from "../components/Title";
import { ShopContext } from "../context/ShopContext";

const Orders = () => {
  const { backendURL, token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);

  const loadOrderData = useCallback(async () => {
    try {
      if (!token) return;

      const response = await axios.get(`${backendURL}/api/order/userorders`, {
        headers: { token },
      });

      if (response.data.success) {
        const allOrders = [];

        response.data.orders.forEach((order) => {
          order.items.forEach((item) => {
            const newItem = {
              ...item,
              date: order.date,
              payment: order.payment,
              paymentMethod: order.paymentMethod,
              status: order.status,
            };
            allOrders.push(newItem);
          });
        });

        setOrderData(allOrders.reverse());
      }
    } catch (error) {
      console.log(error);
    }
  }, [backendURL, token]);

  useEffect(() => {
    if (token) {
      loadOrderData();
    }
  }, [token, loadOrderData]);

  const getStatusColor = (status) => {
    switch (status) {
      case "Đã giao thành công":
        return "bg-green-500";
      case "Pending":
      case "Đã đặt hàng":
        return "bg-yellow-500";
      case "Cancelled":
        return "bg-red-500";
      case "Đang đóng gói":
        return "bg-yellow-500";
      case "Đang giao hàng":
        return "bg-blue-500";
      case "Đã giao hàng":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "Đã giao thành công":
        return "Đã giao thành công";
      case "Pending":
        return "Chờ xử lý";
      case "Đã đặt hàng":
        return "Đã đặt hàng";
      case "Cancelled":
        return "Đã hủy";
      case "Đang đóng gói":
        return "Đang đóng gói";
      case "Đang giao hàng":
        return "Đang giao hàng";
      case "Đã giao hàng":
        return "Đã giao hàng";
      default:
        return status;
    }
  };

  return (
    <div className="border-t pt-16">
      <div className="text-2xl mb-4">
        <Title text1={"ĐƠN HÀNG"} text2={"CỦA TÔI"} />
      </div>

      {orderData.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500 mb-4">Bạn chưa có đơn hàng nào.</p>
        </div>
      ) : (
        <div>
          {orderData.map((item) => (
            <div
              className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
              key={`${item._id}-${item.size}-${item.date}`}
            >
              <div className="flex items-start gap-6 text-sm">
                <img
                  alt={item.name}
                  className="w-16 sm:w-20"
                  src={item.image[0]}
                />

                <div>
                  <p className="sm:text-base font-medium">{item.name}</p>

                  <div className="flex items-center gap-3 mt-1 text-base text-gray-700">
                    <p>
                      {(item.price * item.quantity).toLocaleString("vi-VN")}{" "}
                      {currency}
                    </p>
                    <p>SL: {item.quantity}</p>
                    <p>Size: {item.size}</p>
                  </div>

                  <p className="mt-1">
                    Ngày:{" "}
                    <span className="text-gray-400">
                      {new Date(item.date).toLocaleDateString("vi-VN")}
                    </span>
                  </p>

                  <p className="mt-1">
                    Thanh toán:{" "}
                    <span className="text-gray-400">
                      {item.paymentMethod === "COD"
                        ? "Tiền mặt"
                        : item.paymentMethod}
                      {item.payment ? " - Đã thanh toán" : " - Chờ thanh toán"}
                    </span>
                  </p>
                </div>
              </div>

              <div className="md:w-1/2 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <p
                    className={`min-w-2 h-2 rounded-full ${getStatusColor(
                      item.status,
                    )}`}
                  />
                  <p className="text-sm md:text-base font-medium">
                    {getStatusText(item.status)}
                  </p>
                </div>

                <button
                  className="border px-4 py-2 text-sm font-medium rounded-sm hover:bg-gray-50 transition-colors"
                  onClick={loadOrderData}
                  type="button"
                >
                  Theo dõi đơn
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
