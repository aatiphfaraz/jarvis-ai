import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChatState, Conversation, Message } from "./types";
import { generateId } from "../../utils/common";

const initialState: ChatState = {
  conversations: [],
  activeConversation: null,
};

const initiateChat = (): Conversation => {
  return {
    id: generateId("conv_"),
    createdAt: Date.now(),
    messages: [],
    rating: null,
    feedback: "",
    isConversationEnded: false,
  };
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    initiateNewConversation: (state) => {
      state.activeConversation = initiateChat();
    },
    reviewConversationReply: (
      state,
      action: PayloadAction<Pick<Message, "id" | "review">>
    ) => {
      const { id, review } = action.payload;
      const messageThread = state.activeConversation?.messages?.find(
        (msg) => msg.id === id
      );
      if (messageThread) {
        messageThread.review = review;
      }
    },
    selectPreviousConversation: (
      state,
      action: PayloadAction<Conversation>
    ) => {
      state.activeConversation = action.payload;
    },
    addMessageToActiveConversation: (state, action: PayloadAction<Message>) => {
      if (state.activeConversation) {
        state.activeConversation.messages.push(action.payload);
      }
    },
    saveActiveConversation: (
      state,
      action: PayloadAction<Pick<Conversation, "rating" | "feedback">>
    ) => {
      if (state.activeConversation) {
        const { rating, feedback } = action.payload;
        state.activeConversation.rating = rating;
        state.activeConversation.feedback = feedback;
        state.activeConversation.isConversationEnded = true;
        state.conversations.push(state.activeConversation);
        state.activeConversation = null;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  initiateNewConversation,
  addMessageToActiveConversation,
  saveActiveConversation,
  selectPreviousConversation,
  reviewConversationReply,
} = chatSlice.actions;

export default chatSlice.reducer;
