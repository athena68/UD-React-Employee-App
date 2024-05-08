import { connect } from "react-redux";
import { useState } from "react";
import { proceedLogin } from "../actions/authedUser";

const Login = (props) => {
  const [username, setUsername] = useState("tylermcginnis");
  const [password, setPassword] = useState("abc321");

  const handleUsername = (e) => {
    const value = e.target.value;
    setUsername(value);
  };
  const handlePassword = (e) => {
    const value = e.target.value;
    setPassword(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.dispatch(proceedLogin(username, password));
    setUsername("");
    setPassword("");
  };

  return (
    <div className="signin-container">
      <h1>Employee Polls</h1>
      <form className="form-signin" onSubmit={handleSubmit}>
        <h2 class="form-signin-heading">Please login</h2>
        <input
          type="text"
          name="username"
          className="form-input"
          placeholder="Username"
          value={username}
          onChange={handleUsername}
        />
        <input
          type="password"
          name="password"
          className="form-input"
          placeholder="Password"
          value={password}
          onChange={handlePassword}
        />
        <button type="submit" className="signin-btn">
          Login
        </button>
      </form>
    </div>
  );
};

const mapStateToProps = ({ authedUser }) => ({
  loggedIn: authedUser !== null,
});

export default connect(mapStateToProps)(Login);
