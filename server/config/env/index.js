export default {
	secret: process.env.NODE_ENV === "production" ? process.env.SECRET_KEY : "secret",
	backend: process.env.NODE_ENV === "production" ? process.env.BACKEND : "http://localhost:5000",
};
