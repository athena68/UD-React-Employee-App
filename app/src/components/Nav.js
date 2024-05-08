import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { handleLogout } from "../actions/authedUser";

const Nav = (props) => {
  const handleLogout = (e) => {
    e.preventDefault();
    props.dispatch(handleLogout());
  };

  return (
    <nav className="nav">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/add">New</Link>
        </li>
        <li>
          <Link to="/leaderboard">Leaderboard</Link>
        </li>
        <li>User: {props.authedUser}</li>
        <li>
          <Link onClick={handleLogout}>Logout</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
