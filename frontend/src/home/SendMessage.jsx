import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendMessageThunk } from "../store/slice/message/message.thunk";

export default function SendMessage() {
  const dispatch = useDispatch();
  const { selectedUser } = useSelector((state) => state.userReducer);
  const [message, setMessage] = useState("");

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = () => {
    dispatch(sendMessageThunk({ receiverId: selectedUser?._id, message }));
    setMessage("");
  };

  // handle Enter on input
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };
  return (
    <div className=" flex p-3 border-t-2  border-t-gray-300 pt-5 bg-gray-400">
      <input
        onKeyDown={handleKeyDown}
        type="text"
        placeholder="type here..."
        className="input w-full font-mono text-lg"
        onChange={handleInputChange}
        value={message}
      />
      <button onClick={handleSubmit} className="btn ml-4">
        Send
      </button>
    </div>
  );
}
