import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Drawer from "@mui/material/Drawer";
import { Toolbar, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { Conversation } from "../../stores/slices/types";
import { styles } from "./styles";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../stores/store";

export default function SideDrawer() {
  const conversations = useSelector(
    (state: RootState) => state.chat.conversations
  );
  const navigate = useNavigate();
  return (
    <Drawer sx={styles.container} variant="permanent" anchor="left">
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          Jarvis AI
        </Typography>
      </Toolbar>
      <Divider />
      <List sx={{ display: "flex", flexDirection: "column-reverse" }}>
        {conversations.map((conversation: Conversation) => (
          <ListItem
            key={conversation.id}
            disablePadding
            onClick={() => navigate(`/${conversation.id}`)}
          >
            <ListItemButton>
              <ListItemText
                primary={
                  conversation.messages[0]?.content || "Empty conversation"
                }
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}
