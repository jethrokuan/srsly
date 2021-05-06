import { Route, navigateTo } from "./router";
import { supabase } from "./supabase";
import m from "mithril";

export const Actions = (update) => ({
  navigateTo: (route) => update(navigateTo(route)),
  // Dashboard
  loadCards: async () => {
    let { data: cards, error } = await supabase.from("cards");
    return update({
      dashboard: {
        status: "loaded",
        cards,
      },
    });
  },
  resetCard: async (card) => {
    const { data, error } = await supabase
      .from("cards")
      .update({
        difficulty: 0.3,
        date_last_reviewed: new Date().toISOString(),
        correct: false,
        days_between: 3.0,
      })
      .eq("id", card.id);
    // TODO: Handle errors
    return update({
      dashboard: { status: "loading" },
    });
  },
  deleteCard: async (state, card) => {
    const resp = await m.request({
      url: `https://api.hypothes.is/api/annotations/${card.id}`,
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${state.profile["hypothesis_token"]}`,
      },
    });
    const { supabaseData, supabaseError } = await supabase
      .from("cards")
      .delete()
      .eq("id", card.id);
    return update({
      dashboard: { status: "loading" },
    });
  },
  // Review
  loadReviewCards: async () => {
    let { data: cards, error } = await supabase.from("cards");
    const now = new Date().getTime();
    let filteredCards = [];
    cards.forEach((card) => {
      const percentOverdue = card["correct"]
        ? Math.min(
            2,
            (now - new Date(card["date_last_reviewed"] + "Z")) /
              86400000 /
              card["days_between"]
          )
        : 1;
      if (
        (now - new Date(card["date_last_reviewed"] + "Z")) / 3600000 > 8 ||
        !card["correct"] ||
        percentOverdue >= 1
      ) {
        filteredCards.push({ ...card, percent_overdue: percentOverdue });
      }
    });
    filteredCards.sort((c1, c2) => {
      return c1["percent_overdue"] > c2["percent_overdue"];
    });
    if (filteredCards.length === 0) {
      return update({
        review: {
          status: "done",
        },
      });
    } else {
      return update({
        review: {
          status: "question",
          index: 0,
          cards: filteredCards,
        },
      });
    }
  },
  syncCards: async (profile) => {
    const result = await m.request({
      method: "GET",
      url: "https://api.hypothes.is/api/search",
      params: {
        limit: 200,
        user: `acct:${profile["hypothesis_user"]}@hypothes.is`,
        tags: "srsly",
      },
      headers: {
        Authorization: `Bearer ${profile["hypothesis_token"]}`,
      },
    });
    const rows = result["rows"].map((r) => {
      return {
        id: r["id"],
        user_id: profile.id,
        uri: r["uri"],
        text: r["text"],
        created: r["created"],
        updated: r["updated"],
        card_type: r["tags"].includes("srsly-cloze") ? "cloze" : "basic",
      };
    });
    const { supabaseResult, supabaseError } = await supabase
      .from("cards")
      .upsert(rows);
    update({
      dashboard: {
        status: "loading",
      },
    });
  },
  revealCard: () => {
    return update({
      review: {
        status: "answer",
      },
    });
  },
  reviewCard: async (rating, state) => {
    const card = state.review.cards[state.review.index];
    const correct = rating >= 0.6;
    const now = new Date();
    const date_last_reviewed = now.toISOString();
    const difficulty = Math.max(
      0,
      Math.min(
        card.difficulty + (card.percent_overdue / 17) * (8 - 9 * rating),
        1
      )
    );
    const difficulty_weight = 3 - 1.7 * difficulty;
    const days_between = correct
      ? 1 + (difficulty_weight - 1) * card.percent_overdue
      : Math.max(1, 1 / difficulty_weight ** 2);
    const { data, error } = await supabase
      .from("cards")
      .update({ difficulty, date_last_reviewed, correct, days_between })
      .eq("id", card.id);

    // TODO: Handle errors
    if (state.review.index === state.review.cards.length - 1) {
      return update({
        review: {
          status: "loading",
          index: 0,
          cards: [],
        },
      });
    } else {
      return update({
        review: {
          index: (x) => {
            return x + 1;
          },
          status: "question",
        },
      });
    }
  },
  email: (value) => update({ login: { email: value } }),
  password: (value) => update({ login: { password: value } }),
  login: async (email, password, returnTo) => {
    const { user, session, error } = await supabase.auth.signIn({
      email,
      password,
    });
    if (error) {
      const route = [
        Route.Login({
          message: error["message"],
          returnTo,
        }),
      ];
      return update({
        nextRoute: route,
        route,
        returnTo,
      });
    } else {
      let { data: profile } = await supabase.from("users");
      return update([
        { user, profile: profile[0] },
        navigateTo(Route.Dashboard()),
      ]);
    }
  },
  signup: async (email, password, returnTo) => {
    const { user, session, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) {
      const route = [
        Route.Login({
          message: error["message"],
          returnTo,
        }),
      ];
      return update({
        nextRoute: route,
        route,
        returnTo,
      });
    } else {
      let { data: profile } = await supabase.from("users");
      return update([
        { user, profile: profile[0] },
        navigateTo(Route.Dashboard()),
      ]);
    }
  },
  logout: async () => {
    let { error } = await supabase.auth.signOut();
    if (error) {
      console.log(error);
    }
    return update([
      { user: undefined, profile: undefined },
      navigateTo(Route.Login()),
    ]);
  },
  hypothesisUser: (value) => update({ profile: { hypothesis_user: value } }),
  hypothesisToken: (value) => update({ profile: { hypothesis_token: value } }),
  profileSubmit: async (user, token) => {
    await supabase.from("users").update([
      {
        hypothesis_user: user,
        hypothesis_token: token,
      },
    ]);
    return update({ message: "Successfully updated!" });
  },
});
