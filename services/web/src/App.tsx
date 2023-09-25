import React from "react";
import { Provider } from "react-redux";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { ColorModeContext, useMode } from "@src/theme";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { store } from "@src/store";
import LoginPage from "@pages/login/Login";
import ErrorDisplay from "@components/AlertDisplay";
import Error404 from "./pages/404";
import Layout from "@components/page-layout/Layout";


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
								<Route path="/login" element={<LoginPage title="Login" />} />
								<Route path="/admin" element={<div>ADMIN</div>} />
								<Route path="/error" element={<Error404 />} />
								<Route path="/"
									element={
										<Layout >
											<div>Hello World</div>
										</Layout>
									}>
									<Route  />
								</Route>
								<Route path="/*" element={<Error404 />} />

							</Routes>
						</BrowserRouter>

					</ThemeProvider>
				</ColorModeContext.Provider>
			</Provider>

		</React.StrictMode>

	);
}

export default App;
