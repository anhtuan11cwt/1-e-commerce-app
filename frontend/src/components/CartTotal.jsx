import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";

const CartTotal = () => {
  const { currency, deliveryFee, getCartAmount } = useContext(ShopContext);

  const subtotal = getCartAmount();

  return (
    <div className="w-full max-w-md ml-auto">
      <div>
        <Title text1={"TỔNG"} text2={"TIỀN"} />
      </div>

      <div className="flex flex-col gap-3 mt-2 text-sm">
        <div className="flex justify-between">
          <p className="text-gray-600">Tạm tính</p>
          <p className="text-gray-900">
            {subtotal.toLocaleString("vi-VN")} {currency}
          </p>
        </div>

        <div className="flex justify-between">
          <p className="text-gray-600">Phí vận chuyển</p>
          <p className="text-gray-900">
            {subtotal === 0 ? 0 : deliveryFee.toLocaleString("vi-VN")}{" "}
            {currency}
          </p>
        </div>

        <div className="border-t border-gray-200 pt-3 flex justify-between">
          <p className="text-base font-medium text-gray-900">Tổng cộng</p>
          <p className="text-base font-medium text-gray-900">
            {subtotal === 0
              ? 0
              : (subtotal + deliveryFee).toLocaleString("vi-VN")}{" "}
            {currency}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
