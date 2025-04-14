import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [quizLoading, setQuizLoading] = useState(false);
  const [courseVideoLoading, setCourseVideoLoading] = useState(false);
  const [courses, setCourses] = useState(null);
  const [courseId, setCourseId] = useState(null);
  const [courseJourney, setCourseJourney] = useState(null);
  const [rolePlay, setRolePlay] = useState(null);
  const [videoCourse, setVideoCourse] = useState(null);
  const [powerSkill, setPowerSkill] = useState(null);
  const [ongoing, setOngoing] = useState(null);
  const [allRoleplay, setAllRoleplay] = useState(null);
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
            accept: "application/json",
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
  // Get courses
  const getCourses = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://backend-5781.onrender.com/api/v1/course/get-courses",
        {
          withCredentials: true,
        }
      );
      console.log("course Data:", response.data);
      setCourses(response.data);
      return response.data;
    } catch (error) {
      console.error(
        "Fetching course failed:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };
  //Get course lessons
  const getCourseLessons = async (courseId) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://backend-5781.onrender.com/api/v1/course/get-lessons?courseId=${courseId}`,
        {
          withCredentials: true,
        }
      );
      console.log("lesson Data:", response.data);
      setVideoCourse(response.data);
      return response.data;
    } catch (error) {
      console.error(
        "Fetching lesson failed:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };
  const getCourseLessonsVideo = async (courseId) => {
    setCourseVideoLoading(true);
    try {
      const response = await axios.get(
        `https://backend-5781.onrender.com/api/v1/course/get-lessons?courseId=${courseId}`,
        {
          withCredentials: true,
        }
      );
      console.log("lesson Data video:", response.data);
      setVideoCourse(response.data);
      return response.data;
    } catch (error) {
      console.error(
        "Fetching lesson failed:",
        error.response?.data || error.message
      );
    } finally {
      setCourseVideoLoading(false);
    }
  };
  const getLearningJourneyCourses = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://backend-5781.onrender.com/api/v1/journey/all-course",
        {
          withCredentials: true,
        }
      );
      console.log("journey course Data:", response.data);
      setCourseJourney(response.data);
      return response.data;
    } catch (error) {
      console.error(
        "Fetching journey course failed:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };
  // Role plays
  const getRolePlays = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://backend-5781.onrender.com/api/v1/role-play/user",
        {
          withCredentials: true,
        }
      );
      console.log("Roleplay course Data:", response.data);
      setRolePlay(response.data);
      return response.data;
    } catch (error) {
      console.error(
        "Fetching roleplayfailed:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };
  // Power skill all
  const getAllPowerskill = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://backend-5781.onrender.com/api/v1/skill/all`,
        {
          withCredentials: true,
        }
      );
      console.log("powerskill Data:", response.data);
      setPowerSkill(response.data);
      return response.data;
    } catch (error) {
      console.error(
        "Fetching lesson failed:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  // Ongoing coming from the learning journey
  const getOngoingUser = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://backend-5781.onrender.com/api/v1/journey/all-user`,
        {
          withCredentials: true,
        }
      );
      console.log("Ongoing:", response.data);
      setOngoing(response.data);
      return response.data;
    } catch (error) {
      console.error(
        "Fetching lesson failed:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  // Get scenario used as roleplay
  const getAllRoleplays = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://backend-5781.onrender.com/api/v1/scenario/all`,
        {
          withCredentials: true,
        }
      );
      console.log("All roleplays:", response.data);
      setRolePlay(response.data);
      return response.data;
    } catch (error) {
      console.error(
        "Fetching all roles failed:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  // Create teams
  const createTeam = async (formData) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://backend-5781.onrender.com/api/v1/team/create-team",
        formData,
        {
          withCredentials: true,

          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      console.log("form data", formData);

      console.log("responssssssssse teammmms", response);
      return response.data;
    } catch (error) {
      console.error(
        "create team error:",
        error.response?.data || error.message
      );
      throw error;
    } finally {
      setLoading(false);
    }
  };
  // Get all teams
  const getAllTeams = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://backend-5781.onrender.com/api/v1/team/user-teams`,
        {
          withCredentials: true,
        }
      );
      console.log("All teams:", response.data);
      // setRolePlay(response.data);
      return response.data;
    } catch (error) {
      console.error(
        "Fetching all teams failed:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  // get team members
  const getTeamMembers = async (teamId) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://backend-5781.onrender.com/api/v1/team/team-members?teamId=${teamId}`,
        {
          withCredentials: true,
        }
      );
      console.log("All teams members:", response.data);
      // setRolePlay(response.data);
      return response.data;
    } catch (error) {
      console.error(
        "Fetching all teams members failed:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };
  // invite team member

  const inviteTeamMember = async (formData) => {
    setModalLoading(true); // Set loading state before request

    try {
      const response = await axios.post(
        "https://backend-5781.onrender.com/api/v1/team/invite-member",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      console.log("form data", formData);
      console.log("invitation response", response);
      return response.data;
    } catch (error) {
      console.error(
        "invite team error:",
        error.response?.data || error.message
      );
      throw error; // Propagate the error
    } finally {
      setModalLoading(false); // Reset loading state after request
    }
  };

  // Remove team member

  const removeTeamMember = async (teamId, memberId) => {
    setLoading(true);

    try {
      const formData = {
        teamId: teamId,
        memberId: memberId,
      };

      const response = await axios.post(
        "https://backend-5781.onrender.com/api/v1/team/remove-member",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      console.log("remove member response", response);

      return response.data; // Returns the response data from the API
    } catch (error) {
      console.error(
        "remove team member error:",
        error.response?.data || error.message
      );
      throw error; // Propagate the error for further handling
    } finally {
      setLoading(false);
    }
  };

  // Get quiz by chapter
  const getQuizByChapter = async (courseId, chapterId) => {
    setQuizLoading(true);
    try {
      const response = await axios.get(
        `https://backend-5781.onrender.com/api/v1/course/get-lesson?courseId=${courseId}&chapterId=${chapterId}`,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      console.error(
        "Fetching quiz by chapter:",
        error.response?.data || error.message
      );
    } finally {
      setQuizLoading(false);
    }
  };
  // get quizscore

  // AuthContext.js
  const submitQuizAnswers = async ({ courseId, chapterId, answers }) => {
    setQuizLoading(true);
    try {
      const response = await axios.post(
        "https://backend-5781.onrender.com/api/v1/quiz-score/create",
        {
          chapterId,
          courseId,
          answers, // should already be an array of { quizId, selectedOption }
        },

        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error("Error submitting quiz:", error);
      throw error;
    } finally {
      setQuizLoading(false);
    }
  };

  const getQuizScore = async (chapterId) => {
    try {
      const response = await axios.get(
        `https://backend-5781.onrender.com/api/v1/quiz-score/chapter/user/score?chapterId=${chapterId}`,

        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("quiz scorez aut", response.data);
      return response.data; // The quiz score data
    } catch (error) {
      console.error("Error fetching quiz score:", error);
      throw error;
    }
  };

  const getAverageCourseScore = async (courseId) => {
    // const response = await axios.get(
    //   `/quiz-score/course/user/average?courseId=${courseId}`
    // );
    // return response.data;
  };
  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    console.log(storedUser);
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    if (courseJourney === null) {
      getLearningJourneyCourses();
    }
    getCourses();
    // if (!courseId) return;

    // Ensure courseId is passed to getCourseLessons
    // getCourseLessons(courseId);
    getAllPowerskill();
  }, [courseId]);
  console.log("Updated videoCourse state:", videoCourse);
  console.log("USER DATA", user);
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
        // courses
        courses,
        getCourses,
        getLearningJourneyCourses,
        getCourseLessons,
        setCourseId,
        videoCourse,
        getRolePlays,
        rolePlay,
        courseJourney,
        loading,
        modalLoading,
        getCourseLessonsVideo,
        setModalLoading,
        // powerskill
        powerSkill,

        //
        ongoing,
        getOngoingUser,

        // roleplay
        getAllRoleplays,
        allRoleplay,

        // All teams
        createTeam,
        getAllTeams,
        getTeamMembers,
        inviteTeamMember,
        removeTeamMember,

        // Quiz
        getQuizByChapter,
        quizLoading,
        setQuizLoading,
        submitQuizAnswers,
        getQuizScore,
        getAverageCourseScore,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
