import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { createStore } from "redux";

import reducer from "../reducers";
import middleware from "../middleware";
import Nav from "./Nav";
import { setAuthedUser } from "../actions/authedUser";

const store = createStore(reducer, middleware);

describe("Nav.js", () => {
  it("navigation bar displays all required links: home, leaderboard, new, logout, authenticated user", async () => {
    await store.dispatch(setAuthedUser("tylermcginnis")); // simulate login
    const authedUser = store.getState().authedUser;
    const component = render(
      <Provider store={store}>
        <Router>
          <Nav />
        </Router>
      </Provider>
    );

    expect(component.getByTestId("home").textContent).toBe("Home");
    expect(component.getByTestId("new-question").textContent).toBe("New");
    expect(component.getByTestId("leaderboard").textContent).toBe(
      "Leaderboard"
    );
    expect(component.getByTestId("display_user").textContent).toBe(
      "User: " + authedUser
    );
    expect(component.getByTestId("logout").textContent).toBe("Logout");
  });
});
