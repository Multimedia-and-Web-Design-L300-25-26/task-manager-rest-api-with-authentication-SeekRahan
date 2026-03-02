import Task from "../models/Task.js";

export const createTask = async (req, res) => {
  const { title, description } = req.body;

  if (!title) {
    return res.status(400).json({ message: "Please add a title" });
  }

  const task = await Task.create({
    title,
    description,
    owner: req.user._id,
  });

  res.status(201).json(task);
};

export const getTasks = async (req, res) => {
  const tasks = await Task.find({ owner: req.user._id });

  res.json(tasks);
};

export const deleteTask = async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  // Check for user
  if (!req.user) {
    return res.status(401).json({ message: "User not found" });
  }

  // Make sure the logged in user matches the task owner
  if (task.owner.toString() !== req.user._id.toString()) {
    return res.status(401).json({ message: "User not authorized" });
  }

  await task.deleteOne();

  res.json({ id: req.params.id });
};
