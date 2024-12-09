import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store, persistor } from "./stores/store.ts";
import { PersistGate } from "redux-persist/integration/react";
import { ThemeProvider } from "@emotion/react";
import useAppTheme from "./hooks/useAppTheme.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
        <ThemeApp />
      </PersistGate>
    </Provider>
  </StrictMode>
);

function ThemeApp() {
  const { currentTheme } = useAppTheme();

  return (
    <ThemeProvider theme={currentTheme}>
      <App />
    </ThemeProvider>
  );
}

export default ThemeApp;
