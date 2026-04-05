import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div className="mt-40">
      <div className="flex flex-col gap-14 sm:grid grid-cols-[3fr_1fr_1fr] text-sm">
        <div>
          <img alt="logo" className="mb-5 w-32" src={assets.logo} />
          <p className="w-full md:w-2/3 text-gray-600">
            Chúng tôi cung cấp những sản phẩm thời trang chất lượng cao với giá
            cả hợp lý, mang đến cho bạn phong cách hiện đại và thoải mái nhất.
          </p>
        </div>
        <div>
          <p className="mb-5 font-medium text-xl">CÔNG TY</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>Trang chủ</li>
            <li>Về chúng tôi</li>
            <li>Vận chuyển</li>
            <li>Chính sách bảo mật</li>
          </ul>
        </div>
        <div>
          <p className="mb-5 font-medium text-xl">LIÊN HỆ</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>+84-234-567-890</li>
            <li>contact@yourshop.com</li>
          </ul>
        </div>
      </div>
      <div className="bg-gray-300 my-8 w-full h-px" />
      <p className="text-gray-500 text-sm text-center">
        © 2026 YourShop.com - Bảo lưu mọi quyền.
      </p>
    </div>
  );
};

export default Footer;
