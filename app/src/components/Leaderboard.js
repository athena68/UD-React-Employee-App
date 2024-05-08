import { connect } from "react-redux";

const Leaderboard = (props) => {
  return (
    <div className="container">
      <table className="table">
        <thead>
          <tr>
            <th>Users</th>
            <th>Answered</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          {Object.values(props.users).map((user, index) => (
            <tr key={index}>
              <td className="table-cell">
                <div className="table-info">
                  <img
                    src={user.avatarURL}
                    alt={`avatar of ${user.name}`}
                    className="table-avatar"
                  />
                  <div>
                    <span className="table-name">{user.name}</span>
                    <span className="table-userid">{user.id}</span>
                  </div>
                </div>
              </td>
              <td className="table-cell">
                <span>{Object.keys(user.answers).length}</span>
              </td>
              <td className="table-cell">
                <span>{user.questions.length}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const mapStateToProps = ({ questions, users }) => ({
  questions,
  users: Object.values(users).sort(
    (a, b) =>
      Object.keys(b.answers).length +
      Object.keys(b.questions).length -
      Object.keys(a.answers).length -
      Object.keys(a.questions).length
  ),
});

export default connect(mapStateToProps)(Leaderboard);
