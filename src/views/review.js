import m from "mithril";
import { Card } from "./card";
import avocato from "../../assets/avocato.gif";

export const Review = {
  view: ({ attrs: { state, actions } }) => {
    return m(
      "div",
      state.review?.cards?.length > 0 &&
        m(
          "div",
          m("progress.nes-progress.is-pattern", {
            value: state.review.index,
            max: state.review.cards.length,
          }),
          m(Card, {
            actions,
            state,
          })
        ),
      state.review?.status === "done" &&
        m(
          "div.center",
          m("img", {
            src: avocato,
            style: {
              margin: "3rem 0",
            },
          }),
          m("p", "All done for now! Come back again later.")
        )
    );
  },
};
