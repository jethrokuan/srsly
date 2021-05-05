import { Route } from "./router";
import { routeTransition } from "meiosis-routing/state";

const routeService = (state) => ({
  routeTransition: () => routeTransition(state.route, state.nextRoute),
  route: state.nextRoute,
});

const protectedService = (state) => {
  if (state.route[0]?.id !== "Login" && !state.user) {
    const route = [
      Route.Login({
        message: "Please login.",
        returnTo: Route.Dashboard(),
      }),
    ];
    return {
      nextRoute: route,
      route,
      routeTransition: {
        arrive: () => ({ Login: Route.Login() }),
        leave: () => ({}),
      },
    };
  }
};

const dashboardService = (state) => {
  if (state.routeTransition.arrive.Dashboard) {
    return {
      dashboard: {
        status: "loading",
      },
    };
  } else if (state.routeTransition.leave.Dashboard) {
    return { dashboard: undefined };
  }
};

const reviewService = (state) => {
  if (state.routeTransition.arrive.Review) {
    return {
      review: {
        status: "loading",
      },
    };
  }
};

const loginService = (state) => {
  if (state.routeTransition.arrive.Login) {
    return {
      login: {
        email: "",
        password: "",
      },
    };
  } else if (state.routeTransition.leave.Login) {
    return {
      login: undefined,
    };
  }
};

export const Services = [
  routeService,
  protectedService,
  dashboardService,
  loginService,
  reviewService,
];
