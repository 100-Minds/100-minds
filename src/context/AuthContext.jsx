import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  //   const navigate = useNavigate();

  const signUp = async (formData) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://backend-5781.onrender.com/api/v1/auth/sign-up",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json", // Ensure JSON response
          },
        }
      );
      console.log("form data", formData);
      setUser(response.data);

      console.log("responssssssssse", response);
      return response.data;
    } catch (error) {
      console.error("Signup error:", error.response?.data || error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (formData) => {
    setLoading(true);

    console.log(formData);
    try {
      const response = await axios.post(
        "https://backend-5781.onrender.com/api/v1/auth/sign-in",
        // JSON.stringify(formData),
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
        // JSON.stringify(formData)
      );

      if (response.status === 200) {
        const userData = {
          email: formData.email,
          password: formData.password,
        };
        sessionStorage.setItem("user", JSON.stringify(userData));
        console.log("response from sign in", response);
      }
      setUser(response.data);

      return response.data;
    } catch (error) {
      console.error("Signin error:", error.response?.data || error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  // OTP Verification Function
  const verifyOtp = async (otpCode) => {
    setLoading(true);
    try {
      // Retrieve email & password from session storage
      const storedUser = JSON.parse(sessionStorage.getItem("user"));
      if (!storedUser) throw new Error("User credentials not found!");

      // Create payload with stored credentials + OTP
      const payload = {
        email: storedUser.email,
        password: storedUser.password,
        otp: otpCode, // Include OTP
      };

      const response = await axios.post(
        "https://backend-5781.onrender.com/api/v1/auth/sign-in",
        payload,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      const userData = response.data?.data?.[0]; // Extract user object from response
      if (!userData) throw new Error("Invalid user data received");

      // Store user in localStorage for persistence
      sessionStorage.setItem("loggedInUser", JSON.stringify(userData));

      setUser(response.data);
      console.log("otp", response);
      console.log("otp data", response.data);
      sessionStorage.removeItem("user"); // Remove credentials after successful verification
      return response.data;
    } catch (error) {
      console.error(
        "OTP verification error:",
        error.response?.data || error.message
      );
      throw error;
    } finally {
      setLoading(false);
    }
  };
  // Password-forgot
  const forgotPassword = async (formData) => {
    const payload = { email: formData.email };

    try {
      const response = await axios.post(
        "https://backend-5781.onrender.com/api/v1/auth/password/forgot",
        payload,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      // Ensure the response has data and is successful
      if (response.status === 200 && response.data?.success) {
        return response.data;
      } else {
        throw new Error("Unexpected response from server.");
      }
    } catch (error) {
      console.error(
        "Password reset request error:",
        error.response?.data || error.message
      );
      throw error;
    }
  };

  // LOGOUT
  const signout = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://backend-5781.onrender.com/api/v1/auth/sign-out",
        { withCredentials: true }
      );

      console.log("Signout Data:", response.data);

      // ✅ Clear user session & storage
      sessionStorage.removeItem("loggedInUser");
      sessionStorage.removeItem("user");
      localStorage.removeItem("userToken");

      // ✅ Reset user state
      setUser(null);
      return response.data;
    } catch (error) {
      console.error("Signout failed:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  const getProfileData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://backend-5781.onrender.com/api/v1/user",
        {
          withCredentials: true,
        }
      );
      console.log("Profile Data:", response.data);
      return response.data;
    } catch (error) {
      console.error(
        "Fetching profile failed:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const getCurrentUser = () => {
    return user || JSON.parse(localStorage.getItem("loggedInUser"));
  };
  console.log("user obj", user);

  // Function to update user profile
  const updateUserProfile = async (updatedData) => {
    try {
      const response = await axios.post(
        "https://backend-5781.onrender.com/api/v1/user/update-user",
        updatedData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, // If your API requires authentication cookies
        }
      );

      // Assuming API returns updated user data
      if (response.data) {
        setUser(response.data); // Update the context state
      }

      return response.data; // Return response in case we need it in ProfileModal
    } catch (error) {
      console.error("Failed to update user profile", error);
      throw error; // Throw error to handle it in ProfileModal
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        signUp,
        signIn,
        signout,
        forgotPassword,
        verifyOtp,
        getCurrentUser,
        getProfileData,
        updateUserProfile,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
