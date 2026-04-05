import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ShopContext } from "../context/ShopContext";

const Login = () => {
  const [currentState, setCurrentState] = useState("Login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { setToken, backendURL } = useContext(ShopContext);
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (currentState === "Sign Up") {
        const response = await axios.post(`${backendURL}/api/user/register`, {
          email,
          name,
          password,
        });

        if (response.data.success) {
          toast.success("Đăng ký thành công! Vui lòng đăng nhập.");
          setName("");
          setEmail("");
          setPassword("");
          setCurrentState("Login");
        }
      } else {
        const response = await axios.post(`${backendURL}/api/user/login`, {
          email,
          password,
        });

        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          toast.success("Đăng nhập thành công!");
          setTimeout(() => (window.location.href = "/"), 1000);
        }
      }
    } catch (error) {
      const message = error.response?.data?.message || "Đã xảy ra lỗi";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <form
      className="flex flex-col items-center gap-4 m-auto mt-14 w-[90%] sm:max-w-96 text-gray-800"
      onSubmit={onSubmitHandler}
    >
      <div className="inline-flex items-center gap-2 mt-10 mb-2">
        <p className="text-3xl prata-regular">
          {currentState === "Login" ? "Đăng nhập" : "Đăng ký"}
        </p>
        <hr className="bg-gray-800 border-none w-8 h-[1.5px]" />
      </div>

      {currentState === "Sign Up" && (
        <input
          className="px-3 py-2 border border-gray-800 outline-none w-full"
          onChange={(e) => setName(e.target.value)}
          placeholder="Họ và tên"
          required
          type="text"
          value={name}
        />
      )}

      <input
        className="px-3 py-2 border border-gray-800 outline-none w-full"
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
        type="email"
        value={email}
      />

      <div className="relative w-full">
        <input
          className="px-3 py-2 pr-10 border border-gray-800 outline-none w-full"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Mật khẩu"
          required
          type={showPassword ? "text" : "password"}
          value={password}
        />
        <button
          aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
          className="top-1/2 right-3 absolute bg-transparent p-0 border-none -translate-y-1/2 cursor-pointer"
          onClick={() => setShowPassword(!showPassword)}
          type="button"
        >
          {showPassword ? (
            <EyeOff className="w-5 h-5 text-gray-500" />
          ) : (
            <Eye className="w-5 h-5 text-gray-500" />
          )}
        </button>
      </div>

      <div className="flex justify-between -mt-2 w-full text-sm">
        {currentState === "Login" && (
          <button
            className="bg-transparent p-0 border-none text-left hover:underline cursor-pointer"
            onClick={() => navigate("/forgot-password")}
            type="button"
          >
            Quên mật khẩu?
          </button>
        )}
      </div>

      <button
        className="bg-black hover:bg-gray-800 disabled:opacity-50 px-4 py-3 w-full font-medium text-white transition disabled:cursor-not-allowed"
        disabled={loading}
        type="submit"
      >
        {loading
          ? "Đang xử lý..."
          : currentState === "Login"
            ? "Đăng nhập"
            : "Đăng ký"}
      </button>

      <div className="flex justify-center gap-2 mt-4 w-full text-gray-700 text-sm">
        <p>
          {currentState === "Login"
            ? "Chưa có tài khoản? "
            : "Đã có tài khoản? "}
          <button
            className="bg-transparent p-0 border-none font-medium text-black hover:underline cursor-pointer"
            onClick={() => {
              setCurrentState(currentState === "Login" ? "Sign Up" : "Login");
              setName("");
              setEmail("");
              setPassword("");
            }}
            type="button"
          >
            {currentState === "Login" ? "Tạo tài khoản" : "Đăng nhập ngay"}
          </button>
        </p>
      </div>
    </form>
  );
};

export default Login;
