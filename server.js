const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// connect DB
mongoose.connect("mongodb+srv://admin:admin123@cluster0.erka6e8.mongodb.net/tasks?retryWrites=true&w=majority");

// schema
const TaskSchema = new mongoose.Schema({
  text: String
});

const Task = mongoose.model("Task", TaskSchema);

// routes
app.get("/tasks", async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

app.post("/tasks", async (req, res) => {
  const newTask = new Task({ text: req.body.text });
  await newTask.save();
  res.json(newTask);
});

app.delete("/tasks/:id", async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "deleted" });
});

app.listen(5000, () => console.log("Server running"));
