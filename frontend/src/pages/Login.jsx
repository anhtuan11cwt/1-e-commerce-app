import { useState } from "react";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div>
      <h1>{isLogin ? "Đăng nhập" : "Đăng ký"}</h1>
      <button onClick={() => setIsLogin(!isLogin)} type="button">
        Chuyển chế độ
      </button>
    </div>
  );
};

export default Login;
