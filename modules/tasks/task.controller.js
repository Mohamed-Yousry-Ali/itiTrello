import Jwt from "jsonwebtoken"
import taskModel from "../../db/models/task.model.js";
import userModel from "../../db/models/user.model.js";

const addtask = async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    console.log(token)
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized - Token not provided' });
    }

    //Verify the token and get the user ID
    Jwt.verify(token, 'toke', async (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Unauthorized - Invalid token' });
        }

        let usertoken = decoded.id;
        let user = await userModel.findById(usertoken)
        let asign = await userModel.findById(req.body.assignTo)
        console.log(req.body.assignTo)
        let { title, description, status, assignTo, deadLine } = req.body;
        let addTask = await taskModel.insertMany({ title, description, status, assignTo:asign, deadLine, userId: user })
        user.task.push(addTask[0]._id);
        await user.save();
        res.status(201).json({ message: "Added Success", addTask })
    })

}




const updateTask = async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    console.log(token)
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized - Token not provided' });
    }

    //Verify the token and get the user ID
    Jwt.verify(token, 'toke', async (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Unauthorized - Invalid token' });
        }

        const taskid = req.params.id;

        // Find the task by ID
        const task = await taskModel.findById(taskid);
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        // Verify that the user making the request is the creator of the task
        if (task.userId.toString() !== decoded.id) {
            return res.status(403).json({ error: 'You Not The Creator' });
        }


        let updatedTask = await taskModel.findByIdAndUpdate(taskid, { title: req.body.title, description: req.body.description, status: req.body.status }, { new: true })
        res.json({ message: "Update Sucess", updatedTask })

    })
}

const deleteTask = async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    console.log(token)
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized - Token not provided' });
    }

    //Verify the token and get the user ID
    Jwt.verify(token, 'toke', async (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Unauthorized - Invalid token' });
        }

        const taskid = req.params.id;

        // Find the task by ID
        const task = await taskModel.findById(taskid);
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        // Verify that the user making the request is the creator of the task
        if (task.userId.toString() !== decoded.id) {
            return res.status(403).json({ error: 'You Not The Creator' });
        }

        let delTesk = await taskModel.findByIdAndDelete(task)
        res.json({ message: "Deleted Success", delTesk })
    })
}


const getallTask = async (req, res) => {
    const alltask = await taskModel.find().populate("userId").populate("assignTo")
    res.status(201).json({ message: "All Tasks", alltask })
}


const gettask = async (req, res) => {
    const taskid = req.params.id;

    // Find the task by ID
    const task = await taskModel.findById(taskid);
  

    res.status(201).json({ message: "All Tasks", task })
}


const afterdeadLine = async (req, res) => {
    const alltask = await taskModel.find({
        status: { $ne: 'done' },
        deadline: { $gte: new Date() },
    }

    ).populate("userId")
    res.status(201).json({ message: "All Tasks", alltask })
}



export {
    addtask,
    getallTask,
    updateTask,
    deleteTask,
    afterdeadLine,
    gettask
}