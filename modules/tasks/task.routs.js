import express from "express";
import { addtask, afterdeadLine, deleteTask, getallTask, updateTask } from "./task.controller.js";

const taskRouts = express.Router();
taskRouts.post("/addtask", addtask)
taskRouts.get("/tasks", getallTask)
taskRouts.patch("/updatetask/:id", updateTask)
taskRouts.delete("/deletetask/:id", deleteTask)

taskRouts.get("/notdonetask", afterdeadLine)
export default taskRouts;