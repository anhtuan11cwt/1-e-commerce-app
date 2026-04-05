import { assets } from "../assets/assets";

const OurPolicy = () => {
  const policies = [
    {
      description: "Chúng tôi cung cấp chính sách đổi trả dễ dàng",
      icon: assets.exchange_icon,
      title: "Chính Sách Đổi Trả",
    },
    {
      description:
        "Chúng tôi cung cấp chính sách hoàn trả miễn phí trong 7 ngày",
      icon: assets.quality_icon,
      title: "Chính Sách Hoàn Tiền 7 Ngày",
    },
    {
      description: "Chúng tôi hỗ trợ khách hàng 24/7",
      icon: assets.support_img,
      title: "Hỗ Trợ Khách Hàng",
    },
  ];

  return (
    <div className="flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700">
      {policies.map((policy) => (
        <div className="flex flex-col items-center" key={policy.title}>
          <img alt="" className="w-12 mb-5" src={policy.icon} />
          <p className="font-semibold">{policy.title}</p>
          <p className="text-gray-400">{policy.description}</p>
        </div>
      ))}
    </div>
  );
};

export default OurPolicy;
