import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Hero from "./Components/Landing/Hero";
import Header from "./Components/Landing/Header";
import Greeting from "./Components/Landing/Greeting";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MemberPage from "./Components/Portal/MemberPage2";
import MemberLogin from "./Components/Portal/GoogleRedirect";
import SignUp from "./Components/Portal/SignUp";
import NewUser from "./Components/Portal/NewUser";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/functions";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBY_olTq-IJkQs1-VXTCgxIUzlD7_-3MXQ",
  authDomain: "ktp-site.firebaseapp.com",
  projectId: "ktp-site",
  storageBucket: "ktp-site.appspot.com",
  messagingSenderId: "239929865580",
  appId: "1:239929865580:web:8871c4295a78dc93076f49",
  measurementId: "G-K67BS563H9",
  databaseURL: "https://ktp-site-default-rtdb.firebaseio.com/",
};

const app = firebase.initializeApp(firebaseConfig);
var provider = new firebase.auth.GoogleAuthProvider();
provider.addScope("https://www.googleapis.com/auth/userinfo.profile");
//firebase.functions().useEmulator("localhost", 5001);
const database = getDatabase(app);

class Full extends React.Component {
  render() {
    return (
      <Router>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <div>
                <Header firebase={firebase} />
                <Hero />
                <Greeting />
              </div>
            }
          ></Route>
          <Route
            path="/member"
            element={<MemberPage firebase={firebase} />}
          ></Route>
          <Route
            path="/login"
            element={<MemberLogin firebase={firebase} provider={provider} />}
          ></Route>
          <Route
            path="/signup"
            element={<SignUp firebase={firebase} provider={provider} />}
          ></Route>

          <Route
            path="/newuser"
            element={
              <NewUser
                firebase={firebase}
                provider={provider}
                database={database}
              />
            }
          ></Route>
        </Routes>
      </Router>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Full />);
