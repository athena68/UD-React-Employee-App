import { useState } from "react";
import { connect } from "react-redux";
import { handleAddQuestion } from "../actions/questions";
import { useNavigate } from "react-router-dom";

const NewQuestion = (props) => {
  const navigate = useNavigate();
  const [optionOne, setOptionOne] = useState("");
  const [optionTwo, setOptionTwo] = useState("");

  const handleOptionOne = (e) => {
    const text = e.target.value;
    setOptionOne(text);
  };

  const handleOptionTwo = (e) => {
    const text = e.target.value;
    setOptionTwo(text);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.dispatch(
      handleAddQuestion({
        optionOneText: optionOne,
        optionTwoText: optionTwo,
        author: props.authedUser,
      })
    );
    setOptionOne("");
    setOptionTwo("");
    navigate("/");
  };

  return (
    <div>
      <h1 className="center">Would You Rather</h1>
      <p className="center">Create Your Own Poll</p>
      <form className="new-question" onSubmit={handleSubmit}>
        {/* TODO: Redirect to Dashboard after submitted */}
        <h3 className="center">First Option</h3>
        <textarea
          data-testid="option-one"
          placeholder="Option One"
          value={optionOne}
          onChange={handleOptionOne}
          className="textarea"
          maxLength={280}
        />
        <h3 className="center">Second Option</h3>
        <textarea
          data-testid="option-two"
          placeholder="Option Two"
          value={optionTwo}
          onChange={handleOptionTwo}
          className="textarea"
          maxLength={280}
        />
        <button
          data-testid="submit-button"
          className="btn"
          type="submit"
          disabled={optionOne === "" || optionTwo === ""}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

const mapStateToProps = ({ authedUser }) => ({
  authedUser,
});

export default connect(mapStateToProps)(NewQuestion);
