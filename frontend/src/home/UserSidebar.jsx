import { MdSearch } from "react-icons/md";
import User from "./User.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  logoutUserThunk,
  getOtherUsersThunk,
} from "../store/slice/user/user.thunk.js";
import { useEffect, useState } from "react";

export default function UserSidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { otherUsers, userProfile } = useSelector((state) => state.userReducer);

  const handleLogout = async () => {
    const response = await dispatch(logoutUserThunk());
    if (response?.payload?.success) {
      navigate("/login");
    }
  };

  useEffect(() => {
    (async () => {
      await dispatch(getOtherUsersThunk());
    })();
  }, []);

  // user search bar
  const [searchValue, setSearchValue] = useState("");
  const [users, setUsers] = useState([]);

  const handleSearchValue = (e) => {
    setSearchValue(e.target.value);
  };

  useEffect(() => {
    setUsers(
      otherUsers?.filter(
        (user) =>
          user.username.toLowerCase().includes(searchValue.toLowerCase()) ||
          user.fullName.toLowerCase().includes(searchValue.toLowerCase()),
      ),
    );
  }, [searchValue, otherUsers]);

  return (
    <div className="w-70 h-screen flex flex-col border-r-2  border-r-gray-300">
      {/* logo */}
      <div className="bg-[#EAEFEF] border-b-2  border-b-gray-300 rounded-sm">
        <h1 className="p-3.5 ml-6 text-2xl italic text-blue-500">Talk</h1>
      </div>
      {/* search bar  */}
      <div className="mx-2 mb-4 mt-2 rounded-sm">
        <label className="input input-warning flex items-center gap-2">
          <MdSearch />
          <input
            className="font-sans text-lg"
            type="search"
            required
            placeholder="Search"
            onChange={handleSearchValue}
            value={searchValue}
          />
        </label>
      </div>
      {/* users */}
      <div className=" h-full overflow-y-auto bg-[#BFC9D1] border-t-2  border-t-gray-300">
        {users?.map((userDetails) => (
          <User key={userDetails?._id} userDetails={userDetails} />
        ))}
      </div>

      {/* footer  */}
      <div className="p-3 flex items-center justify-between border-t-2  border-t-gray-300 bg-[#25343F]">
        <div className="avatar">
          <div className="w-12 rounded">
            <img src={userProfile?.avatar} />
          </div>
        </div>
        <h2 className="text-white">{userProfile?.username}</h2>
        <button
          onClick={handleLogout}
          className="btn btn-active btn-primary btn-sm px-4"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
