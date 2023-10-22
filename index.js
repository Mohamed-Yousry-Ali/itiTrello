import express from 'express'

import { connection } from './db/connection.js'
import userRouts from './modules/users/user.routs.js'
import taskRouts from './modules/tasks/task.routs.js'
import cors from 'cors'
const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));
connection();
 app.use(userRouts);
 app.use(taskRouts)

// app.use(messageRoutes)
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))


