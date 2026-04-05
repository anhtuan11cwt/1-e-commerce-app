import { useContext } from "react";
import { useLocation } from "react-router-dom";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } =
    useContext(ShopContext);

  const location = useLocation();

  if (location.pathname !== "/collection" || !showSearch) {
    return null;
  }

  return (
    <div className="border-t border-b bg-gray-50 text-center">
      <div className="inline-flex items-center justify-center gap-2 px-3 py-2 my-5 border rounded-full w-3/4 sm:w-1/2">
        <input
          className="flex-1 outline-none bg-inherit text-sm"
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Tìm kiếm sản phẩm..."
          type="text"
          value={search}
        />

        <img alt="" className="w-4" src={assets.search_icon} />
      </div>

      <button
        aria-label="Đóng tìm kiếm"
        className="inline w-3 cursor-pointer bg-transparent border-none"
        onClick={() => setShowSearch(false)}
        type="button"
      >
        <img alt="" className="w-3" src={assets.cross_icon} />
      </button>
    </div>
  );
};

export default SearchBar;
