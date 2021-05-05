import m from "mithril";

export const Settings = {
  view: ({ attrs: { state, actions } }) => {
    return m(
      "section.nes-container.with-title",
      m("h3.title", "Update Hypothes.is Settings"),
      m(
        "p",
        "Get your token from ",
        m("a", { href: "https://hypothes.is/account/developer" }, "here"),
        "."
      ),
      m(
        "form.item",
        m(
          "div.nes-field.is-inline",
          m("label", { for: "user" }, "User"),
          m("input.nes-input", {
            type: "text",
            placeholder: "user",
            value: state.profile.hypothesis_user,
            oninput: (evt) => actions.hypothesisUser(evt.target.value),
          })
        ),
        m(
          "div.nes-field.is-inline",
          m("label", { for: "token" }, "Token"),
          m("input.nes-input", {
            type: "password",
            placeholder: "token",
            value: state.profile.hypothesis_token,
            oninput: (evt) => actions.hypothesisToken(evt.target.value),
          })
        ),
        m(
          "div.btn-grp",
          m(
            "button.nes-btn.is-primary",
            {
              type: "button",
              onclick: () =>
                actions.profileSubmit(
                  state.profile.hypothesis_user,
                  state.profile.hypothesis_token
                ),
            },
            "Update"
          )
        )
      )
    );
  },
};
