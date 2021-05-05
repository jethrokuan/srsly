const DashboardEffect = (actions) => (state) => {
  if (state.dashboard?.status === "loading") {
    actions.loadCards();
  }
};

const ReviewEffect = (actions) => (state) => {
  if (state.review?.status === "loading") {
    actions.loadReviewCards();
  }
};

export const Effects = (actions) => {
  return [DashboardEffect(actions), ReviewEffect(actions)];
};
