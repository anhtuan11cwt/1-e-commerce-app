import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Add from "./pages/Add";
import List from "./pages/List";
import Orders from "./pages/Orders";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  if (!token) {
    return (
      <>
        <Login setToken={setToken} />
        <ToastContainer />
      </>
    );
  }

  return (
    <>
      <Navbar setToken={setToken} />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 overflow-auto">
          <Routes>
            <Route element={<Add />} path="/add" />
            <Route element={<List />} path="/list" />
            <Route element={<Orders />} path="/orders" />
          </Routes>
        </main>
      </div>
      <ToastContainer />
    </>
  );
}

export default App;
