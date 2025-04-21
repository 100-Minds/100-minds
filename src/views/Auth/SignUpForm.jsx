import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import user from "../../assets/img/dashboards/usericon.png";
import at from "../../assets/img/dashboards/at.png";
import lock from "../../assets/img/dashboards/lock.png";
import { useAuth } from "../../context/AuthContext";
import { toast } from "sonner";

const SignUpForm = () => {
  const navigate = useNavigate();
  const { signUp, loading } = useAuth();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    accountType: "personal",
    organizationName: "",
    organizationWebsite: "",
    organizationDescription: "",
    organizationLogo: null,
  });

  const [logoPreview, setLogoPreview] = useState(null);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [errors, setErrors] = useState({});
  const [showDropdown, setShowDropdown] = useState(false);

  // const handleChange = (e) => {
  //   const { name, value, files } = e.target;

  //   if (name === "organizationLogo" && files && files[0]) {
  //     const file = files[0];

  //     setFormData((prev) => ({
  //       ...prev,
  //       organizationLogo: file.name, // 👈 Just the name of the file
  //     }));

  //     setLogoPreview(URL.createObjectURL(file)); // optional preview
  //   } else {
  //     setFormData((prev) => ({
  //       ...prev,
  //       [name]: value,
  //     }));
  //   }
  // };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "organizationLogo" && files && files[0]) {
      const file = files[0];

      // Store the actual File object
      setFormData((prev) => ({
        ...prev,
        organizationLogo: file,
      }));

      // Still create a preview URL
      setLogoPreview(URL.createObjectURL(file));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  const handleCheckboxChange = (e) => {
    setAgreeToTerms(e.target.checked);
    setErrors({ ...errors, agreeToTerms: "" });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   if (!agreeToTerms) {
  //     setErrors({
  //       ...errors,
  //       agreeToTerms: "You must agree to the Terms and Conditions.",
  //     });
  //     return;
  //   }

  //   const formPayload = new FormData();
  //   Object.entries(formData).forEach(([key, value]) => {
  //     if (
  //       formData.accountType === "organization" ||
  //       ![
  //         "organizationName",
  //         "organizationWebsite",
  //         "organizationDescription",
  //         "organizationLogo",
  //       ].includes(key)
  //     ) {
  //       if (key === "organizationLogo" && value) {
  //         formPayload.append(key, value);
  //       } else {
  //         formPayload.append(key, value);
  //       }
  //     }
  //   });

  //   try {
  //     await signUp(formPayload); // signUp must handle multipart/form-data
  //     toast.success("Signup successful! Redirecting...");
  //     navigate("/signin");
  //   } catch (error) {
  //     if (error.response?.status === 422 && error.response?.data?.error) {
  //       setErrors(error.response.data.error);
  //     } else if (
  //       error.response?.status === 400 ||
  //       error.response?.status === 401 ||
  //       error.response?.status === 409
  //     ) {
  //       toast.error(error.response.data.message);
  //     } else {
  //       setErrors({
  //         general: "Signup failed. Please check your details and try again.",
  //       });
  //     }
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!agreeToTerms) {
      setErrors({
        ...errors,
        agreeToTerms: "You must agree to the Terms and Conditions.",
      });
      return;
    }

    // Create a new FormData object
    const formPayload = new FormData();

    // Append all text fields
    for (const key in formData) {
      // Skip organization fields if account type is personal
      if (
        formData.accountType === "personal" &&
        [
          "organizationName",
          "organizationWebsite",
          "organizationDescription",
          "organizationLogo",
        ].includes(key)
      ) {
        continue;
      }

      // Special handling for file upload
      if (key === "organizationLogo" && formData[key] instanceof File) {
        formPayload.append(key, formData[key], formData[key].name);
      }
      // Skip null or undefined values
      else if (formData[key] !== null && formData[key] !== undefined) {
        formPayload.append(key, formData[key]);
      }
    }

    try {
      // Check the payload before sending (for debugging)
      console.log("Form payload contents:");
      for (let pair of formPayload.entries()) {
        console.log(
          pair[0] + ": " + (pair[1] instanceof File ? "File object" : pair[1])
        );
      }

      await signUp(formPayload);
      toast.success("Signup successful! Redirecting...");
      navigate("/signin");
    } catch (error) {
      console.error("Signup error:", error.response?.data || error);

      if (error.response?.status === 422 && error.response?.data?.error) {
        setErrors(error.response.data.error);
      } else if (
        error.response?.status === 400 ||
        error.response?.status === 401 ||
        error.response?.status === 409
      ) {
        toast.error(error.response.data.message);
      } else {
        setErrors({
          general: "Signup failed. Please check your details and try again.",
        });
      }
    }
  };
  const getIcon = (key) => {
    if (key === "email") return at;
    if (key === "password") return lock;
    return user;
  };

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <section className="w-full min-h-screen flex flex-col justify-center items-center bg-whitish font-nueue px-4 py-12">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl p-6 py-8 rounded-4xl lg:max-w-xl lg:w-2/5 w-full flex flex-col items-center"
        encType="multipart/form-data"
      >
        <p className="bg-whitish !p-1 !px-4 text-sm rounded-3xl">
          Let's get you started{" "}
        </p>
        <h1 className="text-3xl !pt-3">Create an account</h1>{" "}
        <p className="text-gray-400 text-sm !pb-5 !pt-4">
          Fill in your details and sign up to start exploring{" "}
        </p>
        <div className="w-full lg:px-10">
          {["firstName", "lastName", "username", "email", "password"].map(
            (key) => (
              <div key={key} className="relative mb-5">
                <div className="relative flex items-center h-12">
                  <input
                    type={
                      key === "password" && !passwordVisible
                        ? "password"
                        : "text"
                    }
                    name={key}
                    placeholder={`Enter your ${key}`}
                    value={formData[key]}
                    onChange={handleChange}
                    autoComplete=""
                    className={`w-full p-3 pr-10 pl-5 rounded-full focus:ring-1 ${
                      errors[key]
                        ? "focus:ring-red-500 border-red-500"
                        : "focus:ring-green-tint"
                    } outline-none bg-gray-100`}
                  />
                  <div
                    className={`absolute right-5 top-1/2 transform -translate-y-1/2 ${
                      key === "password" ? "cursor-pointer" : ""
                    }`}
                    onClick={() =>
                      key === "password" && setPasswordVisible(!passwordVisible)
                    }
                  >
                    <img src={getIcon(key)} className="w-6 h-6" alt="icon" />
                  </div>
                </div>
                {errors[key] && (
                  <p className="text-red-500 text-sm mt-1">{errors[key]}</p>
                )}
              </div>
            )
          )}
          <div className="mb-5 relative" ref={dropdownRef}>
            <label className="block text-sm mb-2">Account Type</label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowDropdown((prev) => !prev)}
                className="w-full text-left p-3 pl-5 pr-10 bg-gray-100 rounded-full border border-gray-200 hover:border-gray-300 focus:ring-2 focus:ring-green-tint transition"
              >
                {formData.accountType === "personal"
                  ? "Personal"
                  : "Organization"}
                <svg
                  className="w-4 h-4 absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {showDropdown && (
                <ul className="absolute z-10 mt-2 w-full bg-white rounded-xl shadow-lg border border-gray-100">
                  {["personal", "organization"].map((option) => (
                    <li
                      key={option}
                      onClick={() => {
                        setFormData((prev) => ({
                          ...prev,
                          accountType: option,
                        }));
                        setShowDropdown(false);
                      }}
                      className={`px-4 py-3 cursor-pointer text-sm hover:bg-green-50 ${
                        formData.accountType === option
                          ? "bg-green-100 font-medium"
                          : ""
                      }`}
                    >
                      {option === "personal" ? "Personal" : "Organization"}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {formData.accountType === "organization" && (
            <>
              <div className="mb-5">
                <input
                  type="text"
                  name="organizationName"
                  placeholder="Organization Name *"
                  value={formData.organizationName}
                  onChange={handleChange}
                  className="w-full p-3 rounded-full bg-gray-100"
                  required
                />
              </div>
              <div className="mb-5">
                <input
                  type="url"
                  name="organizationWebsite"
                  placeholder="Organization Website (optional)"
                  value={formData.organizationWebsite}
                  onChange={handleChange}
                  className="w-full p-3 rounded-full bg-gray-100"
                />
              </div>
              <div className="mb-5">
                <textarea
                  name="organizationDescription"
                  placeholder="Description (optional)"
                  value={formData.organizationDescription}
                  onChange={handleChange}
                  className="w-full p-3 rounded-2xl bg-gray-100"
                />
              </div>
              <div className="mb-5">
                <label className="block text-sm font-medium mb-2">
                  Upload Logo
                </label>
                <div className="relative w-full">
                  <label
                    htmlFor="organizationLogo"
                    className="flex flex-col items-center justify-center p-5 border-2 border-dashed rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition"
                  >
                    {logoPreview ? (
                      <img
                        src={logoPreview}
                        alt="Logo Preview"
                        className="w-20 h-20 object-cover rounded-full mb-2"
                      />
                    ) : (
                      <>
                        <span className="text-gray-500 text-sm">
                          Click to upload
                        </span>
                        <span className="text-xs text-gray-400">
                          PNG, JPG, JPEG up to 2MB
                        </span>
                      </>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      id="organizationLogo"
                      name="organizationLogo"
                      onChange={handleChange}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            </>
          )}
          <div className="w-full flex items-start gap-2  px-1">
            <input
              type="checkbox"
              checked={agreeToTerms}
              onChange={handleCheckboxChange}
              id="agreeToTerms"
              className="appearance-none w-8 h-4 border border-gray-300 rounded-sm
      checked:bg-green-tint checked:border-green-tint
      checked:after:content-['✓'] checked:after:block
      checked:after:text-white checked:after:text-sm
      checked:after:leading-5 checked:after:mt-[-2px]
      text-center"
            />
            <label htmlFor="agreeToTerms" className="text-xs text-gray-700">
              I understand and agree to 100 Minds’ Privacy & Data Use Policy. I
              consent to the use of my learning data for platform
              personalization and improvement.{" "}
              <Link to={"/terms"} className="underline cursor-pointer">
                Read full policy
              </Link>
            </label>
          </div>
          {errors.agreeToTerms && (
            <p className="text-red-500 text-sm mb-3">{errors.agreeToTerms}</p>
          )}
          {errors.general && (
            <p className="text-red-500 text-sm mb-3">{errors.general}</p>
          )}
          <button
            type="submit"
            className="bg-primary text-white rounded-full  px-8 w-full hover:opacity-90 transition-opacity"
            disabled={loading}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-tint hover:opacity-80 transition text-white !p-3 rounded-full box-shadow !mb-5"
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>

          {/* Link to Sign In */}
          <div className="w-full flex justify-center">
            <p>
              Already have an account?{" "}
              <Link
                to="/signIn"
                className="bg-whitish !p-1 border border-gray-300 !px-2 !ml-1 rounded-2xl"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </form>
    </section>
  );
};

export default SignUpForm;
