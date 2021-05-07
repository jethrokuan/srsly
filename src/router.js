import m from "mithril";
import { createMithrilRouter } from "meiosis-routing/router-helper";
import { createRouteSegments, routeTransition } from "meiosis-routing/state";

export const Route = createRouteSegments([
  "Dashboard",
  "Login",
  "Help",
  "Review",
  "Settings",
  "NotFound",
]);

const routeConfig = {
  Review: "/",
  Login: "/login",
  Help: "/help",
  Dashboard: "/dashboard",
  Settings: "/settings",
  NotFound: "/:404...",
};

export const navigateTo = (route) => ({
  nextRoute: () => (Array.isArray(route) ? route : [route]),
});

export const router = createMithrilRouter({
  m,
  routeConfig,
});
