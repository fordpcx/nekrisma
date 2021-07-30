import { createStore, applyMiddleware, combineReducers } from "redux";
import { createRouterMiddleware, initialRouterState, routerReducer } from "connected-next-router";
import { createLogger } from "redux-logger";
import { HYDRATE, createWrapper } from "next-redux-wrapper";
import { default as ReduxThunk } from "redux-thunk";
import { loadState, saveState } from "./localStorage";
import Router from "next/router";

// actions
import * as homeActions from "./home/actions";
import * as loginActions from "./login/actions";

// reducers
import login from "./login/reducer";

const reducer = combineReducers({
	login,
	router: routerReducer,
});

const bindMiddleware = (middleware) => {
	if (process.env.NODE_ENV !== "production") {
		const { composeWithDevTools } = require("redux-devtools-extension");

		return composeWithDevTools(applyMiddleware(...middleware));
	}

	return applyMiddleware(...middleware);
};

const rootReducer = (state, action) => {
	if (action.type === HYDRATE) {
		const nextState = {
			...state,
			...action.payload,
		};

		if (typeof window !== "undefined" && state?.router) {
			// preserve router value on client side navigation
			nextState.router = state.router;
		}

		return nextState;
	} else if (action.type === "login/types/LOGOUT_USER") {
		const newState = { ...state };

		newState.login.user = {};

		return reducer(newState, action);
	} else {
		return reducer(state, action);
	}
};

const persistedState = loadState();

const _store = createStore(
	rootReducer,
	persistedState,
	bindMiddleware([
		ReduxThunk,
		createLogger(),
		createRouterMiddleware(),
	]),
);

const initStore = (context) => {
	const { asPath } = context.ctx || Router.router || {};

	let initialState;

	if (asPath) {
		initialState = {
			router: initialRouterState(asPath),
		};
	}

	_store.subscribe(() => {
		saveState({
			...initialState,
			...store.getState(),
		});
	});

	return _store;
};

export const actions = {
	...homeActions,
	...loginActions,
};
export const store = _store;
export const wrapper = createWrapper(initStore);
