import m from "mithril";

export const Footer = {
  view: () => {
    return m(
      "footer",
      m(
        "p",
        "Made with ",
        m("i.nes-icon.heart.is-small"),
        " by ",
        m("a", { href: "https://jethro.dev" }, "Jethro Kuan")
      )
    );
  },
};
