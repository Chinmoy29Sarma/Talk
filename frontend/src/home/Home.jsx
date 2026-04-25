import UserSidebar from "./UserSidebar";
import MessageContainer from "./MessageContainer";
import { ProtectedRoute } from "../components/ProtectedRoute";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  initializeSocket,
  setOnlineUsers,
} from "../store/slice/socket/socket.slice";
import { setNewMessage } from "../store/slice/message/message.slice";

function Home() {
  const { isAuthenticated, userProfile } = useSelector(
    (state) => state.userReducer,
  );
  const { socket } = useSelector((state) => state.socketReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(initializeSocket(userProfile?._id));
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (socket) {
      socket.on("onlineUsers", (onlineUsers) => {
        dispatch(setOnlineUsers(onlineUsers));
      });

      socket.on("newMessage", (newMessage) => {
        dispatch(setNewMessage(newMessage));
      });

      return () => {
        socket.close();
      };
    }
  }, [socket]);

  return (
    <ProtectedRoute>
      <div className="flex">
        <UserSidebar />
        <MessageContainer />
      </div>
    </ProtectedRoute>
  );
}

export default Home;
