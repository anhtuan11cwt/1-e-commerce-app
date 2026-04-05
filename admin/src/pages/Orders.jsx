import axios from "axios";
import { useCallback, useEffect, useState } from "react";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = useCallback(async () => {
    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL;
      const response = await axios.get(`${backendUrl}/api/order/list`, {
        headers: { token: localStorage.getItem("token") },
      });
      if (response.data.success) {
        setOrders(response.data.orders);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  const statusHandler = useCallback(
    async (event, orderId) => {
      try {
        const backendUrl = import.meta.env.VITE_BACKEND_URL;
        const response = await axios.post(
          `${backendUrl}/api/order/status`,
          { orderId, status: event.target.value },
          {
            headers: { token: localStorage.getItem("token") },
          },
        );
        if (response.data.success) {
          fetchOrders();
        }
      } catch (error) {
        console.error(error);
      }
    },
    [fetchOrders],
  );

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchOrders();
  }, [fetchOrders]);

  return (
    <div className="p-8">
      <h2 className="text-xl font-bold mb-4">Đơn Hàng</h2>
      <div className="flex flex-col gap-4">
        {orders.length === 0 ? (
          <p className="text-gray-500">Không có đơn hàng nào.</p>
        ) : (
          orders.map((order) => (
            <div
              className="border rounded p-4 flex flex-col md:flex-row md:items-center gap-4"
              key={order._id}
            >
              <div className="flex-1">
                <p className="font-medium">
                  Mã đơn hàng:{" "}
                  <span className="text-gray-500">{order._id}</span>
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Số sản phẩm: {order.items?.length || 0}
                </p>
                <p className="text-sm text-gray-600">
                  Tổng tiền: ${order.amount}
                </p>
                <p className="text-sm text-gray-600">
                  Ngày đặt: {new Date(order.date).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Trạng thái:</span>
                <select
                  className="border border-gray-300 rounded px-2 py-1 text-sm"
                  onChange={(e) => statusHandler(e, order._id)}
                  value={order.status}
                >
                  <option value="Order Placed">Đã đặt hàng</option>
                  <option value="Packing">Đang đóng gói</option>
                  <option value="Shipped">Đã giao hàng</option>
                  <option value="Out for Delivery">Đang giao</option>
                  <option value="Delivered">Đã giao thành công</option>
                </select>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Orders;
