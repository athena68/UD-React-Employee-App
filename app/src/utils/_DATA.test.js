import {
  _getUsers,
  _getQuestions,
  _saveQuestion,
  _saveQuestionAnswer,
} from "./_DATA.js";

describe("Unit Testing for _DATA.js", () => {
  it("verify that the saved question is returned and all expected fields are populated when correctly formatted data is passed to the _saveQuestion().", async () => {
    let optionOneText = "Option One";
    let optionTwoText = "Option Two";
    let author = "Author Name";
    let result = await _saveQuestion({ optionOneText, optionTwoText, author });

    expect(result).toHaveProperty("id");
    expect(result).toHaveProperty("author");
    expect(result).toHaveProperty("timestamp");
    expect(result).toHaveProperty("optionOne");
    expect(result).toHaveProperty("optionTwo");
    expect(result.optionOne).toHaveProperty("votes");
    expect(result.optionOne).toHaveProperty("text");
    expect(result.optionTwo).toHaveProperty("votes");
    expect(result.optionTwo).toHaveProperty("text");
    expect(result.optionOne.text).toEqual(optionOneText);
    expect(result.optionTwo.text).toEqual(optionTwoText);
    expect(result.author).toEqual(author);
  });

  it("verify that an error is returned if incorrect data is passed to the _saveQuestion().", async () => {
    let optionOneText = "Option One";
    let optionTwoText = "Option Two";
    let author = "Author Name";

    await expect(
      _saveQuestion({ optionOneText, optionTwoText })
    ).rejects.toEqual(
      "Please provide optionOneText, optionTwoText, and author"
    );
    await expect(_saveQuestion({ optionOneText, author })).rejects.toEqual(
      "Please provide optionOneText, optionTwoText, and author"
    );
    await expect(_saveQuestion({ optionTwoText, author })).rejects.toEqual(
      "Please provide optionOneText, optionTwoText, and author"
    );
  });

  it("verify that true is returned when correctly formatted data is passed to the _saveQuestionAnswer().", async () => {
    let authedUser = "tylermcginnis";
    let qid = "vthrdm985a262al8qx3do";
    let answer = "optionOne";

    await expect(
      _saveQuestionAnswer({ authedUser, qid, answer })
    ).resolves.toBe(true);
  });

  it("verify that an error is returned if incorrect data is passed to the _saveQuestionAnswer().", async () => {
    let authedUser = "tylermcginnis";
    let qid = "vthrdm985a262al8qx3do";
    let answer = "optionOne";

    await expect(_saveQuestionAnswer({ authedUser, qid })).rejects.toEqual(
      "Please provide authedUser, qid, and answer"
    );
    await expect(_saveQuestionAnswer({ authedUser, answer })).rejects.toEqual(
      "Please provide authedUser, qid, and answer"
    );
    await expect(_saveQuestionAnswer({ qid, answer })).rejects.toEqual(
      "Please provide authedUser, qid, and answer"
    );
  });
});
