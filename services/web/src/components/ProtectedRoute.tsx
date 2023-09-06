import { useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "@src/store";
import { useEffect } from "react";
import { IChildren } from "@src/types";



export const ProtectedRoute = ({ children }: IChildren) => {
	const auth = useAppSelector((state) => state.auth);
	const { search, pathname } = useLocation();
	const navigate = useNavigate();




	useEffect(() => {
		const queryParams = new URLSearchParams(search);
		queryParams.append("_continue", pathname);
		const queryParamsWithRedirect = queryParams.toString();
		if (!auth.success) {
			return navigate("/login?" + queryParamsWithRedirect, { replace: false });
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [auth.success, pathname, search])


	return children

};
