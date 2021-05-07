import m from "mithril";

export const Loading = {
  view: () => {
    return m("div.center", m("i.nes-kirby.rotate"), m("p.loading", "Loading"));
  },
};
