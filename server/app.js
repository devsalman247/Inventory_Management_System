import dotenv from "dotenv";
dotenv.config();

import express from "express";
import httpResponse from "express-http-response";
import mongoose from "mongoose";
import cors from "cors";
import router from "./routes/index.js";

const app = express();
const PORT = process.env.PORT || 8000;

mongoose
	.connect(`${process.env.MONGO_URI_LOCAL}`)
	.catch((err) => {
		console.log(err);
	})
	.then(() => {
		console.log(`connected to db in Dev environment`);
	});

mongoose.set("debug", true);

app.use(express.json());
app.use(cors());
app.use(router);
app.use(httpResponse.Middleware);
app.use(express.static("public"));

app.listen(PORT, () => {
	console.log(`Listening at port ${PORT}.`);
});
