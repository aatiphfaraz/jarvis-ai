import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChatInput from "../../components/ChatInput";
import ChatMessage from "../../components/ChatMessage";
import useAutoScrollToBottom from "../../hooks/useScrollToBottom";
import ChatEndModal from "../../components/ChatEndModal";
import { JARVIS_MOCK_REPLY } from "../../constants/common";
import { generateId } from "../../utils/common";
import {
  addMessageToActiveConversation,
  initiateNewConversation,
  selectPreviousConversation,
} from "../../stores/slices/chatSlice";
import { Conversation, Message } from "../../stores/slices/types";
import { styles } from "./styles";
import { useParams } from "react-router-dom";
import ChatEnd from "../../components/ChatEnd";
import { RootState } from "../../stores/store";

export default function ChatModule() {
  const [isFetchingResponse, setIsFetchingResponse] = useState<boolean>(false);
  const [isChatEndModalOpen, setIsChatEndModalOpen] = useState<boolean>(false);

  const { id } = useParams();
  const currentConversation = useSelector(
    (state: RootState) => state.chat.activeConversation
  );
  const conversations = useSelector(
    (state: RootState) => state.chat.conversations
  );
  const dispatch = useDispatch();

  const containerRef = useAutoScrollToBottom();

  useEffect(() => {
    if (id) {
      const prevConversation = conversations.find(
        (conversation: Conversation) => conversation.id === id
      );
      if (prevConversation) {
        dispatch(selectPreviousConversation(prevConversation));
      }
    } else {
      dispatch(initiateNewConversation());
    }
  }, [id]);

  const handleSendMessage = (message: string) => {
    setIsFetchingResponse(true);
    dispatch(
      addMessageToActiveConversation({
        id: generateId("msg_"),
        createdAt: Date.now(),
        sender: "user",
        content: message,
      })
    );

    setTimeout(() => {
      setIsFetchingResponse(false);
      dispatch(
        addMessageToActiveConversation({
          id: generateId("msg_"),
          createdAt: Date.now(),
          sender: "ai",
          content: JARVIS_MOCK_REPLY,
        })
      );
    }, 1500);
  };

  return (
    <Box sx={styles.containerStyle}>
      <Box sx={styles.containerStyle} ref={containerRef}>
        {currentConversation?.messages?.map((msg: Message) => (
          <ChatMessage
            key={msg.id}
            isMessageSent={msg.sender === "user"}
            content={msg.content}
            responseReview={msg?.review}
            id={msg.id}
          />
        ))}
        {isFetchingResponse && <ChatMessage isMessageSent={false} />}
      </Box>
      {currentConversation?.isConversationEnded ? (
        <ChatEnd />
      ) : (
        <ChatInput
          handleSendMessage={handleSendMessage}
          disableInput={isFetchingResponse}
          handleModalClose={() => setIsChatEndModalOpen(true)}
        />
      )}
      {isChatEndModalOpen && (
        <ChatEndModal handleClose={() => setIsChatEndModalOpen(false)} />
      )}
    </Box>
  );
}
