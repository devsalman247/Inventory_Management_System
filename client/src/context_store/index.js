import { createContext } from "react";
import http from "../api";

const AuthContext = createContext();

const setToken = (token) => {
	window.localStorage.setItem("token", token);
};

const removeToken = () => {
	window.localStorage.removeItem("token");
};

const setAuth = (user, context) => {
	setToken(user.token);
	context.setIsLoggedIn(true);
	context.setLoggedInUser(user);
	http.refreshToken();
};

const purgeAuth = (context) => {
	removeToken();
	context.setIsLoggedIn(false);
	context.setLoggedInUser(null);
};

export { AuthContext, setAuth, purgeAuth };
