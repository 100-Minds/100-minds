import Index from "../views/dashboard/Index";
import RolePlay from "../views/Role-play/components/RolePlay";
import Power from "../views/Power-skill/Power";
import Ongoing from "../views/Ongoing/Ongoing";
import Settings from "../views/settings/Settings";
import Support from "../views/support/Support";
import Profile from "../views/profile/Profile";
import ChapterList from "../views/Courses/ChapterList";

const coreRoutes = [
  {
    path: "/",
    title: "Dashboard",
    component: Index,
  },
  {
    path: "/role-play",
    title: "role-Play",
    component: RolePlay,
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
    path: "/courses",
    title: "courses",
    component: ChapterList,
  },
];
const routes = [...coreRoutes];
export default routes;
