const express = require('express')

const connectionDB = require("./db")
const routes = require("./routes")

const app = express()

app.use(express.json()); // Parse JSON body
app.use('/', routes)

const PORT = 4000
const URI = `mongodb+srv://fsa:imtiaz.0@cluster0.vl88a60.mongodb.net/Attendance_APP`
connectionDB(URI).then(() => {
    app.listen(PORT, () => {
        console.log(`I am listning on port ${PORT}`);
    })
}).catch((e) => console.log(e))

