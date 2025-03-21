import { Outlet } from "react-router-dom";

import SideBar from "./SideBar";
import NavHeader from "./NavHeader";
import { useEffect, useState } from "react";
import Loader from "../components/Loaders/Loader";
import Loader2 from "../components/Loaders/Loader2";

const Layout = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Wait for the page to fully load
    const handleLoad = () => {
      setTimeout(() => setLoading(false), 1000); // Optional delay for smooth transition
    };

    // Check if the page is already loaded
    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => window.removeEventListener("load", handleLoad);
  }, []);
  return (
    <div className="flex h-screen no-scrollbar">
      {loading ? (
        <Loader2 />
      ) : (
        <>
          <SideBar />

          <Outlet />
        </>
      )}
    </div>
  );
};

export default Layout;
