import { useContext } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext);

  const formatPrice = (value) => {
    return value.toLocaleString("vi-VN");
  };

  return (
    <Link className="text-gray-700 cursor-pointer" to={`/product/${id}`}>
      <div className="overflow-hidden">
        <img
          alt={name}
          className="hover:scale-110 transition ease-in-out duration-300"
          src={image[0]}
        />
      </div>
      <p className="pt-3 pb-1 text-sm">{name}</p>
      <p className="text-sm font-medium">
        {formatPrice(price)}
        {currency}
      </p>
    </Link>
  );
};

export default ProductItem;
