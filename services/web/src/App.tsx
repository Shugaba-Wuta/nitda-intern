import React from "react";
import { Provider } from "react-redux";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { ColorModeContext, useMode } from "@src/theme";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { store } from "@src/store";
import LoginPage from "@pages/login/Login";
import ErrorDisplay from "@components/AlertDisplay";
import Sidebar from "@components/Sidebar";
import Topbar from "@components/Topbar";
import { ProtectedRoute } from "@components/ProtectedRoute";


function App() {
	const [theme, colorMode] = useMode();

	return (
		<React.StrictMode>
			<Provider store={store}>


				<ColorModeContext.Provider value={colorMode}>
					<ThemeProvider theme={theme}>
						<CssBaseline />
						<ErrorDisplay />
						<BrowserRouter>
							<Routes>
								<Route path="/">
									<Route path="login" element={<LoginPage title="Login" />} />
									<Route path="dashboard" element={<> <Topbar /> <Sidebar /></>} >
										<Route path="in" element={
											<ProtectedRoute children={<div>Nested</div>} />
										}></Route>
									</Route>
								</Route>
								<Route path="/admin" element={<div>ADMIN</div>} />
							</Routes>
						</BrowserRouter>

					</ThemeProvider>
				</ColorModeContext.Provider>
			</Provider>

		</React.StrictMode>

	);
}

export default App;
