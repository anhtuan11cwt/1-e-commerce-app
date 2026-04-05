import { assets } from "../assets/assets";

const Hero = () => {
  return (
    <div className="flex flex-col sm:flex-row border border-gray-400">
      <div className="w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0">
        <div className="text-[#414141]">
          <div className="flex items-center gap-2">
            <p className="w-8 md:w-11 h-[2px] bg-[#414141]" />
            <p className="font-medium text-sm md:text-base">
              SẢN PHẨM BÁN CHẠY
            </p>
          </div>
          <h1 className="prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed">
            BỘ SƯU TẬP MỚI
          </h1>
          <div className="flex items-center gap-2">
            <p className="font-semibold text-sm md:text-base">MUA NGAY</p>
            <p className="w-8 md:w-11 h-[1px] bg-[#414141]" />
          </div>
        </div>
      </div>
      <div className="w-full sm:w-1/2">
        <img
          alt="hero"
          className="w-full h-full object-cover"
          src={assets.hero_img}
        />
      </div>
    </div>
  );
};

export default Hero;
