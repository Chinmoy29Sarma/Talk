import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../store/slice/user/user.slice";

export default function User({ userDetails }) {
  const { selectedUser } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const handleSelectedUser = () => {
    dispatch(setSelectedUser(userDetails));
  };

  const { onlineUsers } = useSelector((state) => state.socketReducer);
  const isOnline = onlineUsers?.includes(userDetails?._id);

  return (
    <div
      onClick={handleSelectedUser}
      className={`flex items-center hover:bg-[#9aa3aa] cursor-pointer pt-2 pb-2 rounded-md 
        ${userDetails?._id === selectedUser?._id && `bg-[#8b8f91]`}`}
    >
      <div className={`avatar ${isOnline && "avatar-online"}`}>
        <div className="mask mask-squircle w-12">
          <img src={userDetails?.avatar} />
        </div>
      </div>
      <div className="ml-4">
        <h2 className="line-clamp-1">{userDetails?.fullName}</h2>
        <p className="text-xs">{userDetails?.username}</p>
      </div>
    </div>
  );
}
