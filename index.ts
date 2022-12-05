import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import * as dotenv from 'dotenv'

dotenv.config()

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = process.env.PORT || 8080;

async function main() {
  await mongoose.connect(`${process.env.MONGODB_LINK}`)
  console.log("Connected to MongoDB");
}

main().catch((err) => {
  console.error(err);
});

const TodoSchema = new mongoose.Schema({
  content: String,
  completed: Boolean,
});

const Todo = mongoose.model("Todo", TodoSchema);

app.get("/", async (req, res) => {
  const find = await Todo.find();
  res.send(find)
});

app.post("/", async (req, res) => {
  const todo = new Todo({
    content: req.body.content,
    completed: false,
  });
  await todo.save();
  res.send("Todo added");
});

app.put("/:id", async (req, res) => {
  await Todo.findByIdAndUpdate(req.params.id, {
    completed: req.body.completed,
  });
  res.send("Todo updated");
});

app.delete("/:id", async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.send("Todo deleted");
});

app.delete("/", async (req, res) => {
  await Todo.deleteMany();
  res.send("All todos deleted");
});

app.listen(port, () => {
  console.log(`server listening at http://localhost:${port}`);
});
