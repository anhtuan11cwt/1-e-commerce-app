import { useCallback, useContext, useEffect, useState } from "react";
import ProductItem from "../components/ProductItem";
import Title from "../components/Title";
import { ShopContext } from "../context/ShopContext";

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [filterProducts, setFilterProducts] = useState([]);
  const [sortType, setSortType] = useState("relevant");

  const applyFilter = useCallback(() => {
    let productsCopy = products.slice();

    if (showSearch && search) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase()),
      );
    }

    setFilterProducts(productsCopy);
  }, [products, search, showSearch]);

  const sortProducts = useCallback(
    (type) => {
      const productsCopy = filterProducts.slice();

      switch (type) {
        case "low-high":
          setFilterProducts(productsCopy.sort((a, b) => a.price - b.price));
          break;
        case "high-low":
          setFilterProducts(productsCopy.sort((a, b) => b.price - a.price));
          break;
        default:
          applyFilter();
          break;
      }
    },
    [filterProducts, applyFilter],
  );

  useEffect(() => {
    applyFilter();
  }, [applyFilter]);

  useEffect(() => {
    sortProducts(sortType);
  }, [sortType, sortProducts]);

  return (
    <div className="flex flex-col sm:flex-row gap-10 sm:gap-10 pt-10 border-t">
      <div className="min-w-60">
        <p className="mb-3 text-xl flex items-center cursor-pointer gap-2">
          BỘ LỌC
        </p>
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
          {filterProducts.map((item) => (
            <ProductItem
              id={item._id}
              image={item.image}
              key={item._id}
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
