import express from "express";
import { addtask, afterdeadLine, deleteTask, getallTask, updateTask,gettask,updateTaskStatus } from "./task.controller.js";

const taskRouts = express.Router();
taskRouts.post("/addtask", addtask)
taskRouts.get("/tasks", getallTask)
taskRouts.patch("/updatetask/:id", updateTask)
taskRouts.patch("/updatetaskuser", updateTaskStatus)
taskRouts.delete("/deletetask/:id", deleteTask)

taskRouts.get("/notdonetask", afterdeadLine)
taskRouts.get("/task/:id", gettask)
export default taskRouts;