import { useContext, useMemo, useState } from "react";
import { assets } from "../assets/assets";
import ProductItem from "../components/ProductItem";
import Title from "../components/Title";
import { ShopContext } from "../context/ShopContext";

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [sortType, setSortType] = useState("relevant");
  const [showFilter, setShowFilter] = useState(false);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);

  const toggleCategory = (e) => {
    const value = e.target.value;
    if (category.includes(value)) {
      setCategory((prev) => prev.filter((item) => item !== value));
    } else {
      setCategory((prev) => [...prev, value]);
    }
  };

  const toggleSubCategory = (e) => {
    const value = e.target.value;
    if (subCategory.includes(value)) {
      setSubCategory((prev) => prev.filter((item) => item !== value));
    } else {
      setSubCategory((prev) => [...prev, value]);
    }
  };

  const filterProducts = useMemo(() => {
    let productsCopy = [...products];

    if (showSearch && search) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase()),
      );
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        category.includes(item.category),
      );
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        subCategory.includes(item.subCategory),
      );
    }

    if (sortType === "low-high") {
      productsCopy.sort((a, b) => a.price - b.price);
    } else if (sortType === "high-low") {
      productsCopy.sort((a, b) => b.price - a.price);
    }

    return productsCopy;
  }, [products, search, showSearch, category, subCategory, sortType]);

  return (
    <div className="flex flex-col sm:flex-row gap-10 pt-10 border-t">
      <div className="min-w-60 sm:block">
        <button
          className="my-3 text-xl flex items-center cursor-pointer gap-2"
          onClick={() => setShowFilter(!showFilter)}
          type="button"
        >
          BỘ LỌC
          <img
            alt=""
            className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`}
            src={assets.dropdown_icon}
          />
        </button>

        <div className={`${showFilter ? "" : "hidden"} sm:block`}>
          <div className="border pl-5 py-3 mt-6">
            <p className="mb-3 text-sm font-medium">DANH MỤC</p>
            <div className="flex flex-col gap-2 text-sm text-gray-600">
              {["Nam", "Nữ", "Trẻ Em"].map((item) => (
                <label className="flex gap-2 cursor-pointer" key={item}>
                  <input
                    checked={category.includes(item)}
                    onChange={toggleCategory}
                    type="checkbox"
                    value={item}
                  />
                  {item}
                </label>
              ))}
            </div>
          </div>

          <div className="border pl-5 py-3 my-5">
            <p className="mb-3 text-sm font-medium">LOẠI</p>
            <div className="flex flex-col gap-2 text-sm text-gray-600">
              {["Áo", "Quần", "Áo Mùa Đông"].map((item) => (
                <label className="flex gap-2 cursor-pointer" key={item}>
                  <input
                    checked={subCategory.includes(item)}
                    onChange={toggleSubCategory}
                    type="checkbox"
                    value={item}
                  />
                  {item}
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1">
        <div className="flex justify-between items-center mb-4">
          <Title text1={"TẤT CẢ"} text2={"SẢN PHẨM"} />

          <select
            className="border border-gray-300 px-3 py-2 text-sm"
            onChange={(e) => setSortType(e.target.value)}
          >
            <option value="relevant">Sắp xếp: Liên quan</option>
            <option value="low-high">Giá: Thấp đến cao</option>
            <option value="high-low">Giá: Cao đến thấp</option>
          </select>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 gap-y-6">
          {filterProducts.map((item, index) => (
            <ProductItem
              id={item._id}
              image={item.image}
              key={item._id || `product-${index}`}
              name={item.name}
              price={item.price}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;
