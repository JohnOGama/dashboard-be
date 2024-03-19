import app from "./app";
import "dotenv/config";
import mongoose from "mongoose";

const PORT = process.env.PORT || 8000;
const MONGO_URL = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URL!)
  .then(() => {
    console.log("MONGO DB CONNECTED");
    app.listen(PORT, () => {
      console.log(`Server listening on port ${process.env.PORT}`);
    });
  })
  .catch((error) => console.log("ERROR IN DB: ", error.message));
