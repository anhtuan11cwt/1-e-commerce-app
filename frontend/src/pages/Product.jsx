import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import ProductItem from "../components/ProductItem";
import Title from "../components/Title";
import { ShopContext } from "../context/ShopContext";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);

  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");

  useEffect(() => {
    const product = products.find((item) => item._id === productId);
    if (product) {
      setProductData(product);
      setImage(product.image[0]);
    }
  }, [productId, products]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!productData) {
    return null;
  }

  return (
    <div className="border-t pt-10 transition-opacity duration-300">
      <div className="flex flex-col sm:flex-row gap-12">
        <div className="flex flex-col-reverse sm:flex-row gap-6 flex-1">
          <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-visible sm:w-[18.7%] w-full">
            {productData.image.map((item, idx) => {
              const thumbKey =
                typeof item === "string"
                  ? item.split("/").pop()
                  : `thumb-${idx}`;
              return (
                <button
                  aria-label={`Xem hình ảnh ${idx + 1}`}
                  className="w-full sm:w-full sm:h-24 cursor-pointer border-2 transition-all"
                  key={thumbKey}
                  onClick={() => setImage(item)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      setImage(item);
                    }
                  }}
                  style={{
                    borderColor: image === item ? "#6b7280" : "transparent",
                  }}
                  type="button"
                >
                  <img
                    alt={`Thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover"
                    src={item}
                  />
                </button>
              );
            })}
          </div>
          <div className="w-full sm:w-[81.3%]">
            <img
              alt={productData.name}
              className="w-full h-auto object-cover"
              src={image}
            />
          </div>
        </div>

        <div className="flex-1">
          <h1 className="text-2xl sm:text-3xl font-medium">
            {productData.name}
          </h1>
          <div className="flex items-center gap-1 mt-3">
            <img alt="Star" className="w-4 h-4" src={assets.star_icon} />
            <img alt="Star" className="w-4 h-4" src={assets.star_icon} />
            <img alt="Star" className="w-4 h-4" src={assets.star_icon} />
            <img alt="Star" className="w-4 h-4" src={assets.star_icon} />
            <img alt="Star" className="w-4 h-4" src={assets.star_dull_icon} />
            <p className="pl-2 text-gray-500 text-sm">(122)</p>
          </div>

          <p className="mt-5 text-3xl font-medium">
            {productData.price.toLocaleString("vi-VN")} {currency}
          </p>

          <p className="mt-5 text-gray-500 md:w-4/5">
            {productData.description}
          </p>

          <div className="flex flex-col gap-4 my-8">
            <p className="font-medium">Chọn kích thước</p>
            <div className="flex flex-wrap gap-2">
              {productData.sizes.map((item) => (
                <button
                  className={`border px-4 py-2 text-sm transition-all ${
                    item === size
                      ? "border-gray-900 bg-gray-900 text-white"
                      : "border-gray-300 hover:border-gray-900"
                  }`}
                  key={item}
                  onClick={() => setSize(item)}
                  type="button"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <button
            className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700 transition-colors"
            onClick={() => addToCart(productData._id, size)}
            type="button"
          >
            THÊM VÀO GIỎ
          </button>

          <div className="mt-8 pt-8 border-t text-sm text-gray-500">
            <p>• Sản phẩm được kiểm tra chất lượng trước khi giao hàng</p>
            <p>• Miễn phí đổi trả trong 7 ngày</p>
            <p>• Giao hàng toàn quốc từ 2-5 ngày làm việc</p>
          </div>
        </div>
      </div>

      <div className="mt-24">
        <div className="flex">
          <b className="border border-b-0 border-gray-300 px-8 py-3 text-sm">
            Mô tả
          </b>
          <p className="border border-b-0 border-gray-300 bg-gray-50 px-8 py-3 text-sm text-gray-600">
            Đánh giá (122)
          </p>
        </div>
        <div className="border p-6 text-sm text-gray-500 flex flex-col gap-4 leading-relaxed">
          <p>
            Chất liệu cao cấp, thiết kế tinh tế và phong cách hiện đại là những
            điểm nổi bật của sản phẩm này. Với mục tiêu mang đến cho khách hàng
            những trải nghiệm mua sắm tốt nhất, chúng tôi cam kết cung cấp sản
            phẩm chính hãng với chất lượng đảm bảo.
          </p>
          <p>
            Sản phẩm được làm từ chất liệu an toàn, thân thiện với da và dễ dàng
            vệ sinh. Đường may tỉ mỉ, sắc nét mang đến sự thoải mái khi mặc. Phù
            hợp với nhiều hoàn cảnh từ đi làm, đi học đến dạo phố hay các buổi
            gặp gỡ bạn bè.
          </p>
        </div>
      </div>

      <div className="mt-24">
        <Title text1={"SẢN PHẨM"} text2={"LIÊN QUAN"} />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {products
            .filter(
              (item) =>
                item.category === productData.category &&
                item._id !== productData._id,
            )
            .slice(0, 5)
            .map((item, index) => (
              <ProductItem
                id={item._id}
                image={item.image}
                key={item._id || `related-${index}`}
                name={item.name}
                price={item.price}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Product;
