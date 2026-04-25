import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUserThunk } from "../store/slice/user/user.thunk";
import { toast } from "react-hot-toast";

function Login() {
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // protect route
  const { isAuthenticated } = useSelector((state) => state.userReducer);
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);

  const handleInputChange = (e) => {
    setLoginData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async () => {
    if (loginData.username === "" || loginData.password === "") {
      return toast.error("username or password is missing!");
    }
    const response = await dispatch(loginUserThunk(loginData));
    if (response?.payload?.success) {
      navigate("/");
    }
  };

  return (
    <div className="flex justify-center items-center bg-amber-500 min-h-screen">
      <div>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <label className="label">Username</label>
          <input
            type="text"
            name="username"
            className="input"
            placeholder="username"
            onChange={handleInputChange}
          />

          <label className="label">Password</label>
          <input
            type="password"
            name="password"
            className="input"
            placeholder="Password"
            onChange={handleInputChange}
          />

          <button onClick={handleLogin} className="btn btn-neutral mt-4">
            Login
          </button>

          <br></br>
          <p className="text-lg">
            Don't have an account. &nbsp;{" "}
            <Link to="/signup" className="text-blue-400 underline">
              Signup
            </Link>
          </p>
        </fieldset>
      </div>
    </div>
  );
}

export default Login;
