import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const Verify = () => {
    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const email=localStorage.getItem("verifyEmail");

    const handleChange = (e) => {
        setOtp(e.target.value);
    }
    const handleSubmit=async(e)=>{
        e.preventDefault();
        setLoading(true);
        try{
            const res=await api.post("/verify/email", {email, otp});
            alert(res.data.message);
            localStorage.removeItem("verifyEmail");
            navigate("/login")
        }
        catch(err){
            alert(err.response?.data?.message || "Invalid Otp");
        }
        finally{
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-900">
            <div className="w-full max-w-md rounded-2xl bg-white/15 backdrop-blur-xl border border-white/30 shadow-2xl p-8 mx-2">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <h2 className="text-2xl font-bold mb-4 text-center text-white">Verify Otp </h2>

                    <input type="text" name="otp" placeholder="Enter Otp here" onChange={handleChange} className="w-full px-4 py-2.5 rounded-lg bg-white/20 text-white placeholder-white/60 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/60" />
                    <button type="submit" className="w-full py-3 rounded-lg font-semibold text-indigo-600 bg-white hover:bg-white/90 transition-all duration-300 disabled:opacity-60" disabled={loading} >{loading ? "Verifying....": "Verify OTP" }</button>
                </form>
            </div>

        </div>
    )
}

export default Verify;