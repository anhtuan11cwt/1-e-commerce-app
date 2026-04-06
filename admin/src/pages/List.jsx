import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

const currency = "₫";

const List = () => {
  const [list, setList] = useState([]);

  const removeProduct = async (id) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
      return;
    }
    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL;
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${backendUrl}/api/product/remove`,
        { id },
        {
          headers: { token },
        },
      );
      if (response.data.success) {
        toast.success("Đã xóa sản phẩm");
        const res = await axios.get(`${backendUrl}/api/product/list`);
        if (res.data.success) {
          setList(res.data.products);
        }
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const backendUrl = import.meta.env.VITE_BACKEND_URL;
        const response = await axios.get(`${backendUrl}/api/product/list`);
        if (response.data.success) {
          setList(response.data.products);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.error(error);
        toast.error(error.message);
      }
    };
    loadData();
  }, []);

  return (
    <div className="p-8">
      <h2 className="text-xl font-bold mb-4">Tất Cả Sản Phẩm</h2>
      <div className="w-full overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-200 text-sm">
              <th className="p-3 font-semibold">Image</th>
              <th className="p-3 font-semibold">Name</th>
              <th className="p-3 font-semibold">Category</th>
              <th className="p-3 font-semibold">Price</th>
              <th className="p-3 font-semibold text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {list.map((item) => (
              <tr className="border-b hover:bg-gray-50" key={item._id}>
                <td className="p-3">
                  <img
                    alt={item.name}
                    className="w-12 h-12 object-cover rounded"
                    src={item.image}
                  />
                </td>
                <td className="p-3 text-sm">{item.name}</td>
                <td className="p-3 text-sm text-gray-600">{item.category}</td>
                <td className="p-3 text-sm font-medium">
                  {Number(item.price).toLocaleString("vi-VN")} {currency}
                </td>
                <td className="p-3 text-center">
                  <button
                    aria-label={`Xóa sản phẩm ${item.name}`}
                    className="p-1 cursor-pointer"
                    onClick={() => removeProduct(item._id)}
                    type="button"
                  >
                    <img alt="" className="w-4" src={assets.cross_icon} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {list.length === 0 && (
        <p className="text-center text-gray-500 mt-8">Không có sản phẩm nào</p>
      )}
    </div>
  );
};

export default List;
