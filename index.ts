import express from "express";
import cors from "cors";
import * as dotenv from 'dotenv'

dotenv.config()

const app = express();
app.use(cors());

const port = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.json("Hello from server");
});

app.listen(port, () => {
  console.log(`server listening at http://localhost:${port}`);
});
