import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const THEMES = {
  SYSTEM: "system",
  LIGHT: "light",
  DARK: "dark",
} as const;

type Theme = (typeof THEMES)[keyof typeof THEMES];

interface UtilState {
  theme: Theme;
}

const initialState: UtilState = {
  theme: THEMES.SYSTEM, // Default theme is SYSTEM
};

export const utilSlice = createSlice({
  name: "util",
  initialState,
  reducers: {
    toggleTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload;
    },
  },
});

export const { toggleTheme } = utilSlice.actions;
export const getUtilState = (state: RootState): UtilState => state.util;

export default utilSlice.reducer;
