import { assets } from "../assets/assets";
import NewsletterBox from "../components/NewsletterBox";
import Title from "../components/Title";

const Contact = () => {
  return (
    <div className="px-4 md:px-16 lg:px-24">
      <Title text1={"LIÊN HỆ"} text2={"VỚI CHÚNG TÔI"} />

      <div className="flex flex-col md:flex-row gap-10 my-10">
        <img
          alt="Contact"
          className="w-full md:max-w-[450px]"
          src={assets.contact_img}
        />
        <div className="flex flex-col justify-center gap-6 text-gray-600">
          <p className="font-semibold text-xl text-gray-800">
            Cửa Hàng Của Chúng Tôi
          </p>
          <p>
            123 Đường Thời Trang
            <br />
            Quận 1, TP. Hồ Chí Minh
            <br />
            Việt Nam
          </p>
          <p>
            Điện thoại: <span className="text-gray-500">+84 234 567 890</span>
          </p>
          <p>
            Email: <span className="text-gray-500">support@forever.com</span>
          </p>
        </div>
      </div>

      <div className="my-16">
        <h2 className="text-2xl font-semibold mb-4">Tuyển Dụng Tại Forever</h2>
        <p className="text-gray-600 mb-6">
          Tìm hiểu thêm về đội ngũ của chúng tôi và các vị trí đang tuyển dụng.
        </p>
        <button
          className="border border-black px-6 py-3 hover:bg-black hover:text-white transition duration-300"
          type="button"
        >
          Xem Các Vị Trí
        </button>
      </div>

      <NewsletterBox />
    </div>
  );
};

export default Contact;
