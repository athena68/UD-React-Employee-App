import React from "react";
import Login from "./Login";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import reducer from "../reducers";
import middleware from "../middleware";
import { createStore } from "redux";
import { render } from "@testing-library/react";

const store = createStore(reducer, middleware);

describe("Login.js", () => {
  it("username, password, and submit button should be on login page", () => {
    const component = render(
      <Provider store={store}>
        <Router>
          <Login />
        </Router>
      </Provider>
    );

    expect(component.getByTestId("username")).toBeInTheDocument();
    expect(component.getByTestId("password")).toBeInTheDocument();
    expect(component.getByTestId("submit")).toBeInTheDocument();
  });
});
