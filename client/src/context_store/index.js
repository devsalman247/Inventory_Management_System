import { createContext } from "react";

const AuthContext = createContext();

const setToken = (token) => {
	window.localStorage.setItem("token", token);
};

const removeToken = () => {
	window.localStorage.removeItem("token");
};

const getToken = () => {
	const user = window.localStorage.getItem("user");
	return user?.token;
};

const setAuth = (user, context) => {
	setToken(user.token);
	context.setIsLoggedIn(true);
	context.setLoggedInUser(user);
};

const purgeAuth = (context) => {
	removeToken();
	context.setIsLoggedIn(false);
	context.setLoggedInUser(null);
};

export { AuthContext, setAuth, purgeAuth, getToken };
