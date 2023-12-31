import express from 'express'
import { changePass, deleteUser, getAllUser, getSoftDelete, logout, googlelogin ,signIn, signUp, softdeleteUser, updateUser ,deleteUserid, getTaskUser  } from './user.controller.js'
import validation from '../../middlware/validation.js'
import { signInSchema, signUpValidationSchema } from './user.validation.js'

const userRouts = express.Router()

userRouts.get("/user", getAllUser)
userRouts.get("/usertask", getTaskUser)
userRouts.post("/login", validation(signInSchema), signIn)
userRouts.post("/addUser", validation(signUpValidationSchema), signUp)
userRouts.get("/profile", googlelogin)
userRouts.patch("/changepass", changePass)
userRouts.patch("/updateUser", updateUser)

userRouts.delete("/deleteUser", deleteUser)
userRouts.delete("/deleteUserid/:id", deleteUserid)
userRouts.put("/softdeleteUser", softdeleteUser)
userRouts.get("/getsoftdeleted", getSoftDelete)
userRouts.patch("/logout", logout)
export default userRouts;