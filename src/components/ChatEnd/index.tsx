import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function ChatEnd() {
  const navigate = useNavigate();
  return (
    <Box>
      <Typography
        variant="h6"
        component="h2"
        sx={{ textAlign: "center", mt: 2 }}
      >
        The conversation has ended. Thank you!
      </Typography>
      <Box sx={{ display: "flex" }}>
        <Button
          variant="contained"
          sx={{
            width: "fit-content",
            mx: "auto",
            mt: 2,
          }}
          onClick={() => navigate(`/`)}
        >
          Start a new chat!
        </Button>
        <Button
          sx={{
            width: "fit-content",
            mx: "auto",
            mt: 2,
          }}
          onClick={() => setIsChatEndModalOpen(true)}
        >
          View feedback
        </Button>
      </Box>
    </Box>
  );
}
