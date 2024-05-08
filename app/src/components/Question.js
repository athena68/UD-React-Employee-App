import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { formatQuestion, formatDate } from "../utils/helpers";

const Question = (props) => {
  if (props.question === null) {
    return <p>This question not existed</p>;
  }

  return (
    <Link to={`/questions/${props.question.id}`} className="question">
      <img
        src={props.question.avatar}
        alt={`avatar of ${props.question.name}`}
        className="avatar-small"
      />
      <div className="question-info">
        <div>
          <span>{props.question.name}</span>
          <div>{formatDate(props.question.timestamp)}</div>
        </div>
      </div>
    </Link>
  );
};

const mapStateToProps = ({ authedUser, users, questions }, { id }) => {
  const question = questions[id];

  return {
    authedUser,
    question: question
      ? formatQuestion(question, users[question.author], authedUser)
      : null,
  };
};

export default connect(mapStateToProps)(Question);
