import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token"); // Extract token from URL

  console.log("Extracted Token:", token);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    if (!token) {
      toast.error(
        "No token Found, re-initiate the forgot password process again"
      );
      return;
    }

    try {
      const response = await axios.post(
        "https://backend-5781.onrender.com/api/v1/auth/password/reset",
        {
          token, // Token from URL
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        toast.success("Password reset successful! Redirecting...");
        setTimeout(() => navigate("/signin"), 3000); // Redirect after success
      }
    } catch (error) {
      console.error(
        "Password reset error:",
        error.response?.data || error.message
      );
      setErrors(error.response?.data?.error || {});
      toast.error(error.response?.data?.message || "Failed to reset password.");
      console.log(error.message);

      if (
        error.response?.data ||
        error.message === `Your token has expired!'`
      ) {
        setTimeout(() => {
          navigate("/signin");
        }, 3000);
      }
    }
  };

  return (
    <section className="w-full h-screen flex flex-col justify-center items-center bg-whitish font-nueue !px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl !p-6 !py-8 rounded-4xl lg:max-w-xl lg:w-2/5 w-full flex flex-col items-center"
      >
        <h1 className="text-3xl !pt-3">Reset Password</h1>
        <p className="text-gray-400 text-sm !py-5">
          Enter your new password below.
        </p>

        {/* Password Input */}
        <div className="w-full lg:!px-10">
          <div className="relative !mb-5">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="New Password"
              className="w-full !p-3 rounded-full focus:ring-1 focus:ring-green-tint outline-none bg-gray-100"
              required
            />
          </div>

          {/* Confirm Password Input */}
          <div className="relative !mb-5">
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              className="w-full !p-3 rounded-full focus:ring-1 focus:ring-green-tint outline-none bg-gray-100"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-tint text-white !p-3 rounded-full box-shadow !mb-5"
          >
            Reset Password
          </button>
        </div>
      </form>
    </section>
  );
};

export default ResetPassword;
