import { asyncHandler } from "../utility/asyncHandler.utility.js";
import { ErrorHandler } from "../utility/errorHandler.utility.js";
import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getSocketId, io } from "../socket/socket.js";

export const sendMessage = asyncHandler(async (req, res, next) => {
  const senderId = req.user._id;
  const { receiverId } = req.params;
  const { message } = req.body;

  if (!senderId || !receiverId || !message) {
    return next(new ErrorHandler("All fields are required", 400));
  }

  let conversation = await Conversation.findOne({
    participants: { $all: [senderId, receiverId] },
  });

  if (!conversation) {
    conversation = await Conversation.create({
      participants: [senderId, receiverId],
    });
  }

  const newMessage = await Message.create({
    senderId,
    receiverId,
    message,
  });

  if (newMessage) {
    conversation.messages.push(newMessage._id);
    await conversation.save();
  }

  // socket.io
  const socketId = getSocketId(receiverId);
  if (socketId) {
    // because if the user is not online then we don't have the socketId
    io.to(socketId).emit("newMessage", newMessage);
  }

  res.status(200).json({
    success: true,
    newMessage,
  });
});

export const getMessages = asyncHandler(async (req, res, next) => {
  const myId = req.user._id;
  const { otherParticipantId } = req.params;

  if (!myId || !otherParticipantId) {
    return next(new ErrorHandler("All fields are required", 400));
  }

  const conversation = await Conversation.findOne({
    participants: { $all: [myId, otherParticipantId] },
  }).populate("messages");

  res.status(200).json({
    success: true,
    conversation,
  });
});
