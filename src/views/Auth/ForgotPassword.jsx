import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import at from "../../assets/img/dashboards/at.png";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const { forgotPassword, loading } = useAuth(); // Get forgotPassword function from Auth context
  // const [email, setEmail] = useState("");
  const [formData, setFormData] = useState({ email: "" });
  const [errors, setErrors] = useState({});
  const handleChange = (e) => {
    setFormData((prev) => {
      const updatedFormData = { ...prev, [e.target.name]: e.target.value };
      console.log("Updated FormData:", updatedFormData); // Debugging
      return updatedFormData;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Submitting FormData:", formData); // Debugging

    if (!formData.email.trim()) {
      toast.error("Email is required.");
      return;
    }

    try {
      const response = await forgotPassword(formData);
      console.log(response);

      // Check if response was successful before showing toast
      if (response?.success) {
        toast.success("Password reset email sent successfully!");
      }
    } catch (error) {
      console.error("Password reset failed:", error);

      if (error.response?.data) {
        setErrors(error.response.data.error);
        if (error.response.data.message) {
          toast.error(error.response.data.message);
        }
      } else {
        setErrors({ general: "Failed to send reset email. Please try again." });
        toast.error("Failed to send reset email. Please try again.");
      }
    }
  };

  return (
    <section className="w-full h-screen flex flex-col justify-center items-center bg-whitish font-nueue !px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl !p-6 !py-8 rounded-4xl lg:max-w-xl lg:w-2/5 w-full flex flex-col items-center"
      >
        <p className="bg-whitish !p-1 !px-4 text-sm rounded-3xl">
          Reset your password
        </p>
        <h1 className="text-3xl !pt-3">Forgot Password</h1>
        <p className="text-gray-400 text-sm !py-5">
          Enter your email address and we will send you a password reset link.
        </p>
        <div className="w-full lg:!px-10">
          {/* Email Input */}
          <div className="relative !mb-5">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full !p-3 !pr-10 !pl-5 rounded-full focus:ring-1 focus:ring-green-tint outline-none bg-gray-100"
              autoComplete="off"
              required
            />
            <img
              src={at}
              className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 object-contain"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-tint text-white !p-3 rounded-full box-shadow !mb-5"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </div>
        <div>
          <p>
            Remember your password?
            <Link
              to="/signin"
              className="bg-whitish !p-1 border border-gray-300 !px-2 !ml-1 rounded-2xl"
            >
              Sign in
            </Link>
          </p>
        </div>
      </form>
    </section>
  );
};

export default ForgotPassword;
