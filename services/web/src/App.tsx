import React from "react";
import { Provider } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { ColorModeContext, useMode } from "@src/theme";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { store } from "@src/store";
import LoginPage from "@pages/login/Login";
// import Sidebar from "@components/Sidebar";
// import Topbar from "@components/Topbar";
// import { useAuth } from "@src/hooks/useAuth";

function App() {
  const [theme, colorMode] = useMode();

  return (
    <React.StrictMode>
      <Provider store={store}>


        <ColorModeContext.Provider value={colorMode}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <div className="app">
              <Routes>
                <Route path="/" element={<LoginPage title="Login" />}></Route>
              </Routes>
            </div>
          </ThemeProvider>
        </ColorModeContext.Provider>
      </Provider>

    </React.StrictMode>

  );
}

export default App;
