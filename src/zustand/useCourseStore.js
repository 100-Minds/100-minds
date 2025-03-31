import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCourseStore = create(
  persist(
    (set) => ({
      videoCourse: null,
      setVideoCourse: (data) => set({ videoCourse: data }),
      clearVideoCourse: () => set({ videoCourse: null }),
    }),
    {
      name: "video-course-storage", // LocalStorage key
      getStorage: () => localStorage, // Persist to localStorage
    }
  )
);

export default useCourseStore;
