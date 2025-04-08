// import { useState } from "react";

// import { Link, useNavigate } from "react-router-dom";
// import user from "../../assets/img/dashboards/usericon.png";
// import at from "../../assets/img/dashboards/at.png";
// import lock from "../../assets/img/dashboards/lock.png";
// import { useAuth } from "../../context/AuthContext";
// import { toast } from "sonner";

// const SignUpForm = () => {
//   const navigate = useNavigate();
//   const { signUp, loading } = useAuth();
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     username: "",
//     email: "",
//     password: "",
//   });

//   const [errors, setErrors] = useState({}); // Store validation errors

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });

//     // Clear the error when the user starts typing in the field
//     setErrors({ ...errors, [e.target.name]: "" });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setErrors({}); // Clear previous errors

//     try {
//       await signUp(formData);

//       toast.success("Signup successful! Redirecting...");
//       navigate("/signin");
//     } catch (error) {
//       if (error.response?.status === 422 && error.response?.data?.error) {
//         setErrors(error.response.data.error); // Set field-specific errors
//       } else if (
//         error.response?.status === 400 ||
//         error.response?.status === 401
//       ) {
//         toast.error(error.response.data.message);
//         console.log("entire error", error);
//       } else if (error.response?.status === 409) {
//         toast.error(error.response.data.message);
//       } else {
//         setErrors({
//           general: "Signup failed. Please check your details and try again.",
//         });
//       }
//     }
//   };

//   return (
//     <section className="w-full h-screen flex flex-col justify-center items-center bg-whitish font-nueue !px-4">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white shadow-xl !p-6 !py-8 rounded-4xl lg:max-w-xl lg:w-2/5 w-full flex flex-col items-center"
//       >
//         <p className="bg-whitish !p-1 !px-4 text-sm rounded-3xl">
//           Let's get you started
//         </p>
//         <h1 className="text-3xl !pt-3">Create an account</h1>
//         <p className="text-gray-400 text-sm !pb-5 !pt-4">
//           Fill in your details and sign up to start exploring
//         </p>
//         {/* <div className="flex !py-6 gap-6">
//           <div className="bg-whitish w-18 h-12 !p-3 !px-4 rounded-xl">
//             <img src={google} alt="" className="w-full h-full object-contain" />
//           </div>
//           <div className="bg-whitish w-18 h-12 !p-3 !px-4 rounded-xl">
//             <img src={fb} alt="" className="w-full h-full object-contain" />
//           </div>
//         </div> */}
//         {/* <p className="!pb-6 text-gray-400">OR</p> */}
//         <div className="w-full lg:!px-10">
//           {Object.keys(formData).map((key) => (
//             <div key={key} className="relative !mb-5">
//               <input
//                 type={key === "password" ? "password" : "text"}
//                 name={key}
//                 placeholder={`Enter your ${key}`}
//                 value={formData[key]}
//                 onChange={handleChange}
//                 className={`w-full !p-3 !pr-10 !pl-5 rounded-full focus:ring-1 ${
//                   errors[key]
//                     ? "focus:ring-red-500 border-red-500"
//                     : "focus:ring-green-tint"
//                 } outline-none bg-gray-100`}
//                 // autoComplete="off"
//               />
//               <img
//                 src={key === "email" ? at : key === "password" ? lock : user}
//                 className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 object-contain"
//               />
//               {errors[key] && (
//                 <p className="text-red-500 text-sm mt-1">{errors[key][0]}</p>
//               )}
//             </div>
//           ))}
//           {errors.general && (
//             <p className="text-red-500 text-center text-sm mb-4">
//               {errors.general}
//             </p>
//           )}
//           <button
//             type="submit"
//             className="w-full bg-green-tint hover:opacity-80 hover:scale-105 text-white !p-3 rounded-full box-shadow !mb-5"
//             disabled={loading}
//           >
//             {loading ? "Signing Up..." : "Sign Up"}
//           </button>
//         </div>
//         <div>
//           <p>
//             Already have an account?{" "}
//             <Link
//               to="/signIn"
//               className="bg-whitish !p-1 border border-gray-300 !px-2 !ml-1 rounded-2xl"
//             >
//               Login
//             </Link>
//           </p>
//         </div>
//       </form>
//     </section>
//   );
// };

// export default SignUpForm;

// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import user from "../../assets/img/dashboards/usericon.png";
// import at from "../../assets/img/dashboards/at.png";
// import lock from "../../assets/img/dashboards/lock.png";
// import { useAuth } from "../../context/AuthContext";
// import { toast } from "sonner";

// const SignUpForm = () => {
//   const navigate = useNavigate();
//   const { signUp, loading } = useAuth();
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     username: "",
//     email: "",
//     password: "",
//   });
//   const [agreeToTerms, setAgreeToTerms] = useState(false);
//   const [passwordVisible, setPasswordVisible] = useState(false);
//   const [errors, setErrors] = useState({}); // Store validation errors

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//     //  setFormData({
//     //    ...formData,
//     //    [name]: value,
//     //  });

//     // Clear the error when the user starts typing in the field
//     setErrors({ ...errors, [e.target.name]: "" });
//   };

//   const handleCheckboxChange = (e) => {
//     setAgreeToTerms(e.target.checked);
//     setErrors({ ...errors, agreeToTerms: "" });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!agreeToTerms) {
//       setErrors({
//         agreeToTerms: "You must agree to the Terms and Conditions.",
//       });
//       return;
//     }

//     setErrors({}); // Clear previous errors

//     try {
//       await signUp(formData);
//       toast.success("Signup successful! Redirecting...");
//       navigate("/signin");
//     } catch (error) {
//       if (error.response?.status === 422 && error.response?.data?.error) {
//         setErrors(error.response.data.error); // Set field-specific errors
//       } else if (
//         error.response?.status === 400 ||
//         error.response?.status === 401
//       ) {
//         toast.error(error.response.data.message);
//       } else if (error.response?.status === 409) {
//         toast.error(error.response.data.message);
//       } else {
//         setErrors({
//           general: "Signup failed. Please check your details and try again.",
//         });
//       }
//     }
//   };

//   return (
//     <section className="w-full min-h-screen flex flex-col justify-center items-center bg-whitish font-nueue !px-4 !py-12">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white shadow-xl !p-6 !py-8 rounded-4xl lg:max-w-xl lg:w-2/5 w-full flex flex-col items-center"
//       >
//         <p className="bg-whitish !p-1 !px-4 text-sm rounded-3xl">
//           Let's get you started
//         </p>
//         <h1 className="text-3xl !pt-3">Create an account</h1>
//         <p className="text-gray-400 text-sm !pb-5 !pt-4">
//           Fill in your details and sign up to start exploring
//         </p>

//         <div className="w-full lg:!px-10">
//           {/* {Object.keys(formData).map((key) => (
//             <div key={key} className="relative !mb-5">
//               <div className="relative flex items-center h-12">
//                 <input
//                   type={
//                     key === "password" && !passwordVisible ? "password" : "text"
//                   } // Toggle between password and text
//                   name={key}
//                   placeholder={`Enter your ${key}`}
//                   value={formData[key]}
//                   onChange={handleChange}
//                   className={`w-full !p-3 !pr-10 !pl-5 rounded-full focus:ring-1 ${
//                     errors[key]
//                       ? "focus:ring-red-500 border-red-500"
//                       : "focus:ring-green-tint"
//                   } outline-none bg-gray-100`} // Ensure the input field has a fixed height
//                 />
//                 <img
//                   src={key === "email" ? at : key === "password" ? lock : user}
//                   className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 object-contain cursor-pointer"
//                   onClick={() => {
//                     if (key === "password") {
//                       setPasswordVisible(!passwordVisible); // Toggle password visibility when the icon is clicked
//                     }
//                   }}
//                 />
//               </div>

//               {errors.agreeToTerms && (
//                 <p className="text-red-500 text-sm mb-3 px-1">
//                   {errors.agreeToTerms}
//                 </p>
//               )}

//               {errors[key] && (
//                 <p className="text-red-500 text-sm mt-1">{errors[key][0]}</p>
//               )}
//             </div>
//           ))} */}
//           {Object.keys(formData).map((key) => (
//             <div key={key} className="relative !mb-5">
//               <div className="relative flex items-center h-12">
//                 <input
//                   type={
//                     key === "password" && !passwordVisible ? "password" : "text"
//                   }
//                   name={key}
//                   placeholder={`Enter your ${key}`}
//                   value={formData[key]}
//                   onChange={handleChange}
//                   className={`w-full !p-3 !pr-10 !pl-5 rounded-full focus:ring-1 ${
//                     errors[key]
//                       ? "focus:ring-red-500 border-red-500"
//                       : "focus:ring-green-tint"
//                   } outline-none bg-gray-100`}
//                 />
//                 <img
//                   src={key === "email" ? at : key === "password" ? lock : user}
//                   className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 object-contain cursor-pointer"
//                   onClick={() => {
//                     if (key === "password") {
//                       setPasswordVisible(!passwordVisible);
//                     }
//                   }}
//                 />
//               </div>

//               {errors[key] && (
//                 <p className="text-red-500 text-sm mt-1">{errors[key][0]}</p>
//               )}
//             </div>
//           ))}

//           {errors.general && (
//             <p className="text-red-500 text-center text-sm mb-4">
//               {errors.general}
//             </p>
//           )}
//           <button
//             type="submit"
//             className="w-full bg-green-tint hover:opacity-80 hover:scale-105 text-white !p-3 rounded-full box-shadow !mb-5"
//             disabled={loading}
//           >
//             {loading ? "Signing Up..." : "Sign Up"}
//           </button>
//         </div>
//         <div className="w-full flex items-start gap-2 mb-5 px-1">
//           <input
//             type="checkbox"
//             name="agreeToTerms"
//             checked={formData.agreeToTerms}
//             onChange={handleChange}
//             className="appearance-none w-5 h-5 border border-gray-300 rounded-sm checked:bg-green-tint checked:border-green-tint checked:after:content-['✓'] checked:after:block checked:after:text-white checked:after:text-sm checked:after:leading-5 text-center"
//           />
//           <label htmlFor="agreeToTerms" className="text-sm text-gray-700">
//             I agree to the{" "}
//             <span className="underline cursor-pointer">
//               Terms and Conditions
//             </span>
//           </label>
//         </div>
//         {errors.agreeToTerms && (
//           <p className="text-red-500 text-sm mb-3 px-1">
//             {errors.agreeToTerms}
//           </p>
//         )}

//         <div>
//           <p>
//             Already have an account?{" "}
//             <Link
//               to="/signIn"
//               className="bg-whitish !p-1 border border-gray-300 !px-2 !ml-1 rounded-2xl"
//             >
//               Login
//             </Link>
//           </p>
//         </div>
//       </form>
//     </section>
//   );
// };

// export default SignUpForm;

import { useState } from "react";
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
  });
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleCheckboxChange = (e) => {
    setAgreeToTerms(e.target.checked);
    setErrors({ ...errors, agreeToTerms: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!agreeToTerms) {
      setErrors({
        ...errors,
        agreeToTerms: "You must agree to the Terms and Conditions.",
      });
      return;
    }

    setErrors({}); // Clear previous errors

    try {
      await signUp(formData);
      toast.success("Signup successful! Redirecting...");
      navigate("/signin");
    } catch (error) {
      if (error.response?.status === 422 && error.response?.data?.error) {
        setErrors(error.response.data.error);
      } else if (
        error.response?.status === 400 ||
        error.response?.status === 401
      ) {
        toast.error(error.response.data.message);
      } else if (error.response?.status === 409) {
        toast.error(error.response.data.message);
      } else {
        setErrors({
          general: "Signup failed. Please check your details and try again.",
        });
      }
    }
  };

  return (
    <section className="w-full min-h-screen flex flex-col justify-center items-center bg-whitish font-nueue !px-4 !py-12">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl !p-6 !py-8 rounded-4xl lg:max-w-xl lg:w-2/5 w-full flex flex-col items-center"
      >
        <p className="bg-whitish !p-1 !px-4 text-sm rounded-3xl">
          Let's get you started
        </p>
        <h1 className="text-3xl !pt-3">Create an account</h1>
        <p className="text-gray-400 text-sm !pb-5 !pt-4">
          Fill in your details and sign up to start exploring
        </p>

        <div className="w-full lg:!px-10">
          {Object.keys(formData).map((key) => (
            <div key={key} className="relative !mb-5">
              <div className="relative flex items-center h-12">
                <input
                  type={
                    key === "password" && !passwordVisible ? "password" : "text"
                  }
                  name={key}
                  placeholder={`Enter your ${key}`}
                  value={formData[key]}
                  onChange={handleChange}
                  className={`w-full !p-3 !pr-10 !pl-5 rounded-full focus:ring-1 ${
                    errors[key]
                      ? "focus:ring-red-500 border-red-500"
                      : "focus:ring-green-tint"
                  } outline-none bg-gray-100`}
                />
                {/* <img
                  src={key === "email" ? at : key === "password" ? lock : user}
                  className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 object-contain cursor-pointer"
                  onClick={() => {
                    if (key === "password") {
                      setPasswordVisible(!passwordVisible);
                    }
                  }}
                /> */}
                <div
                  className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6 object-contain cursor-pointer"
                  onClick={() => setPasswordVisible(!passwordVisible)} // Toggle visibility for password
                >
                  <img
                    src={
                      key === "email" ? at : key === "password" ? lock : user
                    }
                    className="w-full h-full object-contain"
                    alt="lock icon"
                  />
                  {passwordVisible && (
                    <div className="absolute top-2 left-2 w-full h-full border-l-2 border-gray-300 rotate-45"></div> // Slash over the icon
                  )}
                </div>
              </div>

              {errors[key] && (
                <p className="text-red-500 text-sm mt-1">{errors[key][0]}</p>
              )}
            </div>
          ))}

          <div className="w-full flex items-start gap-2 mb-5 px-1">
            <input
              type="checkbox"
              checked={agreeToTerms}
              onChange={handleCheckboxChange}
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
            <p className="text-red-500 text-sm mb-3 px-1">
              {errors.agreeToTerms}
            </p>
          )}

          {errors.agreeToTerms && (
            <p className="text-red-500 text-sm mb-3 px-1">
              {errors.agreeToTerms}
            </p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-tint hover:opacity-80 hover:scale-105 text-white !p-3 rounded-full box-shadow !mb-5"
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>

          {/* General Error */}
          {errors.general && (
            <p className="text-red-500 text-center text-sm mb-4">
              {errors.general}
            </p>
          )}
        </div>

        {/* Link to Sign In */}
        <div>
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
      </form>
    </section>
  );
};

export default SignUpForm;
