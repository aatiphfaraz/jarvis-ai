import { Box } from "@mui/material";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import { useDispatch } from "react-redux";
import { Review } from "../../stores/slices/types";
import { reviewConversationReply } from "../../stores/slices/chatSlice";

interface ChatMessageProps {
  isMessageSent: boolean;
  content?: string;
  id?: string;
  responseReview?: Review; // 'liked' | 'disliked' | undefined
}

export default function ChatMessage({
  isMessageSent,
  content = "",
  responseReview,
  id = "",
}: ChatMessageProps) {
  const dispatch = useDispatch();

  // Handlers for review actions
  const handleReview = (review: Review) => {
    dispatch(reviewConversationReply({ id, review }));
  };

  // Styles
  const messageBoxStyles = {
    display: "flex",
    flexDirection: "column",
    height: "max-content",
    maxWidth: "80%",
    marginLeft: isMessageSent ? "auto" : "none",
    marginRight: isMessageSent ? "none" : "auto",
    padding: "12px",
    backgroundColor: "#1b76d2",
    color: "#ffffff",
    borderRadius: "12px",
    marginBottom: "1rem",
  };

  const iconStyles = (isActive: boolean) => ({
    cursor: "pointer",
    color: isActive ? "aqua" : "white",
  });

  return (
    <Box sx={messageBoxStyles}>
      {content}
      {!isMessageSent && content && (
        <Box sx={{ display: "flex", gap: "16px" }}>
          <ThumbUpOutlinedIcon
            sx={iconStyles(responseReview === "liked")}
            onClick={() => handleReview("liked")}
          />
          <ThumbDownOffAltOutlinedIcon
            sx={iconStyles(responseReview === "disliked")}
            onClick={() => handleReview("disliked")}
          />
        </Box>
      )}
    </Box>
  );
}
