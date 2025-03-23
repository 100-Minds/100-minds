import { useState, useRef, useEffect } from "react";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"; // Import navigation hook
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../context/AuthContext";

export default function OTPPage() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const { verifyOtp, loading } = useAuth();
  const navigate = useNavigate(); // Initialize navigation

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (index, value) => {
    if (!isNaN(value) && value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async () => {
    const otpCode = otp.join(""); // Convert array to a single string
    if (otpCode.length !== 6) {
      toast.error("Please enter all 6 digits of the OTP.");
      return;
    }

    try {
      await verifyOtp(otpCode);
      toast.success("OTP verified successfully!");
      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "OTP verification failed!";

      if (errorMessage.includes("Invalid or expired OTP")) {
        toast.error("OTP expired. Please sign in again to receive a new OTP.");
        setTimeout(() => navigate("/signin"), 2000); // Redirect after 2 seconds
      } else {
        toast.error(errorMessage);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 !p-6 font-nueue">
      <div className="bg-white !p-6 !py-12 rounded-4xl shadow-2xl w-full max-w-md text-center">
        <span className="text-xs bg-whitish !p-2 !px-6 rounded-2xl">
          Let&apos;s get you started
        </span>
        <p className="text-gray-600 text-2xl !my-4">Fill in the 6-digit code</p>
        <p className="text-gray-500 text-sm">We sent a code to your email</p>
        <div className="flex justify-center gap-2 !my-4">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              ref={(el) => (inputRefs.current[index] = el)}
              className="w-12 h-12 text-center text-lg font-semibold outline-none bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-tint"
            />
          ))}
        </div>
        <button
          onClick={handleSubmit}
          className="w-2/3 !my-6 bg-green-tint text-white !py-2 rounded-full hover:scale-105 transition"
          disabled={loading}
        >
          {loading ? "Verifying..." : "Continue"}
        </button>
        <div className="!mt-4 text-sm flex justify-center items-center gap-1">
          <p className="text-gray-600">Didn&apos;t get the code?</p>
          <button className="border border-gray-200 !p-1 !px-4 transition hover:bg-green-tint hover:text-white hover:border-none rounded-2xl">
            Resend
          </button>
        </div>
      </div>
    </div>
  );
}
