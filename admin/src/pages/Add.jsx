import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

const Add = () => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Nam");
  const [subCategory, setSubCategory] = useState("Áo");
  const [sizes, setSizes] = useState([]);
  const [bestseller, setBestseller] = useState(false);
  const [loading, setLoading] = useState(false);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const sizeOptions = ["S", "M", "L", "XL", "XXL"];

  const handleSizeToggle = (size) => {
    setSizes((prev) =>
      prev.includes(size)
        ? prev.filter((item) => item !== size)
        : [...prev, size],
    );
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!name || !price || sizes.length === 0) {
      toast.error("Vui lòng nhập đầy đủ thông tin và chọn kích thước");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("sizes", JSON.stringify(sizes));
      formData.append("bestseller", bestseller);

      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      const response = await axios.post(
        `${backendUrl}/api/product/add`,
        formData,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        },
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setName("");
        setDescription("");
        setPrice("");
        setCategory("Nam");
        setSubCategory("Áo");
        setSizes([]);
        setBestseller(false);
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="flex flex-col w-full max-w-lg gap-4 p-8"
      onSubmit={onSubmitHandler}
    >
      <div>
        <p className="mb-2 text-base font-medium">Tải ảnh sản phẩm</p>
        <div className="flex flex-wrap gap-3">
          {[
            { img: image1, set: setImage1 },
            { img: image2, set: setImage2 },
            { img: image3, set: setImage3 },
            { img: image4, set: setImage4 },
          ].map((item, index) => {
            const id = `image${index + 1}`;
            return (
              <label className="cursor-pointer" htmlFor={id} key={id}>
                {item.img ? (
                  <img
                    alt="Preview"
                    className="w-20 h-20 object-cover rounded border"
                    src={URL.createObjectURL(item.img)}
                  />
                ) : (
                  <img
                    alt="Upload"
                    className="w-20 h-20 object-cover rounded border border-dashed border-gray-300"
                    src={assets.upload_area}
                  />
                )}
                <input
                  accept="image/*"
                  hidden
                  id={id}
                  onChange={(e) => item.set(e.target.files[0])}
                  type="file"
                />
              </label>
            );
          })}
        </div>
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
            <option value="Nam">Nam</option>
            <option value="Nữ">Nữ</option>
            <option value="Trẻ em">Trẻ em</option>
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
            <option value="Áo">Áo</option>
            <option value="Quần">Quần</option>
            <option value="Đồ mùa đông">Đồ mùa đông</option>
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

      <div>
        <p className="text-sm font-medium mb-2">Kích thước</p>
        <div className="flex flex-wrap gap-2">
          {sizeOptions.map((size) => (
            <button
              className={`px-4 py-2 border rounded transition-colors ${
                sizes.includes(size)
                  ? "bg-black text-white border-black"
                  : "bg-gray-100 border-gray-300 hover:bg-gray-200"
              }`}
              key={size}
              onClick={() => handleSizeToggle(size)}
              type="button"
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <input
          checked={bestseller}
          className="w-4 h-4"
          id="bestseller"
          onChange={() => setBestseller((prev) => !prev)}
          type="checkbox"
        />
        <label className="text-sm font-medium" htmlFor="bestseller">
          Sản phẩm bán chạy
        </label>
      </div>

      <button
        className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition-colors cursor-pointer mt-4 disabled:bg-gray-400 disabled:cursor-not-allowed"
        disabled={loading}
        type="submit"
      >
        {loading ? "Đang thêm..." : "THÊM SẢN PHẨM"}
      </button>
    </form>
  );
};

export default Add;
