import React, { useEffect, useContext } from 'react';
import './App.css';
import Signup from "./Pages/Signup"
import Login from "./Pages/Login"
import Create from "./Pages/Create"
import ViewPost from "./Pages/ViewPost"
import { BrowserRouter as Router, Route } from "react-router-dom"
import Home from './Pages/Home';
import { authContext, FirebaseContext } from './store/Context';
import Post from './store/PostContext';


function App() {
  const { user, setUser } = useContext(authContext)
  const { firebase } = useContext(FirebaseContext)
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setUser(user)
    })
  })
  return (
    <div>
      <Post>
        <Router>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/signup">
            {user ? <Home /> : <Signup />}
          </Route>
          <Route path="/login">
            {user ? <Home /> : <Login />}
          </Route>
          <Route path="/Create">
            <Create />
          </Route>
          <Route path="/view">
            <ViewPost />
          </Route>
        </Router>
      </Post>
    </div>
  );
}

export default App;
