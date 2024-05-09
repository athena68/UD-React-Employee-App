import React from "react";
import { render } from "@testing-library/react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { MemoryRouter, Routes, Route } from "react-router-dom";

import reducer from "../reducers";
import middleware from "../middleware";
import QuestionPage from "./QuestionPage";
import { setAuthedUser } from "../actions/authedUser";
import { handleInitialData } from "../actions/shared";

const store = createStore(reducer, middleware);

describe("QuestionPage.js", () => {
  it("With answered questions, verify the percentage of people who voted for an option is displayed correctly.", async () => {
    await store.dispatch(setAuthedUser("tylermcginnis"));
    await store.dispatch(handleInitialData());

    const authedUser = store.getState().authedUser;
    const questions = store.getState().questions;
    const answeredPolls = store.getState().users[authedUser].answers;

    const answerId = Object.keys(answeredPolls)[0];
    const optionOneVotes = questions[answerId].optionOne.votes.length;
    const optionTwoVotes = questions[answerId].optionTwo.votes.length;
    const totalVotes = optionOneVotes + optionTwoVotes;
    const optionOneText =
      "Votes: " +
      optionOneVotes.toString() +
      " (" +
      Math.round((100 * optionOneVotes) / totalVotes) +
      "%)";
    const optionTwoText =
      "Votes: " +
      optionTwoVotes.toString() +
      " (" +
      Math.round((100 * optionTwoVotes) / totalVotes) +
      "%)";

    const component = render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[`/questions/${answerId}`]}>
          <Routes>
            <Route path="/questions/:id" element={<QuestionPage />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(component).toBeDefined();
    expect(component.getByTestId("poll-header")).toBeInTheDocument();
    expect(component.getByTestId("option-one-percent")).toBeInTheDocument();
    expect(component.getByTestId("option-two-percent")).toBeInTheDocument();
    expect(component.getByTestId("option-one-percent").textContent).toEqual(
      optionOneText
    );
    expect(component.getByTestId("option-two-percent").textContent).toEqual(
      optionTwoText
    );
  });
});
