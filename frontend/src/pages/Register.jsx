import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.phone || !form.password) {
      toast.warning("Please fill all fields");
      return;
    }

    setLoading(true);
    try {
      const res = await api.post("/auth/register", form);

      
      console.log("Otp send to youre mail successFully 🎉");
      localStorage.setItem("verifyEmail", form.email);
      navigate("/verify");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      
      {/* Glass Card */}
      <div className="w-full max-w-md rounded-2xl bg-white/15 backdrop-blur-xl border border-white/30 shadow-2xl p-8 mx-2">
        
        {/* Heading */}
        <h2 className="text-3xl font-bold text-white text-center mb-1">
          Create Account ✨
        </h2>
        <p className="text-white/80 text-center mb-6">
          Join us and get started
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-lg bg-white/20 text-white placeholder-white/60 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/60"
          />

          <input
            name="email"
            type="email"
            placeholder="Email address"
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-lg bg-white/20 text-white placeholder-white/60 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/60"
          />

          <input
            name="phone"
            placeholder="Phone number"
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-lg bg-white/20 text-white placeholder-white/60 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/60"
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-lg bg-white/20 text-white placeholder-white/60 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/60"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg font-semibold text-indigo-600 bg-white hover:bg-white/90 transition-all duration-300 disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-sm text-white/80 text-center mt-6">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="font-semibold text-white cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
