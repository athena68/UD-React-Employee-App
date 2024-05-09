import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { render, within } from "@testing-library/react";

import Leaderboard from "./Leaderboard";
import reducer from "../reducers";
import middleware from "../middleware";
import { createStore } from "redux";
import { handleInitialData } from "../actions/shared";

const store = createStore(reducer, middleware);

describe("Leaderboard.js", () => {
  it("display the correct user name, number of questions asked, and number of questions answered", async () => {
    await store.dispatch(handleInitialData());
    const component = render(
      <Provider store={store}>
        <Router>
          <Leaderboard />
        </Router>
      </Provider>
    );

    const users = store.getState().users;
    const users_sorted = Object.values(users).sort(
      (a, b) =>
        Object.keys(b.answers).length +
        Object.keys(b.questions).length -
        Object.keys(a.answers).length -
        Object.keys(a.questions).length
    );

    const table = component.getByRole("table");
    const tbody = within(table).getAllByRole("rowgroup")[1];
    const rows = within(tbody).getAllByRole("row");

    expect(rows).toHaveLength(users_sorted.length);

    users_sorted.forEach((user, index) => {
      const columns = within(rows[index]).getAllByRole("cell");
      expect(columns).toHaveLength(3);
      expect(columns[0]).toHaveTextContent(user.name);
      expect(columns[1]).toHaveTextContent(Object.keys(user.answers).length);
      expect(columns[2]).toHaveTextContent(Object.keys(user.questions).length);
    });
  });
});
