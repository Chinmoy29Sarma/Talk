import { useSelector } from "react-redux";

export default function UserSelected({ userDetails }) {
  const { onlineUsers } = useSelector((state) => state.socketReducer);
  const isOnline = onlineUsers?.includes(userDetails?._id);

  return (
    <div className="flex items-center cursor-pointer mt-2 mb-2 rounded-md">
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
