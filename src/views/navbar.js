import m from "mithril";
import { router, Route, navigateTo } from "../router";

const NavButton = ({ href, onclick, url, css }) => {
  return m(
    "li" + css,
    m(
      "a",
      {
        href,
        onclick,
      },
      m("img.nes-avatar.is-medium", {
        src: url,
        style: {
          "image-rendering": "pixelated",
        },
      })
    )
  );
};

export const Navbar = {
  view: ({ attrs: { state, actions } }) => {
    return m(
      "nav",
      m(
        "ul",
        NavButton({
          href: router.toPath(Route.Review()),
          url: "https://unpkg.com/pixelarticons@1.4.0/svg/human-run.svg",
        }),
        NavButton({
          href: router.toPath(Route.Dashboard()),
          url: "https://unpkg.com/pixelarticons@1.4.0/svg/home.svg",
        }),
        NavButton({
          href: router.toPath(Route.Settings()),
          url: "https://unpkg.com/pixelarticons@1.4.0/svg/user.svg",
        }),
        NavButton({
          css: state.syncing ? ".bounce" : "",
          href: "#",
          onclick: (e) => {
            e.preventDefault();
            actions.syncCards(state.profile);
          },
          url: "https://unpkg.com/pixelarticons@1.4.0/svg/sync.svg",
        }),
        NavButton({
          href: router.toPath(Route.Help()),
          url: "https://unpkg.com/pixelarticons@1.4.0/svg/info-box.svg",
        }),
        NavButton({
          href: "#",
          onclick: (e) => {
            e.preventDefault();
            actions.logout();
          },
          url: "https://unpkg.com/pixelarticons@1.4.0/svg/logout.svg",
        })
      )
    );
  },
};
