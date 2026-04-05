import path from "node:path";
import { fileURLToPath } from "node:url";
import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadImageToCloudinary = async (imagePath) => {
  try {
    const result = await cloudinary.uploader.upload(imagePath, {
      folder: "products",
      resource_type: "image",
    });
    return result.secure_url;
  } catch (error) {
    console.error(`Lỗi upload ${imagePath}:`, error.message);
    return null;
  }
};

const sampleProducts = [
  {
    bestseller: true,
    category: "Nữ",
    date: 1716634345448,
    description:
      "Áo thun nữ chất liệu cotton 100% mềm mại, thấm hút mồ hôi tốt. Thiết kế cổ tròn basic dễ phối đồ, form dáng ôm vừa vặn tôn dáng.",
    image: "p_img1.png",
    name: "Áo Thun Cotton Cổ Tròn Nữ",
    price: 250000,
    sizes: ["S", "M", "L"],
    subCategory: "Áo",
  },
  {
    bestseller: true,
    category: "Nam",
    date: 1716621345448,
    description:
      "Áo thun nam cotton cao cấp, form regular fit thoải mái. Chất vải mềm mịn, thoáng khí, không xù lông. Phù hợp mặc hàng ngày hoặc đi chơi.",
    image: "p_img2_1.png",
    name: "Áo Thun Cotton 100% Cổ Tròn Nam",
    price: 350000,
    sizes: ["M", "L", "XL"],
    subCategory: "Áo",
  },
  {
    bestseller: true,
    category: "Trẻ Em",
    date: 1716234545448,
    description:
      "Áo thun bé gái chất cotton mềm mại, an toàn cho làn da nhạy cảm. Thiết kế đáng yêu, màu sắc tươi sáng, dễ vận động và sinh hoạt.",
    image: "p_img3.png",
    name: "Áo Thun Cotton Cổ Tròn Bé Gái",
    price: 200000,
    sizes: ["S", "L", "XL"],
    subCategory: "Áo",
  },
  {
    bestseller: true,
    category: "Nam",
    date: 1716621345448,
    description:
      "Áo thun nam basic thiết kế tối giản, dễ phối đồ. Chất cotton thoáng mát, co giãn nhẹ. Size đa dạng từ S đến XXL.",
    image: "p_img4.png",
    name: "Áo Thun Cotton 100% Cổ Tròn Nam",
    price: 275000,
    sizes: ["S", "M", "XXL"],
    subCategory: "Áo",
  },
  {
    bestseller: true,
    category: "Nữ",
    date: 1716622345448,
    description:
      "Áo thun nữ form fitted tôn dáng, chất liệu cotton cao cấp. Đường may tỉ mỉ, bền đẹp sau nhiều lần giặt. Thích hợp đi làm, đi học.",
    image: "p_img5.png",
    name: "Áo Thun Cotton Cổ Tròn Nữ",
    price: 325000,
    sizes: ["M", "L", "XL"],
    subCategory: "Áo",
  },
  {
    bestseller: true,
    category: "Trẻ Em",
    date: 1716623423448,
    description:
      "Áo thun trẻ em chất cotton organic an toàn, không gây kích ứng da. Form dáng thoải mái, bé tự do vui chơi. Màu sắc bền đẹp.",
    image: "p_img6.png",
    name: "Áo Thun Cotton Cổ Tròn Bé Gái",
    price: 220000,
    sizes: ["S", "L", "XL"],
    subCategory: "Áo",
  },
  {
    bestseller: false,
    category: "Nam",
    date: 1716621542448,
    description:
      "Quần tây nam dáng suông lịch sự, phù hợp đi làm văn phòng. Chất vải kaki cao cấp, ít nhăn, dễ là ủi. Túi khóa kéo tiện lợi.",
    image: "p_img7.png",
    name: "Quần Tây Nam Ôm Dáng Suông",
    price: 475000,
    sizes: ["S", "L", "XL"],
    subCategory: "Quần",
  },
  {
    bestseller: false,
    category: "Nam",
    date: 1716622345448,
    description:
      "Áo thun nam chất cotton combed 4 chiều co giãn tốt. Cổ tròn bo gân không bai giãn. Kiểu dáng trẻ trung, năng động.",
    image: "p_img8.png",
    name: "Áo Thun Cotton 100% Cổ Tròn Nam",
    price: 350000,
    sizes: ["S", "M", "L", "XL"],
    subCategory: "Áo",
  },
  {
    bestseller: false,
    category: "Trẻ Em",
    date: 1716621235448,
    description:
      "Áo thun bé gái thiết kế xinh xắn, phối màu dễ thương. Chất vải cotton mềm mịn, thấm hút tốt. Giá cả phải chăng cho gia đình.",
    image: "p_img9.png",
    name: "Áo Thun Cotton Cổ Tròn Bé Gái",
    price: 180000,
    sizes: ["M", "L", "XL"],
    subCategory: "Áo",
  },
  {
    bestseller: false,
    category: "Nam",
    date: 1716622235448,
    description:
      "Quần tây nam dáng ôm hiện đại, tôn dáng người mặc. Chất liệu thoáng mát, không nhăn. Thiết kế túi tiện dụng, phù hợp nhiều dịp.",
    image: "p_img10.png",
    name: "Quần Tây Nam Ôm Dáng Suông",
    price: 275000,
    sizes: ["S", "L", "XL"],
    subCategory: "Quần",
  },
  {
    bestseller: false,
    category: "Nam",
    date: 1716623345448,
    description:
      "Áo thun nam thiết kế đơn giản, dễ mix đồ. Vải cotton mềm mại, thấm hút tốt. Giá tốt, chất lượng ổn định.",
    image: "p_img11.png",
    name: "Áo Thun Cotton 100% Cổ Tròn Nam",
    price: 300000,
    sizes: ["S", "M", "L"],
    subCategory: "Áo",
  },
  {
    bestseller: false,
    category: "Nam",
    date: 1716624445448,
    description:
      "Áo thun nam form regular thoải mái, không bó sát. Chất vải cotton tự nhiên, thân thiện môi trường. Màu sắc trung tính dễ phối.",
    image: "p_img12.png",
    name: "Áo Thun Cotton 100% Cổ Tròn Nam",
    price: 375000,
    sizes: ["S", "M", "L", "XL"],
    subCategory: "Áo",
  },
  {
    bestseller: false,
    category: "Nữ",
    date: 1716625545448,
    description:
      "Áo thun nữ kiểu dáng basic, phù hợp mọi lứa tuổi. Chất cotton mềm mịn, không xù lông. Giặt máy không phai màu.",
    image: "p_img13.png",
    name: "Áo Thun Cotton Cổ Tròn Nữ",
    price: 325000,
    sizes: ["S", "M", "L", "XL"],
    subCategory: "Áo",
  },
  {
    bestseller: false,
    category: "Trẻ Em",
    date: 1716626645448,
    description:
      "Áo thun bé trai năng động, thoải mái vận động. Cotton thấm hút mồ hôi tốt, an toàn cho trẻ. Thiết kế trẻ trung, đáng yêu.",
    image: "p_img14.png",
    name: "Áo Thun Cotton 100% Cổ Tròn Bé Trai",
    price: 400000,
    sizes: ["S", "M", "L", "XL"],
    subCategory: "Áo",
  },
  {
    bestseller: false,
    category: "Nam",
    date: 1716627745448,
    description:
      "Quần tây nam công sở, dáng ôm vừa phải. Vải kaki co giãn nhẹ, thoải mái cả ngày dài. Thiết kế túi hông và túi sau tiện dụng.",
    image: "p_img15.png",
    name: "Quần Tây Nam Ôm Dáng Suông",
    price: 350000,
    sizes: ["S", "M", "L", "XL"],
    subCategory: "Quần",
  },
  {
    bestseller: false,
    category: "Trẻ Em",
    date: 1716628845448,
    description:
      "Áo thun bé gái chất cotton cao cấp, mềm mại như lụa. Họa tiết dễ thương, màu sắc tươi tắn. Bền đẹp, giữ form sau nhiều lần giặt.",
    image: "p_img16.png",
    name: "Áo Thun Cotton Cổ Tròn Bé Gái",
    price: 425000,
    sizes: ["S", "M", "L", "XL"],
    subCategory: "Áo",
  },
  {
    bestseller: false,
    category: "Nam",
    date: 1716629945448,
    description:
      "Quần tây nam dáng slim fit hiện đại, tôn dáng. Chất liệu vải cao cấp, ít nhăn, dễ chăm sóc. Phù hợp đi làm và dự tiệc.",
    image: "p_img17.png",
    name: "Quần Tây Nam Ôm Dáng Suông",
    price: 375000,
    sizes: ["S", "M", "L", "XL"],
    subCategory: "Quần",
  },
  {
    bestseller: false,
    category: "Trẻ Em",
    date: 1716631045448,
    description:
      "Áo thun bé trai cotton 100%, không pha tạp chất. Form dáng rộng rãi, thoải mái. Màu sắc bền đẹp, không phai sau giặt.",
    image: "p_img18.png",
    name: "Áo Thun Cotton 100% Cổ Tròn Bé Trai",
    price: 450000,
    sizes: ["S", "M", "L", "XL"],
    subCategory: "Áo",
  },
  {
    bestseller: false,
    category: "Trẻ Em",
    date: 1716632145448,
    description:
      "Áo thun trẻ em chất lượng cao, giá cả hợp lý. Vải cotton mềm mịn, thoáng khí. Thiết kế đơn giản, dễ phối đồ cho bé.",
    image: "p_img19.png",
    name: "Áo Thun Cotton 100% Cổ Tròn Bé Trai",
    price: 400000,
    sizes: ["S", "M", "L", "XL"],
    subCategory: "Áo",
  },
  {
    bestseller: false,
    category: "Nữ",
    date: 1716633245448,
    description:
      "Quần palazzo nữ dáng suông rộng thoải mái, thanh lịch. Kèm thắt lưng vải điều chỉnh được. Chất liệu mềm mại, thoáng mát mùa hè.",
    image: "p_img20.png",
    name: "Quần Palazzo Nữ Kèm Thắt Lưng",
    price: 475000,
    sizes: ["S", "M", "L", "XL"],
    subCategory: "Quần",
  },
  {
    bestseller: false,
    category: "Nữ",
    date: 1716634345448,
    description:
      "Áo khoác nữ dáng rộng phong cách Hàn Quốc. Khóa kéo chắc chắn, túi hai bên tiện lợi. Giữ ấm tốt, phù hợp mùa thu đông.",
    image: "p_img21.png",
    name: "Áo Khoác Nữ Dáng Rộng Có Khóa Kéo",
    price: 425000,
    sizes: ["S", "M", "L", "XL"],
    subCategory: "Áo Mùa Đông",
  },
  {
    bestseller: false,
    category: "Nữ",
    date: 1716635445448,
    description:
      "Quần palazzo nữ chất vải lụa mềm mại, bay bổng. Thắt lưng vải điều chỉnh vừa vặn. Thiết kế thanh lịch, sang trọng.",
    image: "p_img22.png",
    name: "Quần Palazzo Nữ Kèm Thắt Lưng",
    price: 500000,
    sizes: ["S", "M", "L", "XL"],
    subCategory: "Quần",
  },
  {
    bestseller: false,
    category: "Trẻ Em",
    date: 1716636545448,
    description:
      "Áo thun bé trai chất cotton combed mềm mịn. Cổ tròn bo gân co giãn tốt. Họa tiết in sắc nét, không bong tróc.",
    image: "p_img23.png",
    name: "Áo Thun Cotton 100% Cổ Tròn Bé Trai",
    price: 450000,
    sizes: ["S", "M", "L", "XL"],
    subCategory: "Áo",
  },
  {
    bestseller: false,
    category: "Trẻ Em",
    date: 1716637645448,
    description:
      "Áo thun trẻ em cao cấp, chất lượng xuất khẩu. Vải cotton mềm mại, an toàn tuyệt đối. Form dáng đẹp, bền màu lâu.",
    image: "p_img24.png",
    name: "Áo Thun Cotton 100% Cổ Tròn Bé Trai",
    price: 525000,
    sizes: ["S", "M", "L", "XL"],
    subCategory: "Áo",
  },
  {
    bestseller: false,
    category: "Trẻ Em",
    date: 1716638745448,
    description:
      "Áo thun bé gái thiết kế xinh xắn, nữ tính. Cotton thấm hút tốt, thoáng mát. Đường may tỉ mỉ, chắc chắn.",
    image: "p_img25.png",
    name: "Áo Thun Cotton Cổ Tròn Bé Gái",
    price: 475000,
    sizes: ["S", "M", "L", "XL"],
    subCategory: "Áo",
  },
  {
    bestseller: false,
    category: "Nữ",
    date: 1716639845448,
    description:
      "Áo khoác nữ form rộng thoải mái, phong cách trẻ trung. Chất liệu nỉ mềm, giữ ấm hiệu quả. Dễ phối với nhiều trang phục.",
    image: "p_img26.png",
    name: "Áo Khoác Nữ Dáng Rộng Có Khóa Kéo",
    price: 550000,
    sizes: ["S", "M", "L", "XL"],
    subCategory: "Áo Mùa Đông",
  },
  {
    bestseller: false,
    category: "Trẻ Em",
    date: 1716640945448,
    description:
      "Áo thun bé gái chất cotton cao cấp, mềm mịn. Màu sắc pastel nhẹ nhàng, dễ thương. Giặt máy không lo phai màu.",
    image: "p_img27.png",
    name: "Áo Thun Cotton Cổ Tròn Bé Gái",
    price: 500000,
    sizes: ["S", "M", "L", "XL"],
    subCategory: "Áo",
  },
  {
    bestseller: false,
    category: "Nam",
    date: 1716642045448,
    description:
      "Áo khoác jeans nam dáng ôm thời trang. Chất denim cao cấp, bền đẹp theo thời gian. Phong cách năng động, cá tính.",
    image: "p_img28.png",
    name: "Áo Khoác Jeans Nam Dáng Ôm",
    price: 575000,
    sizes: ["S", "M", "L", "XL"],
    subCategory: "Áo Mùa Đông",
  },
  {
    bestseller: false,
    category: "Nữ",
    date: 1716643145448,
    description:
      "Áo thun nữ thiết kế basic, dễ mix đồ. Chất cotton mềm mại, co giãn nhẹ. Phù hợp mặc hàng ngày, đi làm, đi chơi.",
    image: "p_img29.png",
    name: "Áo Thun Cotton Cổ Tròn Nữ",
    price: 525000,
    sizes: ["S", "M", "L", "XL"],
    subCategory: "Áo",
  },
  {
    bestseller: false,
    category: "Trẻ Em",
    date: 1716644245448,
    description:
      "Áo thun bé gái premium, chất lượng vượt trội. Cotton organic an toàn, không hóa chất. Thiết kế đáng yêu, màu sắc tươi sáng.",
    image: "p_img30.png",
    name: "Áo Thun Cotton Cổ Tròn Bé Gái",
    price: 600000,
    sizes: ["S", "M", "L", "XL"],
    subCategory: "Áo",
  },
  {
    bestseller: false,
    category: "Nam",
    date: 1716645345448,
    description:
      "Áo thun nam chất lượng cao, cotton 100% tự nhiên. Cổ tròn bo gân không bai. Màu sắc đa dạng, dễ lựa chọn.",
    image: "p_img31.png",
    name: "Áo Thun Cotton 100% Cổ Tròn Nam",
    price: 550000,
    sizes: ["S", "M", "L", "XL"],
    subCategory: "Áo",
  },
  {
    bestseller: false,
    category: "Nam",
    date: 1716646445448,
    description:
      "Áo thun nam form regular, thoải mái cả ngày dài. Cotton combed mềm mịn, thấm hút tốt. Thiết kế đơn giản, dễ phối.",
    image: "p_img32.png",
    name: "Áo Thun Cotton 100% Cổ Tròn Nam",
    price: 625000,
    sizes: ["S", "M", "L", "XL"],
    subCategory: "Áo",
  },
  {
    bestseller: false,
    category: "Trẻ Em",
    date: 1716647545448,
    description:
      "Áo thun bé gái thiết kế đáng yêu, màu sắc tươi tắn. Cotton thấm hút mồ hôi, thoáng khí. Bền đẹp, giữ form tốt.",
    image: "p_img33.png",
    name: "Áo Thun Cotton Cổ Tròn Bé Gái",
    price: 575000,
    sizes: ["S", "M", "L", "XL"],
    subCategory: "Áo",
  },
  {
    bestseller: false,
    category: "Nữ",
    date: 1716648645448,
    description:
      "Áo thun nữ chất cotton cao cấp, form fitted tôn dáng. Thiết kế tối giản, thanh lịch. Phù hợp đi làm và dạo phố.",
    image: "p_img34.png",
    name: "Áo Thun Cotton Cổ Tròn Nữ",
    price: 650000,
    sizes: ["S", "M", "L", "XL"],
    subCategory: "Áo",
  },
  {
    bestseller: false,
    category: "Nữ",
    date: 1716649745448,
    description:
      "Áo khoác nữ chất nỉ bông mềm mại, ấm áp. Khóa kéo YKK bền bỉ. Thiết kế trẻ trung, năng động, dễ phối đồ.",
    image: "p_img35.png",
    name: "Áo Khoác Nữ Dáng Rộng Có Khóa Kéo",
    price: 600000,
    sizes: ["S", "M", "L", "XL"],
    subCategory: "Áo Mùa Đông",
  },
  {
    bestseller: false,
    category: "Nữ",
    date: 1716650845448,
    description:
      "Áo khoác nữ form oversize thời trang. Chất liệu nỉ cao cấp, giữ nhiệt tốt. Phong cách Hàn Quốc hiện đại.",
    image: "p_img36.png",
    name: "Áo Khoác Nữ Dáng Rộng Có Khóa Kéo",
    price: 675000,
    sizes: ["S", "M", "L", "XL"],
    subCategory: "Áo Mùa Đông",
  },
  {
    bestseller: false,
    category: "Nữ",
    date: 1716651945448,
    description:
      "Áo thun nữ premium, chất lượng cao cấp. Cotton mềm mịn như lụa, thoáng mát. Thiết kế sang trọng, tinh tế.",
    image: "p_img37.png",
    name: "Áo Thun Cotton Cổ Tròn Nữ",
    price: 625000,
    sizes: ["S", "M", "L", "XL"],
    subCategory: "Áo",
  },
  {
    bestseller: false,
    category: "Nam",
    date: 1716653045448,
    description:
      "Áo thun nam cao cấp, chất cotton combed 100%. Form regular fit thoải mái. Màu sắc trung tính, dễ phối đồ.",
    image: "p_img38.png",
    name: "Áo Thun Cotton 100% Cổ Tròn Nam",
    price: 700000,
    sizes: ["S", "M", "L", "XL"],
    subCategory: "Áo",
  },
  {
    bestseller: false,
    category: "Nam",
    date: 1716654145448,
    description:
      "Áo sơ mi nam họa tiết in nổi bật, phong cách trẻ trung. Chất cotton thoáng mát, dễ chăm sóc. Phù hợp đi chơi, dự tiệc.",
    image: "p_img39.png",
    name: "Áo Sơ Mi Cotton In Họa Tiết Nam",
    price: 650000,
    sizes: ["S", "M", "L", "XL"],
    subCategory: "Áo",
  },
  {
    bestseller: false,
    category: "Nam",
    date: 1716655245448,
    description:
      "Áo khoác jeans nam slim fit, ôm dáng chuẩn. Chất denim cao cấp, bền màu. Phong cách năng động, cá tính mạnh mẽ.",
    image: "p_img40.png",
    name: "Áo Khoác Jeans Nam Dáng Ôm",
    price: 725000,
    sizes: ["S", "M", "L", "XL"],
    subCategory: "Áo Mùa Đông",
  },
  {
    bestseller: false,
    category: "Nam",
    date: 1716656345448,
    description:
      "Áo thun nam thiết kế basic, dễ mặc. Chất cotton tự nhiên, thân thiện môi trường. Giá cả hợp lý, chất lượng tốt.",
    image: "p_img41.png",
    name: "Áo Thun Cotton 100% Cổ Tròn Nam",
    price: 675000,
    sizes: ["S", "M", "L", "XL"],
    subCategory: "Áo",
  },
  {
    bestseller: false,
    category: "Trẻ Em",
    date: 1716657445448,
    description:
      "Áo thun bé trai chất lượng cao, cotton 100% an toàn. Thiết kế năng động, phù hợp vận động. Màu sắc bền đẹp.",
    image: "p_img42.png",
    name: "Áo Thun Cotton 100% Cổ Tròn Bé Trai",
    price: 750000,
    sizes: ["S", "M", "L", "XL"],
    subCategory: "Áo",
  },
  {
    bestseller: false,
    category: "Trẻ Em",
    date: 1716658545448,
    description:
      "Quần tây bé trai dáng slim fit hiện đại. Chất vải mềm mại, thoáng khí. Phù hợp đi học, dự tiệc gia đình.",
    image: "p_img43.png",
    name: "Quần Tây Trẻ Em Dáng Ôm",
    price: 700000,
    sizes: ["S", "M", "L", "XL"],
    subCategory: "Quần",
  },
  {
    bestseller: false,
    category: "Nữ",
    date: 1716659645448,
    description:
      "Áo khoác nữ dáng rộng trendy, phong cách trẻ. Chất nỉ bông ấm áp, mềm mại. Khóa kéo chắc chắn, bền lâu.",
    image: "p_img44.png",
    name: "Áo Khoác Nữ Dáng Rộng Có Khóa Kéo",
    price: 775000,
    sizes: ["S", "M", "L", "XL"],
    subCategory: "Áo Mùa Đông",
  },
  {
    bestseller: false,
    category: "Nam",
    date: 1716660745448,
    description:
      "Áo khoác jeans nam phong cách streetwear. Chất denim wash nhẹ, mềm mại. Thiết kế túi nhiều ngăn tiện dụng.",
    image: "p_img45.png",
    name: "Áo Khoác Jeans Nam Dáng Ôm",
    price: 725000,
    sizes: ["S", "M", "L", "XL"],
    subCategory: "Áo Mùa Đông",
  },
  {
    bestseller: false,
    category: "Nam",
    date: 1716661845448,
    description:
      "Áo khoác jeans nam thiết kế trẻ trung. Chất denim cao cấp, bền màu. Dáng slim fit ôm dáng, tôn vóc người.",
    image: "p_img46.png",
    name: "Áo Khoác Jeans Nam Dáng Ôm",
    price: 800000,
    sizes: ["S", "M", "L", "XL"],
    subCategory: "Áo Mùa Đông",
  },
  {
    bestseller: false,
    category: "Trẻ Em",
    date: 1716662945448,
    description:
      "Quần tây trẻ em chất lượng cao, giá tốt. Vải kaki co giãn, thoải mái. Thiết kế đơn giản, dễ phối áo.",
    image: "p_img47.png",
    name: "Quần Tây Trẻ Em Dáng Ôm",
    price: 750000,
    sizes: ["S", "M", "L", "XL"],
    subCategory: "Quần",
  },
  {
    bestseller: false,
    category: "Nam",
    date: 1716664045448,
    description:
      "Áo khoác jeans nam cao cấp, chất denim bền đẹp. Dáng ôm hiện đại, tôn dáng. Phong cách mạnh mẽ, cá tính.",
    image: "p_img48.png",
    name: "Áo Khoác Jeans Nam Dáng Ôm",
    price: 825000,
    sizes: ["S", "M", "L", "XL"],
    subCategory: "Áo Mùa Đông",
  },
  {
    bestseller: false,
    category: "Trẻ Em",
    date: 1716665145448,
    description:
      "Quần tây bé trai lịch sự, phù hợp đi học. Vải kaki thoáng mát, ít nhăn. Dáng ôm vừa phải, thoải mái vận động.",
    image: "p_img49.png",
    name: "Quần Tây Trẻ Em Dáng Ôm",
    price: 775000,
    sizes: ["S", "M", "L", "XL"],
    subCategory: "Quần",
  },
  {
    bestseller: false,
    category: "Trẻ Em",
    date: 1716666245448,
    description:
      "Quần tây trẻ em dáng ôm thanh lịch. Chất vải kaki mềm, co giãn nhẹ. Thiết kế túi tiện dụng, phù hợp nhiều dịp.",
    image: "p_img50.png",
    name: "Quần Tây Trẻ Em Dáng Ôm",
    price: 850000,
    sizes: ["S", "M", "L", "XL"],
    subCategory: "Quần",
  },
  {
    bestseller: false,
    category: "Nữ",
    date: 1716667345448,
    description:
      "Áo khoác nữ form rộng thoải mái, phong cách Hàn. Chất nỉ cao cấp, giữ ấm hiệu quả. Túi hai bên tiện lợi.",
    image: "p_img51.png",
    name: "Áo Khoác Nữ Dáng Rộng Có Khóa Kéo",
    price: 800000,
    sizes: ["S", "M", "L", "XL"],
    subCategory: "Áo Mùa Đông",
  },
  {
    bestseller: false,
    category: "Nam",
    date: 1716668445448,
    description:
      "Áo khoác jeans nam premium, chất lượng xuất khẩu. Denim cao cấp, bền màu theo năm tháng. Phong cách nam tính, mạnh mẽ.",
    image: "p_img52.png",
    name: "Áo Khoác Jeans Nam Dáng Ôm",
    price: 875000,
    sizes: ["S", "M", "L", "XL"],
    subCategory: "Áo Mùa Đông",
  },
];

const frontendAssetsPath = path.resolve(__dirname, "../../frontend/src/assets");

const seedProducts = async () => {
  try {
    const count = await productModel.countDocuments();
    if (count === 0) {
      console.log("Đang upload ảnh lên Cloudinary...");

      const uploadPromises = sampleProducts.map(async (product) => {
        const imagePath = path.join(frontendAssetsPath, product.image);
        const cloudinaryUrl = await uploadImageToCloudinary(imagePath);
        return {
          ...product,
          image: [cloudinaryUrl],
        };
      });

      const productsWithCloudinaryImages = await Promise.all(uploadPromises);
      await productModel.insertMany(productsWithCloudinaryImages);
      console.log("Đã thêm dữ liệu mẫu sản phẩm vào database");
    } else {
      console.log(`Database đã có ${count} sản phẩm, bỏ qua seed`);
    }
  } catch (error) {
    console.error("Lỗi khi seed dữ liệu:", error);
  }
};

export default seedProducts;
