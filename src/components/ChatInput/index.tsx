import { Box, Button, TextField } from "@mui/material";
import { styles } from "./style";
import SendIcon from "@mui/icons-material/Send";
import { useState } from "react";

interface ChatInputProps {
  handleSendMessage: (message: string) => void;
  disableInput: boolean;
  handleModalClose: () => void;
}

export default function ChatInput(props: ChatInputProps) {
  const { handleSendMessage, disableInput, handleModalClose } = props;
  const [userInput, setUserInput] = useState<string>("");

  return (
    <Box>
      <Box sx={styles.root}>
        <TextField
          fullWidth
          label="Enter Prompt"
          id="fullWidth"
          multiline
          maxRows={6}
          onChange={(e) => setUserInput(e.target.value)}
          value={userInput}
        />
        <Button
          disabled={disableInput}
          variant="contained"
          sx={styles.sendMsgCta}
          onClick={() => {
            handleSendMessage(userInput);
            setUserInput("");
          }}
        >
          <SendIcon />
        </Button>
      </Box>
      <Button
        variant="outlined"
        sx={{
          width: "fit-content",
          mx: "auto",
          mt: 2,
        }}
        onClick={handleModalClose}
      >
        End chat
      </Button>
    </Box>
  );
}
