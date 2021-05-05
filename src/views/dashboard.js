import m from "mithril";
import { Cards } from "./cards";
import { Settings } from "./settings";

export const Dashboard = {
  view: ({ attrs: { state, actions } }) =>
    m(
      "div",
      !state.profile?.id && m(Settings, { state, actions }),
      state.profile && m(Cards, { state, actions })
    ),
};
