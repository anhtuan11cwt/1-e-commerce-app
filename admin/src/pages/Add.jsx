import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

const Add = () => {
  const [image, setImage] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("image", image);

      const response = await axios.post(
        `${backendUrl}/api/product/add`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            token: localStorage.getItem("token"),
          },
        },
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setName("");
        setDescription("");
        setPrice("");
        setImage(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <form
      className="flex flex-col w-full max-w-lg gap-4 p-8"
      onSubmit={onSubmitHandler}
    >
      <div className="flex items-center gap-4">
        <label className="cursor-pointer" htmlFor="image">
          {image ? (
            <img
              alt="Preview"
              className="w-20 h-20 object-cover rounded"
              src={URL.createObjectURL(image)}
            />
          ) : (
            <div className="w-20 h-20 border-2 border-dashed border-gray-300 flex items-center justify-center rounded">
              <span className="text-gray-400">+</span>
            </div>
          )}
        </label>
        <input
          hidden
          id="image"
          onChange={(e) => setImage(e.target.files[0])}
          required
          type="file"
        />
        <span className="text-sm text-gray-500">Tải ảnh lên</span>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="name">
          Tên sản phẩm
        </label>
        <input
          className="w-full border border-gray-300 rounded px-3 py-2"
          id="name"
          onChange={(e) => setName(e.target.value)}
          placeholder="Nhập tên sản phẩm"
          required
          type="text"
          value={name}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="description">
          Mô tả sản phẩm
        </label>
        <textarea
          className="w-full border border-gray-300 rounded px-3 py-2"
          id="description"
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Nhập mô tả sản phẩm"
          required
          rows={4}
          value={description}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="category">
            Danh mục
          </label>
          <select
            className="w-full border border-gray-300 rounded px-3 py-2"
            id="category"
            onChange={(e) => setCategory(e.target.value)}
            value={category}
          >
            <option value="Men">Nam</option>
            <option value="Women">Nữ</option>
            <option value="Kids">Trẻ em</option>
          </select>
        </div>

        <div>
          <label
            className="block text-sm font-medium mb-1"
            htmlFor="subCategory"
          >
            Danh mục phụ
          </label>
          <select
            className="w-full border border-gray-300 rounded px-3 py-2"
            id="subCategory"
            onChange={(e) => setSubCategory(e.target.value)}
            value={subCategory}
          >
            <option value="Topwear">Áo</option>
            <option value="Bottomwear">Quần</option>
            <option value="Winterwear">Đồ mùa đông</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="price">
          Giá
        </label>
        <input
          className="w-full border border-gray-300 rounded px-3 py-2"
          id="price"
          onChange={(e) => setPrice(e.target.value)}
          placeholder="25"
          required
          type="number"
          value={price}
        />
      </div>

      <button
        className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition-colors cursor-pointer mt-4"
        type="submit"
      >
        THÊM SẢN PHẨM
      </button>
    </form>
  );
};

export default Add;
