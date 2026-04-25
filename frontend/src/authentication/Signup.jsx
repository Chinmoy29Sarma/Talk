import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { registerUserThunk } from "../store/slice/user/user.thunk";
import toast from "react-hot-toast";

function Signup() {
  const [signupData, setSignupData] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "male",
  });

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
    setSignupData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSignup = async () => {
    if (signupData.password !== signupData.confirmPassword) {
      return toast.error("Password and Confirm Password don't match!");
    }
    const response = await dispatch(registerUserThunk(signupData));
    if (response?.payload?.success) {
      navigate("/");
    }
  };

  return (
    <div className="flex justify-center items-center bg-amber-500 min-h-screen">
      <div>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <label className="label">Full Name</label>
          <input
            type="text"
            name="fullName"
            className="input"
            placeholder="full name"
            onChange={handleInputChange}
          />

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

          <label className="label">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            className="input"
            placeholder="Confirm Password"
            onChange={handleInputChange}
          />

          <div className="flex gap-3 pt-4 justify-center">
            <label htmlFor="male" className="label text-[1.2rem]">
              male
            </label>
            <input
              id="male"
              type="radio"
              name="gender"
              className="radio radio-secondary"
              value="male"
              onClick={handleInputChange}
              defaultChecked
            />
            <label htmlFor="female" className="label text-[1.2rem]">
              female
            </label>
            <input
              id="female"
              type="radio"
              name="gender"
              className="radio radio-secondary"
              value="female"
              onClick={handleInputChange}
            />
          </div>

          <button onClick={handleSignup} className="btn btn-neutral mt-4">
            Signup
          </button>
          <br></br>
          <p className="text-lg">
            Already have an account. &nbsp;{" "}
            <Link to="/login" className="text-blue-400 underline">
              Login
            </Link>
          </p>
        </fieldset>
      </div>
    </div>
  );
}

export default Signup;
