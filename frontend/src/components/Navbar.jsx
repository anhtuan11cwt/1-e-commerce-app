import { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const { setShowSearch, getCartCount, token, setToken } =
    useContext(ShopContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  return (
    <div className="flex justify-between items-center py-5 font-medium">
      <Link to="/">
        <img alt="logo" className="w-36" src={assets.logo} />
      </Link>

      <ul className="hidden sm:flex gap-5 text-gray-700 text-sm">
        <NavLink className="flex flex-col items-center gap-1" to="/">
          <p>TRANG CHỦ</p>
          <hr className="hidden bg-gray-700 border-none w-2/4 h-[1.5px]" />
        </NavLink>

        <NavLink className="flex flex-col items-center gap-1" to="/collection">
          <p>BỘ SƯU TẬP</p>
          <hr className="hidden bg-gray-700 border-none w-2/4 h-[1.5px]" />
        </NavLink>

        <NavLink className="flex flex-col items-center gap-1" to="/about">
          <p>VỀ CHÚNG TÔI</p>
          <hr className="hidden bg-gray-700 border-none w-2/4 h-[1.5px]" />
        </NavLink>

        <NavLink className="flex flex-col items-center gap-1" to="/contact">
          <p>LIÊN HỆ</p>
          <hr className="hidden bg-gray-700 border-none w-2/4 h-[1.5px]" />
        </NavLink>
      </ul>

      <div className="flex items-center gap-6">
        <button
          aria-label="Tìm kiếm"
          className="bg-transparent border-none p-0 cursor-pointer"
          onClick={() => setShowSearch(true)}
          type="button"
        >
          <img
            alt="search"
            className="w-5 cursor-pointer"
            src={assets.search_icon}
          />
        </button>

        <div className="group relative">
          <img
            alt="profile"
            className="w-5 cursor-pointer"
            src={assets.profile_icon}
          />
          <div className="hidden group-hover:block right-0 absolute pt-4">
            <div className="flex flex-col gap-2 bg-slate-100 px-5 py-3 rounded w-36 text-gray-500">
              {token ? (
                <>
                  <button
                    className="hover:text-black cursor-pointer text-left bg-transparent border-none p-0"
                    onClick={() => navigate("/orders")}
                    type="button"
                  >
                    Đơn hàng
                  </button>
                  <button
                    className="hover:text-black cursor-pointer text-left bg-transparent border-none p-0"
                    onClick={handleLogout}
                    type="button"
                  >
                    Đăng xuất
                  </button>
                </>
              ) : (
                <button
                  className="hover:text-black cursor-pointer text-left bg-transparent border-none p-0"
                  onClick={() => navigate("/login")}
                  type="button"
                >
                  Đăng nhập
                </button>
              )}
            </div>
          </div>
        </div>

        <Link className="relative" to="/cart">
          <img alt="cart" className="w-5 min-w-5" src={assets.cart_icon} />
          <p className="-right-1.25 -bottom-1.25 absolute bg-black rounded-full w-4 aspect-square text-[8px] text-white text-center leading-4">
            {getCartCount()}
          </p>
        </Link>

        <button
          className="sm:hidden w-5 cursor-pointer"
          onClick={() => setVisible(true)}
          type="button"
        >
          <img alt="menu" src={assets.menu_icon} />
        </button>
      </div>

      <div
        className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? "w-full" : "w-0"}`}
      >
        <div className="flex flex-col text-gray-600">
          <button
            className="flex items-center gap-4 p-3 cursor-pointer"
            onClick={() => setVisible(false)}
            type="button"
          >
            <img alt="" className="h-4 rotate-180" src={assets.dropdown_icon} />
            <p>Quay lại</p>
          </button>

          <NavLink
            className="py-2 pl-6 border"
            onClick={() => setVisible(false)}
            to="/"
          >
            TRANG CHỦ
          </NavLink>

          <NavLink
            className="py-2 pl-6 border"
            onClick={() => setVisible(false)}
            to="/collection"
          >
            BỘ SƯU TẬP
          </NavLink>

          <NavLink
            className="py-2 pl-6 border"
            onClick={() => setVisible(false)}
            to="/about"
          >
            VỀ CHÚNG TÔI
          </NavLink>

          <NavLink
            className="py-2 pl-6 border"
            onClick={() => setVisible(false)}
            to="/contact"
          >
            LIÊN HỆ
          </NavLink>

          {!token && (
            <NavLink
              className="py-2 pl-6 border"
              onClick={() => {
                setVisible(false);
                navigate("/login");
              }}
              to="/login"
            >
              ĐĂNG NHẬP
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
