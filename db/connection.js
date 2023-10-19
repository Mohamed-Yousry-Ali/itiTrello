import mongoose  from "mongoose";

export const connection = ()=>{
    mongoose.connect("mongodb+srv://ititrello:ititrello@myatlasclusteredu.2ru7gca.mongodb.net/")
    .then( ()=> console.log("Database Connected"))
    .catch( (err)=> console.log(`Database error ${err}`))
}