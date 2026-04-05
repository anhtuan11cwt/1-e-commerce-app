import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("admin@forever.com");
  const [password, setPassword] = useState("admin123");
  const [showPassword, setShowPassword] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL;
      const response = await axios.post(`${backendUrl}/api/user/admin`, {
        email,
        password,
      });

      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        setToken(response.data.token);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <form
      className="flex flex-col gap-4 w-80 m-auto mt-40 p-8 rounded-lg shadow-lg bg-white"
      onSubmit={onSubmitHandler}
    >
      <h2 className="text-2xl font-bold text-center mb-4">
        Đăng Nhập Quản Trị
      </h2>
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="email">
          Email
        </label>
        <input
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Nhập email"
          required
          type="email"
          value={email}
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="password">
          Mật khẩu
        </label>
        <div className="relative">
          <input
            className="w-full border border-gray-300 rounded px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-black"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Nhập mật khẩu"
            required
            type={showPassword ? "text" : "password"}
            value={password}
          />
          <button
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              setShowPassword(!showPassword);
            }}
            type="button"
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
      <button
        className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition-colors"
        type="submit"
      >
        Đăng Nhập
      </button>
    </form>
  );
};

export default Login;
