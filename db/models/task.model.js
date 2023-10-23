import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: String,
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    assignTo:  {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    deadLine: Date
})

const taskModel = mongoose.model("Task", taskSchema);
export default taskModel;