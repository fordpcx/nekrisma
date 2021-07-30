import { combineReducers } from "redux";
import * as Types from "./types";

const user = (state = {}, action) => {
	switch (action.type) {
	case Types.LOGIN_USER_DONE:
	case Types.LOGIN_USER_FAILED:
		return action.data;
	case Types.RESET_USER:
	case Types.LOGOUT_USER:
	case Types.LOGIN_USER_LOADING:
		return {};
	default:
		return state;
	}
};

const isLoginLoading = (state = false, action) => {
	switch (action.type) {
	case Types.LOGIN_USER_LOADING:
		return true;
	case Types.LOGIN_USER_FAILED:
	case Types.LOGIN_USER_DONE:
	case Types.RESET_USER:
		return false;
	default:
		return state;
	}
};

const isLoggedIn = (state = false, action) => {
	switch (action.type) {
	case Types.LOGIN_USER_DONE:
		return true;
	case Types.LOGIN_USER_FAILED:
	case Types.RESET_USER:
	case Types.LOGOUT_USER:
		return false;
	default:
		return state;
	}
};

export default combineReducers({
	user,
	isLoginLoading,
	isLoggedIn,
});