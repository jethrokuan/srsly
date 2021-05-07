import m from "mithril";
import sadpika from "../../assets/sad_pika.gif";
import { Loading } from "./loading";
import { router, Route } from "../router";

const CardsTable = {
  view: ({ attrs: { state, actions } }) => {
    return m("table.nes-table.is-bordered.font-small", [
      m(
        "thead",
        m("tr", [
          m("th", "Card Type"),
          m("th", "Text"),
          m("th", "Parameters"),
          m("th", "Actions"),
        ])
      ),
      m(
        "tbody",
        state.dashboard.cards.map((card) =>
          m("tr", [
            m("td", card.card_type),
            m("td", card.text),
            m(
              "td",
              m("ul", [
                m("li", `Correct: ${card.correct}`),
                m("li", `Difficulty: ${card.difficulty}`),
                m("li", `Days between: ${card.days_between}`),
                m("li", `Date last reviewed: ${card.date_last_reviewed}`),
              ])
            ),
            m(
              "td",
              m(
                "div",
                m(
                  "button.nes-btn.is-warning",
                  {
                    onclick: (e) => {
                      e.preventDefault();
                      actions.resetCard(card);
                    },
                    style: {
                      "margin-bottom": "10px",
                    },
                  },
                  "Reset"
                ),
                m(
                  "button.nes-btn.is-error",
                  {
                    onclick: (e) => {
                      e.preventDefault();
                      actions.deleteCard(state, card);
                    },
                  },
                  "Delete"
                )
              )
            ),
          ])
        )
      ),
    ]);
  },
};
export const Cards = {
  view: ({ attrs: { state, actions } }) => {
    const loaded = state.dashboard?.status === "loaded";
    const noCards =
      state.dashboard?.status === "loaded" &&
      state.dashboard?.cards.length === 0;
    if (loaded) {
      if (noCards) {
        return m(
          "div.center",
          m("img", {
            src: sadpika,
            style: {
              margin: "3rem 0",
            },
          }),
          m(
            "p",
            "No cards yet. Try ",
            m(
              "a",
              {
                href: "#",
                onclick: (e) => {
                  e.preventDefault();
                  actions.syncCards();
                },
              },
              "syncing"
            ),
            " or ",
            m(
              "a",
              {
                href: router.toPath(Route.Help()),
              },
              "making some cards"
            ),
            "?"
          )
        );
      } else {
        return m(CardsTable, { state, actions });
      }
    } else {
      return m(Loading);
    }
  },
};
