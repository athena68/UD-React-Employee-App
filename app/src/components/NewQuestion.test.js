import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

import reducer from "../reducers";
import middleware from "../middleware";
import NewQuestion from "./NewQuestion";

const store = createStore(reducer, middleware);

describe("NewQuestion.js", () => {
  it("submit button should be enabled when both option fields filled text", () => {
    const component = render(
      <Provider store={store}>
        <Router>
          <NewQuestion />
        </Router>
      </Provider>
    );

    expect(component).toBeDefined();
    let submitButton = component.getByTestId("submit-button");
    expect(submitButton).toBeDisabled();
    let optionOne = component.getByTestId("option-one");
    let optionTwo = component.getByTestId("option-two");
    fireEvent.change(optionOne, { target: { value: "optionOne" } });
    fireEvent.change(optionTwo, { target: { value: "optionTwo" } });
    expect(optionOne.value).toEqual("optionOne");
    expect(optionTwo.value).toEqual("optionTwo");
    expect(submitButton).not.toBeDisabled();
  });
});
