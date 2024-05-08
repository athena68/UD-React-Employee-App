import "./App.css";
import { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { handleInitialData } from "../actions/shared";

import { Routes, Route } from "react-router-dom";
import LoadingBar from "react-redux-loading-bar";
import Dashboard from "./Dashboard";
import NewQuestion from "./NewQuestion";
import QuestionPage from "./QuestionPage";
import Leaderboard from "./Leaderboard";
import Nav from "./Nav";
import Login from "./Login";
import Error404 from "./Error404";

const App = (props) => {
  useEffect(() => {
    props.dispatch(handleInitialData());
  }, []);

  return (
    <div>
      {props.authedUser !== null && (
        <Fragment>
          <LoadingBar />
          <div className="container">
            <Nav />
            <Routes>
              <Route path="/" exact element={<Dashboard />} />
              <Route path="/questions/:id" element={<QuestionPage />} />
              <Route path="/add" element={<NewQuestion />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/Error404" element={<Error404 />} />
            </Routes>
          </div>
        </Fragment>
      )}
      {props.authedUser === null && <LoadingBar />}
      {props.authedUser === null && props.loading === false && (
        <Fragment>
          <div className="container">
            <Routes>
              <Route path="/" exact element={<Login />} />
              <Route path="/questions/:id" element={<Login />} />
              <Route path="/add" element={<Login />} />
              <Route path="/leaderboard" element={<Login />} />
              <Route path="/Error404" element={<Error404 />} />
            </Routes>
          </div>
        </Fragment>
      )}
    </div>
  );
};

const mapStateToProps = ({ authedUser, loadingBar }) => ({
  loading: loadingBar != null && loadingBar.default === 1,
  authedUser,
});

export default connect(mapStateToProps)(App);
