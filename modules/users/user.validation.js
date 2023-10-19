import Joi  from "joi"
const signUpValidationSchema = Joi.object({
    userName: Joi.string().min(3).max(10).required(),
    email:    Joi.string().email().required(),
    password: Joi.string().pattern(/^[A-z][a-z]{3,8}$/).required(),
    age:      Joi.number().min(10).max(30),
    gender : Joi.string(),
    phone:    Joi.string(),
    isVerified:Joi.boolean()
})

const signInSchema = Joi.object({
    email:Joi.string().email({tlds:{allow:["com","net"]}}).required(),
    password: Joi.string().pattern(/^[A-z][a-z]{3,8}$/).required(),
})


export{
    signUpValidationSchema,
    signInSchema
}