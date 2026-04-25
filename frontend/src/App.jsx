import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./authentication/Login.jsx";
import Signup from "./authentication/Signup.jsx";
import Home from "./home/Home.jsx";

import { useDispatch } from "react-redux";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { getProfileUserThunk } from "./store/slice/user/user.thunk.js";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(getProfileUserThunk());
    })();
  }, []);

  return (
    <>
      <Toaster position="top-center" reverseOrder={true} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;
