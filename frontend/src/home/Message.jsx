import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

export default function Message({ messageDetails }) {
  const { userProfile } = useSelector((state) => state.userReducer);

  const messageRef = useRef(null);

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <>
      <div
        ref={messageRef}
        className={`chat ${userProfile?._id === messageDetails?.senderId ? "chat-end" : "chat-start"}`}
      >
        <div className="chat-header">
          <time className="text-xs opacity-50">2 hours ago</time>
        </div>
        <div className="chat-bubble">{messageDetails?.message}</div>
      </div>
    </>
  );
}
