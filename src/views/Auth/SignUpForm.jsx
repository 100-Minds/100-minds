// import { section } from "framer-motion/client";
// import React, { useState } from "react";
// import google from "../../assets/img/dashboards/google.png";
// import fb from "../../assets/img/dashboards/facebook.png";
// import user from "../../assets/img/dashboards/usericon.png";

// import at from "../../assets/img/dashboards/at.png";

// import lock from "../../assets/img/dashboards/lock.png";
// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";
// import { toast } from "react-toastify";

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

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const success = await signUp(formData);
//       console.log("success", success);
//       toast.success("Signup successful! Redirecting...");
//       navigate("/dashboard");
//     } catch (error) {
//       console.log(error);
//       toast.error(error.message);
//     }
//   };

//   return (
//     <section className="w-full h-screen flex flex-col justify-center items-center bg-whitish font-nueue !px-4">
//       <form
//         action=""
//         onSubmit={handleSubmit}
//         className="bg-white  shadow-xl !p-6 !py-8 rounded-4xl lg:max-w-xl lg:w-2/5  w-full  flex flex-col items-center"
//       >
//         <p className="bg-whitish !p-1 !px-4 text-sm rounded-3xl">
//           Lets get you started
//         </p>
//         <h1 className="text-3xl !pt-3">Create an account</h1>
//         <p className="text-gray-400 text-sm">
//           Fill in your details and sign up to start exploring
//         </p>
//         <div className="flex !py-6 gap-6 ">
//           <div className="bg-whitish w-18 h-12 !p-3 !px-4 rounded-xl">
//             <img
//               src={google}
//               alt=""
//               className="w-full h-full  object-contain"
//             />
//           </div>
//           <div className="bg-whitish w-18 h-12 !p-3 !px-4 rounded-xl">
//             <img src={fb} alt="" className="w-full h-full  object-contain" />
//           </div>
//         </div>
//         <p className="!pb-6 text-gray-400">OR</p>
//         <div className="w-full lg:!px-10">
//           {Object.keys(formData).map((key) => (
//             <div key={key} className="relative !mb-5">
//               <input
//                 type={key === "password" ? "password" : "text"}
//                 name={key}
//                 placeholder={`Enter your ${key}`}
//                 value={formData[key]}
//                 onChange={handleChange}
//                 className="w-full !p-3 !pr-10 !pl-5 rounded-full focus:ring-1 focus:ring-green-tint outline-none bg-gray-100 "
//                 autoComplete="off"
//               />
//               <img
//                 src={key === "email" ? at : key === "password" ? lock : user}
//                 className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 object-contain"
//               />
//             </div>
//           ))}
//           <button
//             type="submit"
//             className="w-full bg-green-tint text-white !p-3 rounded-full box-shadow !mb-5"
//             disabled={loading}
//           >
//             {loading ? "Signing Up..." : "Sign Up"}
//           </button>
//         </div>
//         <div></div>
//         <div>
//           <p>
//             Already have an account?{" "}
//             <Link
//               to={"/signIn"}
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
import google from "../../assets/img/dashboards/Google.png";
import fb from "../../assets/img/dashboards/Facebook.png";
import user from "../../assets/img/dashboards/usericon.png";
import at from "../../assets/img/dashboards/at.png";
import lock from "../../assets/img/dashboards/lock.png";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";

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

  const [errors, setErrors] = useState({}); // Store validation errors

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    // Clear the error when the user starts typing in the field
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({}); // Clear previous errors

    try {
      await signUp(formData);

      toast.success("Signup successful! Redirecting...");
      navigate("/signin");
    } catch (error) {
      if (error.response?.status === 422 && error.response?.data?.error) {
        setErrors(error.response.data.error); // Set field-specific errors
      } else if (
        error.response?.status === 400 ||
        error.response?.status === 401
      ) {
        toast.error(error.response.data.message);
        console.log("entire error", error);
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
    <section className="w-full h-screen flex flex-col justify-center items-center bg-whitish font-nueue !px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl !p-6 !py-8 rounded-4xl lg:max-w-xl lg:w-2/5 w-full flex flex-col items-center"
      >
        <p className="bg-whitish !p-1 !px-4 text-sm rounded-3xl">
          Let's get you started
        </p>
        <h1 className="text-3xl !pt-3">Create an account</h1>
        <p className="text-gray-400 text-sm">
          Fill in your details and sign up to start exploring
        </p>
        <div className="flex !py-6 gap-6">
          <div className="bg-whitish w-18 h-12 !p-3 !px-4 rounded-xl">
            <img src={google} alt="" className="w-full h-full object-contain" />
          </div>
          <div className="bg-whitish w-18 h-12 !p-3 !px-4 rounded-xl">
            <img src={fb} alt="" className="w-full h-full object-contain" />
          </div>
        </div>
        <p className="!pb-6 text-gray-400">OR</p>
        <div className="w-full lg:!px-10">
          {Object.keys(formData).map((key) => (
            <div key={key} className="relative !mb-5">
              <input
                type={key === "password" ? "password" : "text"}
                name={key}
                placeholder={`Enter your ${key}`}
                value={formData[key]}
                onChange={handleChange}
                className={`w-full !p-3 !pr-10 !pl-5 rounded-full focus:ring-1 ${
                  errors[key]
                    ? "focus:ring-red-500 border-red-500"
                    : "focus:ring-green-tint"
                } outline-none bg-gray-100`}
                // autoComplete="off"
              />
              <img
                src={key === "email" ? at : key === "password" ? lock : user}
                className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 object-contain"
              />
              {errors[key] && (
                <p className="text-red-500 text-sm mt-1">{errors[key][0]}</p>
              )}
            </div>
          ))}
          {errors.general && (
            <p className="text-red-500 text-center text-sm mb-4">
              {errors.general}
            </p>
          )}
          <button
            type="submit"
            className="w-full bg-green-tint text-white !p-3 rounded-full box-shadow !mb-5"
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </div>
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
