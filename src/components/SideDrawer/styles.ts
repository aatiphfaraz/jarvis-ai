import { DRAWER_WIDTH } from "../../utils/common";

export const styles = {
  container: {
    width: DRAWER_WIDTH,
    flexShrink: 0,
    "& .MuiDrawer-paper": {
      width: DRAWER_WIDTH,
      boxSizing: "border-box",
    },
  },
};
