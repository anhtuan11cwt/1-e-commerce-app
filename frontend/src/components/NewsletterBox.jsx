import { useState } from "react";

const NewsletterBox = () => {
  const [email, setEmail] = useState("");

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (!email) {
      return;
    }

    console.log("Subscribed:", email);
    setEmail("");
  };

  return (
    <div className="text-center my-20">
      <p className="text-2xl font-medium text-gray-800">
        Đăng ký ngay và nhận giảm 20%
      </p>

      <p className="text-gray-400 mt-3">
        Cập nhật những ưu đãi mới nhất từ chúng tôi
      </p>

      <form
        className="w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3"
        onSubmit={onSubmitHandler}
      >
        <input
          className="w-full sm:flex-1 outline-none"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Nhập email của bạn"
          required
          type="email"
          value={email}
        />

        <button
          className="bg-black text-white px-6 py-3 text-xs uppercase"
          type="submit"
        >
          Đăng ký
        </button>
      </form>
    </div>
  );
};

export default NewsletterBox;
