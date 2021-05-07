import m from "mithril";
import Stream from "mithril/stream";
import merge from "mergerino";
import meiosis from "meiosis-setup/mergerino";
import "nes.css/css/nes.min.css";
import "../custom.css";

import { Routing } from "meiosis-routing/state";
import meiosisTracer from "meiosis-tracer";

import { Route, Router, router, routes, navigateTo } from "./router";
import { supabase } from "./supabase";

import { Navbar } from "./views/navbar";
import { Footer } from "./views/footer";
import { Dashboard } from "./views/dashboard";
import { Review } from "./views/review";
import { Login } from "./views/login";
import { Help } from "./views/help";
import { Settings } from "./views/settings";

import { Actions } from "./actions";
import { Services } from "./services";
import { Effects } from "./effects";

const componentMap = {
  Dashboard,
  Help,
  Login,
  Review,
  Settings,
  NotFound: { view: () => m("div", "Page Not Found") },
};

const Root = {
  view: ({ attrs: { state, actions } }) => {
    const routing = Routing(state.route);
    const Component = componentMap[routing.localSegment.id];
    const { message } = routing.localSegment.params;

    return m(
      "div.container",
      m(Navbar, { state, actions }),
      message ? m("div.nes-container.m3", message) : null,
      m(Component, { state, actions, routing }),
      m(Footer)
    );
  },
};

const App = {
  view: ({ attrs: { state, actions } }) => m(Root, { state, actions }),
};

const getSupabaseSession = async () => {
  const session = await supabase.auth.session();
  if (session?.user) {
    let { data: profile } = await supabase.from("users");
    return { user: session?.user, profile: profile[0] };
  }
};

const buildInitialState = async (initialRoute) => {
  const routeDict = navigateTo(initialRoute || Route.Review());
  const session = await getSupabaseSession();
  return {
    ...session,
    ...routeDict,
  };
};

const createApp = async (initialRoute) => ({
  initial: await buildInitialState(initialRoute),
  Actions: (update) => Actions(update),
  services: Services,
  Effects: (update, actions) => Effects(actions),
});

createApp(router.initialRoute).then((app) => {
  const { states, actions } = meiosis({ stream: Stream, merge, app });

  m.route(
    document.getElementById("app"),
    "/",
    router.MithrilRoutes({ states, actions, App })
  );

  meiosisTracer({
    streams: [{ stream: states, label: "states" }],
  });

  states.map(() => m.redraw());
  states.map((state) => router.locationBarSync(state.route));
});
