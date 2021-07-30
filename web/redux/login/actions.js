import { push } from "connected-next-router";
import * as Types from "./types";
import API from "@lib/Api";

export const LoginUser = (credentials) => (
	async (dispatch) => {
		try {
			dispatch({ type: Types.LOGIN_USER_LOADING });

			const user = await API.findUser(credentials);

			if (user && user.passwordMatched) {
				dispatch({
					type: Types.LOGIN_USER_DONE,
					data: user,
				});

				dispatch(push("/"));
			} else {
				dispatch({
					type: Types.LOGIN_USER_FAILED,
					data: user,
				});
			}

		} catch (err) {
			dispatch({
				type: Types.LOGIN_USER_FAILED,
				data: { passwordMatched: false },
			});
		}
	}
);

export const ResetUser = () => (
	async (dispatch) => dispatch({ type: Types.RESET_USER })
);

export const LogoutUser = () => (
	async (dispatch) => {
		dispatch({ type: Types.LOGOUT_USER });
		dispatch(push("/login"));
	}
);