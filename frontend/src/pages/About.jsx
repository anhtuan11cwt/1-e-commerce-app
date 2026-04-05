import { assets } from "../assets/assets";
import NewsletterBox from "../components/NewsletterBox";
import Title from "../components/Title";

const About = () => {
  return (
    <div className="px-4 md:px-16 lg:px-24">
      <Title text1={"VỀ CHÚNG"} text2={"TÔI"} />

      <div className="flex md:flex-row flex-col gap-10 my-10">
        <img
          alt="About"
          className="w-full md:max-w-112.5"
          src={assets.about_img}
        />
        <div className="flex flex-col justify-center gap-6 text-gray-600">
          <p>
            Forever được sinh ra từ niềm đam mê đổi mới và mong muốn cách mạng
            hóa cách mọi người mua sắm trực tuyến. Hành trình của chúng tôi bắt
            đầu với một ý tưởng đơn giản: tạo ra một nền tảng kết nối liền mạch
            khách hàng với những sản phẩm họ yêu thích, mang đến trải nghiệm mua
            sắm vượt trội.
          </p>
          <p>
            Kể từ khi thành lập, chúng tôi đã phát triển thành điểm đến đáng tin
            cậy cho những người yêu thời trang tìm kiếm chất lượng, phong cách
            và giá trị. Chúng tôi tin rằng trải nghiệm mua sắm tuyệt vời nên
            được phổ biến đến mọi người, và chúng tôi cam kết biến điều đó thành
            hiện thực mỗi ngày.
          </p>
        </div>
      </div>

      <div className="my-16">
        <h2 className="mb-4 font-semibold text-2xl">SỨ MỆNH CỦA CHÚNG TÔI</h2>
        <p className="text-gray-600">
          Sứ mệnh của chúng tôi là cung cấp các sản phẩm thời trang chất lượng
          cao giúp cá nhân thể hiện phong cách độc đáo của mình. Chúng tôi cam
          kết mang đến giá trị vượt trội, đảm bảo sự hài lòng của khách hàng và
          thúc đẩy các thực hành bền vững trong ngành thời trang.
        </p>
      </div>

      <Title text1={"TẠI SAO CHỌN"} text2={"CHÚNG TÔI"} />

      <div className="gap-6 grid grid-cols-1 md:grid-cols-3 my-16">
        <div className="px-6 py-8 border">
          <h3 className="mb-2 font-semibold">Đảm Bảo Chất Lượng</h3>
          <p className="text-gray-600">
            Chúng tôi đảm bảo mọi sản phẩm đạt tiêu chuẩn cao thông qua kiểm tra
            chất lượng nghiêm ngặt và hợp tác với các nhà cung cấp đáng tin cậy.
          </p>
        </div>
        <div className="px-6 py-8 border">
          <h3 className="mb-2 font-semibold">Tiện Lợi</h3>
          <p className="text-gray-600">
            Tận hưởng mua sắm dễ dàng với giao hàng nhanh chóng, đổi trả đơn
            giản và hỗ trợ khách hàng 24/7 luôn sẵn sàng.
          </p>
        </div>
        <div className="px-6 py-8 border">
          <h3 className="mb-2 font-semibold">Dịch Vụ Khách Hàng Xuất Sắc</h3>
          <p className="text-gray-600">
            Đội ngũ hỗ trợ tận tâm của chúng tôi luôn sẵn sàng hỗ trợ bạn với
            mọi câu hỏi hoặc thắc mắc bạn có thể có.
          </p>
        </div>
      </div>

      <NewsletterBox />
    </div>
  );
};

export default About;
