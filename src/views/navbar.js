import m from "mithril";
import { router, Route, navigateTo } from "../router";

const NavButton = (props, url) => {
  return m(
    "li",
    m(
      "a",
      props,
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
        NavButton(
          {
            href: router.toPath(Route.Review()),
          },
          "https://unpkg.com/pixelarticons@1.4.0/svg/human-run.svg"
        ),
        NavButton(
          {
            href: router.toPath(Route.Dashboard()),
          },
          "https://unpkg.com/pixelarticons@1.4.0/svg/home.svg"
        ),
        NavButton(
          {
            href: router.toPath(Route.Settings()),
          },
          "https://unpkg.com/pixelarticons@1.4.0/svg/user.svg"
        ),
        NavButton(
          {
            href: "#",
            onclick: (e) => {
              e.preventDefault();
              actions.syncCards(state.profile);
            },
          },
          "https://unpkg.com/pixelarticons@1.4.0/svg/sync.svg"
        ),
        NavButton(
          {
            href: "#",
            onclick: (e) => {
              e.preventDefault();
              actions.logout();
            },
          },
          "https://unpkg.com/pixelarticons@1.4.0/svg/logout.svg"
        )
      )
    );
  },
};
