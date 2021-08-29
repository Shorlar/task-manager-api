const mongoose = require('mongoose')
const validator = require('validator')

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})

// const Tasks = mongoose.model('Tasks', {
//     description: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     completed:{
//         type: Boolean,
//         default: false
//     }
// })

// const task = new Tasks({
//     description: 'laundry',
    
// })

// task.save().then(() => console.log(task)).catch((error) => console.log('Error!', error))

// const User = mongoose.model('User', {
//       name: {
//           type: String,
//           required: true,
//           trim: true
//     },
//     email:{
//         type: String,
//         required: true,
//         trim: true,
//         lowercase: true,
//         validate(value) {
//             if(!validator.isEmail(value)){
//                 throw new Error('Email is invalid!')
//             }
//         }
//     },
//     password: {
//         type: String,
//         required: true,
//         trim: true,
//         minLength: 7,
//         validate(value){
//             if(value.toLowerCase().includes('password')){
//                 throw new Error(`Password cannot contains the word "password"`)
//             }
//         }
//     },
//     age: {
//         type: Number,
//         validate(value) {
//             if(value < 0){
//                 throw new Error('Age must be a positive number')
//             }
//         }
//     }
// })

// const me = new User({
//     name: '   Shola  ',
//     email: 'BAARBZ@MAIL.COM',
//     password: 'babatope'
// })

// me.save().then(() => console.log(me)).catch((error) => console.log('Error!', error))