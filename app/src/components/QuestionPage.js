import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { formatQuestion } from "../utils/helpers";
import { handleAddQuestionAnswer } from "../actions/questions";
import Error404 from "./Error404";

const QuestionPage = (props) => {
  const { id } = useParams();

  const { dispatch, authedUser, questions, users } = props;
  const handleOptionOne = (e) => {
    e.preventDefault();
    dispatch(handleAddQuestionAnswer(question, "optionOne"));
  };

  const handleOptionTwo = (e) => {
    e.preventDefault();
    dispatch(handleAddQuestionAnswer(question, "optionTwo"));
  };

  const question = questions[id];

  console.log(question);

  if (question === undefined) {
    return <Error404></Error404>;
  }

  //Prepare question
  const formattedQuestion = formatQuestion(
    question,
    users[question.author],
    authedUser
  );
  const { name, optionOne, optionTwo, avatar } = formattedQuestion;

  const isVotedOptionOne = question.optionOne.votes.includes(authedUser);
  const isVotedOptionTwo = question.optionTwo.votes.includes(authedUser);
  const isVoted = isVotedOptionOne || isVotedOptionTwo;
  const optionOneVotes = question.optionOne.votes.length;
  const optionTwoVotes = question.optionTwo.votes.length;
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

  return (
    <div className="container">
      <h3 data-testid="poll-header">Poll by {name}</h3>
      <img src={avatar} alt={`avatar of ${name}`} className="avatar-large" />
      <h3>Would You Rather</h3>
      {!isVoted && (
        <div className="poll-area">
          <div>
            <p>{optionOne.text}</p>
            <button onClick={handleOptionOne} className="poll-button">
              Vote
            </button>
          </div>
          <div>
            <p>{optionTwo.text}</p>
            <button onClick={handleOptionTwo} className="poll-button">
              Vote
            </button>
          </div>
        </div>
      )}
      {isVoted && (
        <div className="poll-area">
          <label
            className={`${isVotedOptionOne ? "poll-voted" : "poll-not-voted"}`}
          >
            <input
              type="checkbox"
              checked={`${isVotedOptionOne ? "checked" : ""}`}
            ></input>
            <p>{optionOne.text}</p>
            <p data-testid="option-one-percent">{optionOneText}</p>
          </label>
          <label
            className={`${isVotedOptionTwo ? "poll-voted" : "poll-not-voted"}`}
          >
            <input
              type="checkbox"
              checked={`${isVotedOptionTwo ? "checked" : ""}`}
            ></input>
            <p>{optionTwo.text}</p>
            <p data-testid="option-two-percent">{optionTwoText}</p>
          </label>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = ({ authedUser, users, questions }) => {
  return {
    authedUser,
    questions,
    users,
  };
};

export default connect(mapStateToProps)(QuestionPage);
