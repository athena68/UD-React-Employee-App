import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { proceedLogout } from "../actions/authedUser";

const Nav = (props) => {
  const handleLogout = (e) => {
    e.preventDefault();
    props.dispatch(proceedLogout());
  };

  return (
    <nav className="nav">
      <ul>
        <li>
          <Link to="/" data-testid="home">
            Home
          </Link>
        </li>
        <li>
          <Link to="/add" data-testid="new-question">
            New
          </Link>
        </li>
        <li>
          <Link to="/leaderboard" data-testid="leaderboard">
            Leaderboard
          </Link>
        </li>
        <li data-testid="display_user">User: {props.authedUser}</li>
        <li>
          <Link onClick={handleLogout} data-testid="logout">
            Logout
          </Link>
        </li>
      </ul>
    </nav>
  );
};

const mapStateToProps = ({ authedUser }) => {
  return {
    authedUser,
  };
};

export default connect(mapStateToProps)(Nav);
