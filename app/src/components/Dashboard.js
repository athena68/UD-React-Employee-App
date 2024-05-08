import { connect } from "react-redux";
import Question from "./Question";

const Dashboard = (props) => {
  const doneQuestions = props.questionIds.filter(
    (id) =>
      props.questions[id].optionOne.votes.includes(props.authedUser) ||
      props.questions[id].optionTwo.votes.includes(props.authedUser)
  );

  const newQuestions = props.questionIds.filter(
    (id) => !doneQuestions.includes(id)
  );

  return (
    <div>
      <div>
        <h3 className="center">New Questions</h3>
        <ul className="dashboard">
          {newQuestions.map((id) => (
            <li key={id}>
              <Question id={id} />
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="center">Done</h3>
        <ul className="dashboard">
          {doneQuestions.map((id) => (
            <li key={id}>
              <Question id={id} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const mapStateToProps = ({ questions, authedUser }) => ({
  questionIds: Object.keys(questions).sort(
    (a, b) => questions[b].timestamp - questions[a].timestamp
  ),
  questions,
  authedUser,
});

export default connect(mapStateToProps)(Dashboard);
