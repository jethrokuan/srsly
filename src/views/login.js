import m from "mithril";

export const Login = {
  view: ({ attrs: { state, actions, routing } }) => {
    const { message, returnTo } = routing.localSegment.params;

    return m(
      "section.nes-container.with-title",
      m("h3.title", "Login"),
      m(
        "form.item",
        m(
          "div.nes-field.is-inline",
          m("label", { for: "email" }, "Email"),
          m("input.nes-input", {
            type: "text",
            placeholder: "email",
            value: state.login?.email,
            oninput: (evt) => actions.email(evt.target.value),
          })
        ),
        m(
          "div.nes-field.is-inline",
          m("label", { for: "password" }, "Password"),
          m("input.nes-input", {
            type: "password",
            placeholder: "password",
            value: state.login?.password,
            oninput: (evt) => actions.password(evt.target.value),
          })
        ),
        m(
          "div.btn-grp",
          m(
            "button.nes-btn.is-primary",
            {
              type: "button",
              onclick: () =>
                actions.login(
                  state.login.email,
                  state.login.password,
                  returnTo
                ),
            },
            "Login"
          ),
          m(
            "button.nes-btn",
            {
              type: "button",
              onclick: () =>
                actions.signup(
                  state.login.email,
                  state.login.password,
                  returnTo
                ),
            },
            "Sign Up"
          )
        )
      )
    );
  },
};
