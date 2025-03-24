import Index from "../views/dashboard/Index";
import RolePlay from "../views/Role-play/components/RolePlay";
import Power from "../views/Power-skill/Power";
import Ongoing from "../views/Ongoing/Ongoing";
import Settings from "../views/settings/Settings";
import Support from "../views/support/Support";
import Profile from "../views/profile/Profile";
import ChapterList from "../views/Courses/ChapterList";
import Teams from "../views/teams/Teams";
import MiningTeams from "../views/teams/MiningTeams";
import Performance from "../views/teams/Performance";
import LeaderBoard from "../views/teams/LeaderBoard";
import CompareStats from "../views/teams/CompareStats";
import RolPlayChapters from "../views/Role-play/components/RolPlayChapters";
import { path } from "framer-motion/client";
import RolePlayPage from "../views/Role-play/RolePlayPage";
import Courses from "../views/Courses/Courses";
import CourseLessons from "../views/Courses/CourseLessons";

const coreRoutes = [
  {
    path: "/",
    title: "Dashboard",
    component: Index,
  },
  {
    path: "/courses",
    title: "Courses",
    component: Courses,
  },
  {
    path: "/courses/:courseId/lessons",
    title: "Course Lessons",
    component: CourseLessons, // This component should handle course lessons dynamically
  },
  {
    path: "/journey",
    title: "Journey",
    component: RolePlay,
  },
  {
    path: "/journey/:courseId",
    title: "Journey Chapters",
    component: RolPlayChapters,
  },
  // New Actual roleplay content
  {
    path: "/role-play",
    title: "Role Play",
    component: RolePlayPage,
  },
  {
    path: "/power",
    title: "power",
    component: Power,
  },
  {
    path: "/ongoing",
    title: "ongoing",
    component: Ongoing,
  },
  {
    path: "/settings",
    title: "settings",
    component: Settings,
  },
  {
    path: "/support",
    title: "support",
    component: Support,
  },
  {
    path: "/profile",
    title: "Profile",
    component: Profile,
  },
  {
    path: "/courses/chapters",
    title: "course",
    component: ChapterList,
  },
  {
    path: "/courses/chapters/:lessonId/video/:videoId",
    title: "course",
    component: ChapterList,
  },

  {
    path: "/teams",
    title: "teams",
    component: Teams,
    children: [
      {
        path: "mining-teams",
        title: "Mining Teams",
        component: MiningTeams,
      },
      {
        path: "performance",
        title: "Performance",
        component: Performance,
      },
      {
        path: "leader-board",
        title: "Leader Board",
        component: LeaderBoard,
      },
      {
        path: "compare-stats",
        title: "Compare Stats",
        component: CompareStats,
      },
    ],
  },
];
const routes = [...coreRoutes];
export default routes;
