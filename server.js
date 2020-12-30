require('dotenv').config()
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const fileReader = require('./utils/fileReader')
const makeOutputFile = require('./utils/writeFile')

/* Connect to DB */
// ================================================
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true})

const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log("Connected to database"))
// ====================================================

/* Configure server to accept JSON */
// ===========================================
app.use(express.json())

/* Setup rotues */
const facCompositeRouter = require('./routes/facComposites')
app.use('/facComposites', facCompositeRouter)
// ============================================

app.listen(5000, () => console.log("Server started..."))

async function convertFileToString(fileName){
    const file = await fileReader(fileName)
    // console.log(file)
    return file
}

async function writeFile(fileName){
    const data = await convertFileToString(fileName)
    makeOutputFile(data)
}

writeFile('./input/test-FACUpdate..xml')