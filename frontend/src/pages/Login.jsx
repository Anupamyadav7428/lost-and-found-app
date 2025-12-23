import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useAuth from "../context/useAuth";
import api from "../api/axios";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/auth/login", form);
      login(res.data);
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      
      {/* Glass Card */}
      <div className="w-full max-w-md rounded-2xl bg-white/15 backdrop-blur-xl border border-white/30 shadow-2xl p-8 mx-2">
        
        {/* Heading */}
        <h2 className="text-3xl font-bold text-white text-center mb-1">
         Lost & Found
        </h2>
        <p className="text-white/80 text-center mb-6">
          Sign in to your account
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-white/80 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 rounded-lg bg-white/20 text-white placeholder-white/60 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/60"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-white/80 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 rounded-lg bg-white/20 text-white placeholder-white/60 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/60"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg font-semibold text-indigo-600 bg-white hover:bg-white/90 transition-all duration-300 disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-sm text-white/80 text-center mt-6">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="font-semibold text-white cursor-pointer hover:underline"
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
