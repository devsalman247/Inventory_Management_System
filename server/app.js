import express from "express";
import httpResponse from "express-http-response";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

mongoose
  .connect("mongodb://127.0.0.1:27017/IMS")
  .catch((err) => {
    console.log(err);
  })
  .then(() => {
    console.log(`connected to db in Dev environment`);
  });

// mongoose.set('debug',true);

app.use(express.json());
app.use(cors());
app.use(httpResponse.Middleware);

app.listen(PORT, () => {
  console.log(`Listening at port ${PORT}.`);
});
