import m from "mithril";
import marked from "marked";

const RevealButton = {
  view: ({ attrs: { actions } }) => {
    return m(
      "div.btn-grp",
      m(
        "button.nes-btn",
        {
          type: "button",
          onclick: () => {
            actions.revealCard();
          },
        },
        "Reveal"
      )
    );
  },
};

const ReviewButtons = {
  view: ({ attrs: { state, actions } }) => {
    return m(
      "div.btn-grp",
      m(
        "button.nes-btn.is-error",
        {
          type: "button",
          onclick: () => {
            actions.reviewCard(0.2, state);
          },
        },
        "Again"
      ),
      m(
        "button.nes-btn.is-warning",
        {
          type: "button",
          onclick: () => {
            actions.reviewCard(0.4, state);
          },
        },
        "Hard"
      ),
      m(
        "button.nes-btn.is-primary",
        {
          type: "button",
          onclick: () => {
            actions.reviewCard(0.6, state);
          },
        },
        "Good"
      ),
      m(
        "button.nes-btn.is-success",
        {
          type: "button",
          onclick: () => {
            actions.reviewCard(0.8, state);
          },
        },
        "Easy"
      )
    );
  },
};

const BasicCard = {
  view: ({ attrs: { actions, state } }) => {
    const card = state.review.cards[state.review.index];
    const [question, answer] = card.text.split("\n\n");
    return m(
      "div",
      m.trust(marked(question)),
      state.review.status === "question" && m(RevealButton, { actions }),
      state.review.status === "answer" && m.trust(marked(answer)),
      state.review.status === "answer" && m(ReviewButtons, { actions, state })
    );
  },
};
const ClozeCard = {
  view: ({ attrs: { actions, state } }) => {
    const card = state.review.cards[state.review.index];
    let question = card.text.slice();
    const cloze_regex = /\[(.*?)\]/g;
    let deletions = card.text.match(cloze_regex);
    const random_index = Math.floor(Math.random() * deletions.length);
    const random_deletion = deletions[random_index];
    deletions.splice(random_index, 1);
    for (let i = 0; i < deletions.length; i++) {
      question = question.replace(
        deletions[i],
        deletions[i].substring(1, deletions[i].length - 1)
      );
    }
    question = question.replace(random_deletion, "[...]");
    let answer = question.slice();
    answer = answer.replace(
      "[...]",
      random_deletion.substring(1, random_deletion.length - 1)
    );
    return m(
      "div",
      m.trust(
        state.review.status === "question" ? marked(question) : marked(answer)
      ),
      state.review.status === "question" && m(RevealButton, { actions }),
      state.review.status === "answer" && m(ReviewButtons, { actions, state })
    );
  },
};

export const Card = {
  view: ({ attrs: { actions, state } }) => {
    const card = state.review.cards[state.review.index];
    return m(
      "div.nes-container.with-title",
      m(
        "h3.title",
        `Card ${state.review.index + 1} of ${state.review.cards.length}`
      ),
      card.card_type === "basic"
        ? m(BasicCard, { actions, state })
        : m(ClozeCard, { actions, state })
    );
  },
};
