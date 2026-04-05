import { assets } from "../assets/assets";

const Navbar = ({ setToken }) => {
  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
  };

  return (
    <div className="flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3 bg-white transition-all duration-300">
      <img alt="Logo" className="h-9" src={assets.logo} />
      <div className="flex items-center gap-5 text-gray-500">
        <p>Xin chào! Quản trị viên</p>
        <button
          className="border rounded-full text-sm px-4 py-1 cursor-pointer hover:bg-gray-100"
          onClick={logout}
          type="button"
        >
          Đăng Xuất
        </button>
      </div>
    </div>
  );
};

export default Navbar;
