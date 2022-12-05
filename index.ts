import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import * as dotenv from 'dotenv'

dotenv.config()

const app = express();
app.use(cors());

const port = process.env.PORT || 8080;

async function main() {
  await mongoose.connect(`${process.env.MONGODB_LINK}`)
  console.log("Connected to MongoDB");
}

main().catch((err) => {
  console.error(err);
});

app.get("/", (req, res) => {
  res.json("Hello from server");
});

app.listen(port, () => {
  console.log(`server listening at http://localhost:${port}`);
});
