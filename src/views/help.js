import m from "mithril";
import { SyncButton } from "./navbar";

export const Help = {
  view: ({ attrs: { state, actions } }) => {
    return m(
      "div.content",
      m("h1", "Srs.ly"),
      m(
        "p",
        "Srs.ly uses hypothes.is to build flashcards for anything on the web."
      ),
      m("h2", "Adding cards"),
      m("p", "Srs.ly supports 2 kinds of cards:"),
      m(
        "section.cards.m3",
        m(
          "div.nes-container.with-title.is-centered.is-card",
          m("h3.title", "Basic Card"),
          m("p", "Basic cards have their question and answer"),
          m("br"),
          m("br"),
          m("p", "Separated with 2 new lines")
        ),
        m(
          "div.nes-container.with-title.is-centered.is-card",
          m("h3.title", "Cloze Card"),
          m("p", "[Cloze cards] have their cloze [in square brackets]")
        )
      ),
      m(
        "p",
        "To indicate that the annotations are flashcards, tag them: #srsly for all cards, #srsly-basic for basic cards, #srsly-cloze for cloze cards."
      ),
      m("p", "Add cards in 3 simple steps ", m("i.nes-icon.coin.is-medium")),
      m(
        "ol",
        m("li", "Use hypothes.is to create these cards (with tags)."),
        m(
          "li",
          "Click the Sync button ",
          m("img.nes-avatar.is-medium", {
            src: "https://unpkg.com/pixelarticons@1.4.0/svg/sync.svg",
            style: {
              "image-rendering": "pixelated",
            },
          })
        ),
        m(
          "li",
          "Review your cards ",
          m("img.nes-avatar.is-medium", {
            src: "https://unpkg.com/pixelarticons@1.4.0/svg/human-run.svg",
            style: {
              "image-rendering": "pixelated",
            },
          }),
          " or see them in the dashboard ",
          m("img.nes-avatar.is-medium", {
            src: "https://unpkg.com/pixelarticons@1.4.0/svg/home.svg",
            style: {
              "image-rendering": "pixelated",
            },
          })
        )
      )
    );
  },
};
