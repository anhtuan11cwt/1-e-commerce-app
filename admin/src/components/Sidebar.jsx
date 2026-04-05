import { List, Package, Plus } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const sidebarLinks = [
    { icon: Plus, id: "add", name: "Thêm Sản Phẩm", path: "/add" },
    { icon: List, id: "list", name: "Danh Sách", path: "/list" },
    { icon: Package, id: "orders", name: "Đơn Hàng", path: "/orders" },
  ];

  return (
    <div className="flex flex-col pt-4 border-gray-300 border-r w-20 md:w-64 h-137.5 text-base transition-all duration-300">
      {sidebarLinks.map((item) => {
        const isActive = currentPath === item.path;
        const Icon = item.icon;
        return (
          <NavLink
            className={`flex items-center py-3 px-4 gap-3 ${
              isActive
                ? "border-r-4 md:border-r-[6px] bg-indigo-500/10 border-indigo-500 text-indigo-500"
                : "hover:bg-gray-100/90 border-white text-gray-700"
            }`}
            key={item.id}
            to={item.path}
          >
            <Icon className="w-6 h-6" />
            <p className="hidden md:block text-center">{item.name}</p>
          </NavLink>
        );
      })}
    </div>
  );
};

export default Sidebar;
