import axios from "axios";
import { useCallback, useEffect, useState } from "react";

const List = () => {
  const [list, setList] = useState([]);

  const fetchList = useCallback(async () => {
    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL;
      const response = await axios.get(`${backendUrl}/api/product/list`);
      if (response.data.success) {
        setList(response.data.products);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  const removeProduct = useCallback(
    async (id) => {
      try {
        const backendUrl = import.meta.env.VITE_BACKEND_URL;
        const response = await axios.post(
          `${backendUrl}/api/product/remove`,
          { id },
          {
            headers: { token: localStorage.getItem("token") },
          },
        );
        if (response.data.success) {
          fetchList();
        }
      } catch (error) {
        console.error(error);
      }
    },
    [fetchList],
  );

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchList();
  }, [fetchList]);

  return (
    <div className="p-8">
      <h2 className="text-xl font-bold mb-4">Tất Cả Sản Phẩm</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {list.map((item, index) => (
          <div className="border rounded p-4" key={item._id || index}>
            <img
              alt={item.name}
              className="w-full h-48 object-cover rounded mb-2"
              src={item.image}
            />
            <h3 className="font-medium text-sm">{item.name}</h3>
            <p className="text-gray-500 text-xs">{item.category}</p>
            <p className="font-bold mt-1">${item.price}</p>
            <button
              className="text-red-500 text-sm mt-2 hover:underline cursor-pointer"
              onClick={() => removeProduct(item._id)}
              type="button"
            >
              Xóa
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
