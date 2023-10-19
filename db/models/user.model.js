import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userName:{
        type : String,
        minLength: [3,"min Char is 3"],
        maxLength: [10,"max Char is 10"],
    },
    email:{
        type:String,
        required : true,
        unique : true
    },
    password :{
        type:String,
        required:true
    },
    age:Number,
    gender:String,
    phone: String,
    isVerified:Boolean,
    task:[
        {
            type: mongoose.Types.ObjectId,
            ref: "Task"
        }
    ],
    deleted: { type: Boolean, default: false },
    isLogged: { type: Boolean, default: false }
},{
    timestamps:true
})


const userModel = mongoose.model("User",userSchema);

export default userModel;