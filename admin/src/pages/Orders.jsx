import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

const currency = "₫";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("token");

  const fetchAllOrders = useCallback(async () => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/order/list`,
        {},
        { headers: { token } },
      );
      if (response.data.success) {
        setOrders(response.data.orders.reverse());
      }
    } catch (error) {
      console.error(error);
      toast.error("Lỗi tải đơn hàng");
    }
  }, [token]);

  const statusHandler = useCallback(
    async (event, orderId) => {
      try {
        const response = await axios.post(
          `${backendUrl}/api/order/status`,
          { orderId, status: event.target.value },
          { headers: { token } },
        );
        if (response.data.success) {
          toast.success("Cập nhật trạng thái thành công");
          fetchAllOrders();
        }
      } catch (error) {
        console.error(error);
        toast.error("Cập nhật thất bại");
      }
    },
    [token, fetchAllOrders],
  );

  useEffect(() => {
    const loadData = async () => {
      await fetchAllOrders();
    };
    loadData();
  }, [fetchAllOrders]);

  return (
    <div className="p-8">
      <h2 className="mb-4 font-bold text-xl">Danh Sách Đơn Hàng</h2>
      {orders.length === 0 ? (
        <p className="text-gray-500">Không có đơn hàng nào.</p>
      ) : (
        <div className="w-full overflow-x-auto">
          <div className="min-w-200">
            {orders.map((order) => (
              <div
                className="flex flex-col md:items-center gap-5 md:grid md:grid-cols-[2fr_1fr_1fr_1fr] p-5 border border-gray-300 rounded-md text-gray-800"
                key={order._id}
              >
                <div className="flex gap-5">
                  <img
                    alt="boxIcon"
                    className="opacity-60 w-12 h-12 object-cover"
                    src={assets.parcel_icon}
                  />
                  <div className="flex flex-col justify-center">
                    <p className="font-medium">
                      {order.items
                        .map(
                          (item) =>
                            `${item.name}${
                              item.quantity > 1 ? ` x ${item.quantity}` : ""
                            }`,
                        )
                        .join(", ")}
                    </p>
                  </div>
                </div>

                <div className="text-sm">
                  <p className="mb-1 font-medium">
                    {order.address?.firstName} {order.address?.lastName}
                  </p>
                  <p>
                    {order.address?.street}, {order.address?.city},{" "}
                    {order.address?.state},{order.address?.zipcode},{" "}
                    {order.address?.country}
                  </p>
                </div>

                <p className="my-auto font-medium text-black/70 text-base">
                  {Number(order.amount).toLocaleString("vi-VN")} {currency}
                </p>

                <div className="flex flex-col text-sm">
                  <p>Phương thức: {order.paymentMethod}</p>
                  <p>
                    Ngày:{" "}
                    {new Date(order.date).toLocaleDateString("vi-VN", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </p>
                  <p>
                    Thanh toán:{" "}
                    <span
                      className={
                        order.payment ? "text-green-600" : "text-red-500"
                      }
                    >
                      {order.payment ? "Đã thanh toán" : "Chờ thanh toán"}
                    </span>
                  </p>
                  <div className="mt-2">
                    <select
                      className="bg-white px-2 py-1 border border-gray-300 rounded text-sm"
                      onChange={(e) => statusHandler(e, order._id)}
                      value={order.status}
                    >
                      <option value="Đã đặt hàng">Đã đặt hàng</option>
                      <option value="Đang đóng gói">Đang đóng gói</option>
                      <option value="Đang giao hàng">Đang giao hàng</option>
                      <option value="Đã giao hàng">Đã giao hàng</option>
                      <option value="Đã giao thành công">
                        Đã giao thành công
                      </option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
