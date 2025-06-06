import { useState } from "react";
import { useAuth } from "../../context/AuthContext"; // Import Auth context
import at from "../../assets/img/dashboards/at.png";
import lock from "../../assets/img/dashboards/lock.png";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const SignInForm = () => {
  const { signIn, loading } = useAuth(); // Get signIn function from Auth context
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signIn(formData);
      toast.success("Sign-in successful! Redirecting to OTP verification...");
      setTimeout(() => {
        navigate("/otp");
      }, 3000);
    } catch (error) {
      console.error("Signin failed:", error);

      if (error.response?.data) {
        setErrors(error.response.data.error);
        if (error.response.data.message) {
          toast.error(error.response.data.message);
        }
      } else {
        setErrors({
          general: "SignIn failed. Please check your details and try again.",
        });
        toast.error("SignIn failed. Please check your details and try again.");
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
          Keep up the great work
        </p>
        <h1 className="text-3xl !pt-3">Log in to your account</h1>
        <p className="text-gray-400 text-sm !py-5">
          Fill in your details to pick up where you left off
        </p>

        <div className="w-full lg:!px-10">
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
              className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 object-contain"
            />
          </div>

          <div className="relative !mb-5">
            <input
              type={passwordVisible ? "text" : "password"} // Toggle password type
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full !p-3 !pr-10 !pl-5 rounded-full focus:ring-2 focus:ring-green-tint outline-none bg-gray-100"
              autoComplete="off"
              required
            />
            <div
              className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6 object-contain cursor-pointer"
              onClick={() => setPasswordVisible(!passwordVisible)} // Toggle visibility for password
            >
              <img
                src={lock}
                className="w-full h-full object-contain"
                alt="lock icon"
              />
              {passwordVisible && (
                <div className="absolute top-2 left-2 w-full h-full border-l-2 border-gray-300 rotate-45"></div> // Slash over the icon
              )}
            </div>
          </div>

          <div className="flex justify-end !pb-4 text-green-tint">
            <Link to={"/forgot-password"}>Forgot Password?</Link>
          </div>
          <button
            type="submit"
            className="w-full bg-green-tint hover:opacity-80 hover:scale-105 transition text-white !p-3 rounded-full box-shadow !mb-5"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>
        <div>
          <p>
            Don&lsquo;t have an account?
            <Link
              to="/signup"
              className="bg-whitish !p-1 border border-gray-300 !px-2 !ml-1 rounded-2xl"
            >
              Signup
            </Link>
          </p>
        </div>
      </form>
    </section>
  );
};

export default SignInForm;
