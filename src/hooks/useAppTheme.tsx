import { useMediaQuery } from "@mui/material";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUtilState, THEMES, toggleTheme } from "../stores/slices/utilSlice";
import { darkTheme, lightTheme } from "../theme";

export default function useAppTheme() {
  const dispatch = useDispatch();
  const { theme } = useSelector(getUtilState);
  const isSystemModeDark = useMediaQuery("(prefers-color-scheme: dark)");

  const isDarkTheme = useMemo(() => {
    if (theme === THEMES.SYSTEM) return isSystemModeDark;
    return theme === THEMES.DARK;
  }, [theme, isSystemModeDark]);

  const updateTheme = () => {
    dispatch(toggleTheme(isDarkTheme ? THEMES.LIGHT : THEMES.DARK));
  };

  const currentTheme = useMemo(
    () => (isDarkTheme ? darkTheme : lightTheme),
    [isDarkTheme]
  );

  //NOTE: Using it for example can be removed
  const currentThemeName = isDarkTheme ? THEMES.DARK : THEMES.LIGHT;

  return {
    theme,
    isDarkTheme,
    updateTheme,
    currentTheme,
    isSystemModeDark,
    currentThemeName,
  };
}
