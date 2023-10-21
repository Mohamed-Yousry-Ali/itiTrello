import userModel from "../../db/models/user.model.js"
import bcrypt from 'bcrypt';
import { json } from "express";
import Jwt from "jsonwebtoken";

const getAllUser = async (req, res) => {
    let allUsers = await userModel.find().populate("task");
    res.json({ message: "All Users", allUsers })
}

const signUp = async (req, res) => {
    try {
        let { email } = req.body;
        let userFounded = await userModel.findOne({ email: email })
        if (userFounded) {
            res.status(409).json({ message: "User Found" });
        } else {
            let hashPassword = bcrypt.hashSync(req.body.password, 7);
            let addUser = await userModel.insertMany({ ...req.body, password: hashPassword })
            res.status(201).json({ message: "signUp Success", addUser })
        }
    }
    catch (error) {
        res.json({ message: "Error", error })
    }
}

const signIn = async (req, res) => {
    let founded = await userModel.findOne({ email: req.body.email });
    if (founded) {
        let matched = bcrypt.compareSync(req.body.password, founded.password)
        if (matched) {
            let token = Jwt.sign({ id: founded.id , isAdmin: founded.isAdmin }, "toke")
            let updateLogout = await userModel.findByIdAndUpdate(founded._id, { isLogged: true }, { new: true })
            res.status(200).json({ message: "Welcome", updateLogout, token })
        } else {
            res.status(400).json({ message: "Wrong Password" });
        }
    } else {
        res.status(404).json({ message: "User Not Found" });

    }
}



const changePass = async (req, res) => {
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
        console.log(decoded.id)


        let userid = decoded.id
        const user = await userModel.findById(userid);


        const newPasswordHash = await bcrypt.hash(req.body.password, 10);
        user.password = newPasswordHash;
        await user.save();
        res.json({ message: "Update Sucess" })
    })

}


const updateUser = async (req, res) => {

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
        console.log(decoded.id)


        let userid = decoded.id
        let updatedUser = await userModel.findByIdAndUpdate(userid, { userName: req.body.userName, age: req.body.age }, { new: true })
        res.json({ message: "Update Sucess", updatedUser })
    }
    )
};




const deleteUser = async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    // use split to make diffrent between bearer and token in postman
    // console.log(token)
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized - Token not provided' });
    }

    //Verify the token and get the user ID
    Jwt.verify(token, 'toke', async (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Unauthorized - Invalid token' });
        }
        let userid = decoded.id;
        let delUser = await userModel.findByIdAndDelete(userid)
        res.json({ message: "Deleted Success", delUser })
    });

}

const deleteUserid = async(req,res)=>{
    const userid = req.params.id;
    let delUser = await userModel.findByIdAndDelete(userid)
    res.json({ message: "Deleted Success", delUser })
}

const softdeleteUser = async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    //split to make diffrent between bearer and token in postman
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized - Token not provided' });
    }
    //Verify the token and get the user ID
    Jwt.verify(token, 'toke', async (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Unauthorized - Invalid token' });
        }

        let userid = decoded.id;
        const user = await userModel.findById(userid);
        user.deleted = true
        await user.save();
        res.json({ message: "Soft Deleted Success" })
    });

}


const getSoftDelete = async (req, res) => {
    const getsoftdellUser = await userModel.find({ deleted: true });
    res.json({ message: "All Soft Deleted User", getsoftdellUser })
}



const logout = async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    //split to make diffrent between bearer and token in postman
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized - Token not provided' });
    }
    //Verify the token and get the user ID
    Jwt.verify(token, 'toke', async (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Unauthorized - Invalid token' });
        }
        let userid = decoded.id;
        let updateLogout = await userModel.findByIdAndUpdate(userid, { isLogged: false }, { new: true })
        res.json({ message: "Sucess Logout", updateLogout })
    })
}
export {
    getAllUser,
    signUp,
    signIn,
    changePass,
    updateUser,
  
    deleteUser,
    deleteUserid,
    softdeleteUser,
    getSoftDelete,
    logout
}