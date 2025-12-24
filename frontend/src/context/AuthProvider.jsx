import { useEffect, useState } from "react";
import AuthContext from "./auth.context";
import api from "../api/axios";
import toast from "react-hot-toast";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // ✅ NEW STATE
  // Load token from localStorage on refresh
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      // setIsLoggedIn(true);
    } else {
      setLoading(false);

    }
  }, []);
  useEffect(() => {
    const loadUser = async () => {
      if (!token) {
        console.log(token);
        setLoading(false);
        return;
      }

      try {
        const res = await api.get("/user/profile");
        setUser(res.data.user);
        setIsLoggedIn(true);
      } catch {
        toast.error(
          err?.response?.data?.message || "Session expired. Please login again."
        );
        logout();
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [token]);



  const login = (data) => {
    localStorage.setItem("token", data.token);

    setToken(data.token);
    setUser(data.user);
    setIsLoggedIn(true);
    toast.success("Logged in successfully");
    setTimeout(() => {
      toast.success(`Welcome ${data.user.name}`);
    }, 1000);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    setIsLoggedIn(false);
    toast("Logged out", { icon: "👋" });
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
