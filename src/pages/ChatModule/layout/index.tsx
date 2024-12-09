import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { DRAWER_WIDTH } from "../../../utils/common";
import SideDrawer from "../../../components/SideDrawer";
import ChatModule from "../ChatWindow";
import LightModeIcon from "@mui/icons-material/LightMode";
import useAppTheme from "../../../hooks/useAppTheme";
import ModeNightIcon from "@mui/icons-material/ModeNight";
import { THEMES } from "../../../stores/slices/utilSlice";

const themeToggle = {
  display: "flex",
  marginLeft: "auto",
  cursor: "pointer",
};

function ChatLayout() {
  const { updateTheme, currentThemeName } = useAppTheme();

  return (
    <Box sx={{ display: "flex", height: "100%" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: `calc(100% - ${DRAWER_WIDTH}px)`,
          ml: `${DRAWER_WIDTH}px`,
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Chat
          </Typography>
          <Box sx={{ display: "flex", marginLeft: "auto" }}>
            {currentThemeName === THEMES.LIGHT ? (
              <LightModeIcon onClick={updateTheme} sx={themeToggle} />
            ) : (
              <ModeNightIcon onClick={updateTheme} sx={themeToggle} />
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <SideDrawer />
      <Box
        component="main"
        sx={{
          flex: 1,
          bgcolor: "background.default",
          p: 3,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Toolbar />
        <ChatModule />
      </Box>
    </Box>
  );
}

export default ChatLayout;
