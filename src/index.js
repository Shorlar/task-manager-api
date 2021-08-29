const express = require('express')
require('./db/mongoose')
const userRouter = require('./router/user')
const taskRouter = require('./router/task')

const app = express()
const port = process.env.PORT

//file upload example
// const multer = require('multer')
// const upload = multer({
//     dest: 'images',
//     limits: {
//         fileSize: 1000000
//     },
//     fileFilter(req, file, cb) {
//         // if(!file.originalname.endsWith('.pdf'))
//        if(!file.originalname.match(/\.(doc|docx)$/)) {
//             return cb(new Error('Please upload a Word document'))
//         }
//         cb(undefined, true)

        
//         //cb(new Error('file must be PDF'))
//         //cb(undefined, true)
//         //cb(undefined, false)
//     }
// })

// app.post('/upload', upload.single('upload'), (req, res) => {
//     res.send()
// }, (error, req, res, next) => {
//     res.status(400).send({error: error.message})
// })

// app.use((req,res, next) => {
//     res.status(503).send('Site is under maintenance please check back later')
// })

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)


app.listen(port, () => {
    console.log('Server is up on port' + port);
})


// const Task = require('./models/task')
// const User = require('./models/user')
// const main = async () => {
//     // const task = await Task.findById('611e38ecbe23072ba8bd845c')
//     // await task.populate('creator').execPopulate()
//     // console.log(task.creator);
//     const user = await User.findById('611e33db5b1d952a80d460aa')
//     await user.populate('tasks').execPopulate()
//     console.log(user.tasks);
// }
// main()
// const jwt = require('jsonwebtoken')

// const myFunction = async () => {
//     const token = jwt.sign({_id: 'thry465'}, 'mynewcourse')
//     console.log(token);

//     const data = jwt.verify(token, 'mynewcourse')
//     console.log(data);
// }

// myFunction()