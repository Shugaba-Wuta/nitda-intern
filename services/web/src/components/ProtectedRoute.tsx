import { useLocation, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "@src/store";
import { useEffect } from "react";
import { IChildren } from "@src/types";
import { refreshThunk } from "@src/store/authSlice";



const REQUEST_TIME_BUFFER = 10_000

export const ProtectedRoute = ({ children }: IChildren) => {
	const auth = useAppSelector((state) => state.auth);
	const { search, pathname } = useLocation();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();


	useEffect(() => {
		const queryParams = new URLSearchParams(search);
		if (pathname.length > 1) {

			queryParams.append("_continue", pathname);
		}
		const queryParamsWithRedirect = queryParams.toString();
		const tokenExp = auth.userInfo?.exp || 0;
		if (tokenExp * 1000 < (Date.now() - REQUEST_TIME_BUFFER)) {
			// Token has expired: Fetch a new one.
			dispatch(refreshThunk())
				.unwrap()
				.then(() => {
				})
				.catch((err) => {
					err
					navigate(`/login?${queryParamsWithRedirect}`)
				})
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])


	return children

};
