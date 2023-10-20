import express from 'express'

import { connection } from './db/connection.js'
import userRouts from './modules/users/user.routs.js'
import taskRouts from './modules/tasks/task.routs.js'
import cors from 'cors'
const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(cors())
connection();
 app.use(userRouts);
 app.use(taskRouts)

// app.use(messageRoutes)
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))


