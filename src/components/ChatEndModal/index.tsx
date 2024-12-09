import {
  Box,
  Button,
  Modal,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveActiveConversation } from "../../stores/slices/chatSlice";
import { RootState } from "../../stores/store";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #929292",
  boxShadow: 24,
  p: 4,
  padding: "22px",
  borderRadius: "8px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
};

interface ChatEndModalProps {
  handleClose: () => void;
}

export default function ChatEndModal(props: ChatEndModalProps) {
  const { handleClose } = props;
  const currentConversation = useSelector(
    (state: RootState) => state.chat.activeConversation
  );
  const [rating, setRating] = useState(currentConversation?.rating || null);
  const [feedback, setFeedback] = useState(currentConversation?.feedback || "");
  const dispatch = useDispatch();
  console.log(currentConversation);
  const saveConversation = () => {
    dispatch(saveActiveConversation({ rating, feedback }));
    handleClose();
  };

  return (
    <Modal
      open
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Feedback
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Thank you for chatting! 😊 How was your experience today?
        </Typography>
        <Rating
          sx={{ marginTop: "1rem", marginBottom: "1rem" }}
          name="half-rating"
          defaultValue={rating === null ? 0 : rating}
          precision={0.5}
          onChange={(e) => setRating(e.target.value)}
          disabled={currentConversation?.isConversationEnded}
        />
        <TextField
          fullWidth
          label="Share Feedback"
          id="fullWidth"
          multiline
          maxRows={2}
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          disabled={currentConversation?.isConversationEnded}
        />
        {!currentConversation?.isConversationEnded && (
          <Button
            onClick={saveConversation}
            variant="outlined"
            sx={{
              width: "fit-content",
              marginTop: "1rem",
            }}
          >
            Save
          </Button>
        )}
      </Box>
    </Modal>
  );
}
