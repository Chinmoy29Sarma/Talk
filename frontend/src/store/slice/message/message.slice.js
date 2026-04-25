import { createSlice } from "@reduxjs/toolkit";
import { getMessageThunk, sendMessageThunk } from "./message.thunk";

const initialState = {
  screenLoading: false,
  buttonLoading: false,
  messages: null,
};

export const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setNewMessage: (state, action) => {
      state.messages = state.messages || [];
      state?.messages?.push(action?.payload);
    },
  },
  extraReducers: (builder) => {
    // send message
    builder.addCase(sendMessageThunk.pending, (state) => {
      state.buttonLoading = true;
    });
    builder.addCase(sendMessageThunk.fulfilled, (state, action) => {
      state.buttonLoading = false;
      state.messages = state.messages || [];
      state?.messages?.push(action?.payload?.newMessage);
    });
    builder.addCase(sendMessageThunk.rejected, (state) => {
      state.buttonLoading = false;
    });

    // get message
    builder.addCase(getMessageThunk.pending, (state) => {
      state.screenLoading = true;
    });
    builder.addCase(getMessageThunk.fulfilled, (state, action) => {
      state.messages = action?.payload?.conversation?.messages;
      state.screenLoading = false;
    });
    builder.addCase(getMessageThunk.rejected, (state) => {
      state.screenLoading = false;
    });
  },
});

// Action creators are generated for each case reducer function
export const { setNewMessage } = messageSlice.actions;

export default messageSlice.reducer;
