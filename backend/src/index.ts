import express from 'express';
import cors from 'cors'

const app = express()
const usersRoute = require('./routes/user')
const port = process.env.PORT || 3000;

app.use(cors())
app.use(express.json())
app.use('/users', usersRoute);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
