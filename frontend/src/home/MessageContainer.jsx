import { useDispatch, useSelector } from "react-redux";
import Message from "./Message";
import User from "./User";
import { useEffect } from "react";
import { getMessageThunk } from "../store/slice/message/message.thunk";
import SendMessage from "./SendMessage";
import UserSelected from "./UserSelected";

export default function MessageContainer() {
  const { selectedUser } = useSelector((state) => state.userReducer);
  const { messages } = useSelector((state) => state.messageReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedUser) {
      dispatch(getMessageThunk({ otherParticipantId: selectedUser?._id }));
    }
  }, [selectedUser, messages]);

  return (
    <>
      {selectedUser ? (
        <>
          <div className="w-full h-screen flex flex-col">
            {/* user */}
            <div className="-mt-2 pb-1 pl-2 border-b-2  border-b-gray-300 bg-[#9aa3aa] rounded-sm">
              <UserSelected userDetails={selectedUser} />
            </div>

            {/* messages  */}
            <div className="p-3 h-full overflow-y-auto">
              {messages?.map((messageDetails) => (
                <Message
                  key={messageDetails?._id}
                  messageDetails={messageDetails}
                />
              ))}
            </div>

            {/* message input  */}
            <SendMessage />
          </div>
        </>
      ) : (
        <div className="flex flex-col gap-5 w-full items-center justify-center bg-[#B1B3B3]">
          <h2 className="text-3xl">Welcome to talk.</h2>
          <p className="text-2xl">Please select a user to chat with</p>
        </div>
      )}
    </>
  );
}
