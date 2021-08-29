const express = require('express')
const Task = require('../models/task')
const auth = require('../middleware/authentication')

const router = new express.Router()

//Tasks Endpoint
router.post('/tasks', auth, async (req,res) => {
    // const task = new Task(req.body)
    const task = new Task({
        ...req.body,
        creator: req.user._id
    })

    try {
        await task.save()
        res.status(201).send(task)
    } catch (error) {
        res.send(400).send(error)
    }

    // task.save()
    // .then(() => {
    //     res.status(201).send(task)
    // })
    // .catch((e) => {
    //     res.status(400).send(e)
    // })
})

//GET /tasks?completed=
//GET /tasks?limit=2&skip=3
//GET /tasks?sortBy=createdAt:desc
router.get('/tasks', auth, async (req,res) => {
    const match = {}
    const sort = {}

    if(req.query.completed){
        match.completed = req.query.completed === 'true'
    }

    if (req.query.sort) {
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }
    try {
        // const tasks = await Task.find({ creator:req.user._id})
        // or the code below
         await req.user.populate({
             path: 'tasks',
             match,
             options: {
                 limit: parseInt(req.query.limit),
                 skip: parseInt(req.query.skip),
                 sort
             }
            }).execPopulate()
        const tasks = req.user.tasks
        res.send(tasks)
    } catch (error) {
        res.status(500).send()
    }
    // Task.find({}).then((tasks) => {
    //     res.send(tasks)
    // })
    // .catch((e) => {
    //     res.status(500).send()
    // })
})

router.get('/tasks/:id', auth, async (req,res) => {
    const _id = req.params.id

    try {
        // const task_id = await Task.findById(id)
        const task_id = await Task.findOne({_id, creator: req.user._id})
        if(!task_id){
            return res.status(404).send()
        }
        res.send(task_id)
    } catch (error) {
        res.status(500).send()
    }

    // Task.findById(id)
    // .then((id) => {
    //     if(!id){
    //         res.status(404).send()
    //     }
    //     else {
    //         res.send(id)
    //     }
    // })
    // .catch((e) => {
    //     res.status(400).send()
    // })
})

router.patch('/tasks/:id', auth, async (req,res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['completed']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation){
        return res.status(400).send({error: 'Inavlid updates'})
    }

    try {
            const task = await Task.findOne({ _id: req.params.id, creator: req.user._id})
            
            if(!task){
                return res.status(404).send()
            }

            updates.forEach((update) => task[update] = req.body[update])
            await task.save()
        
        //  const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true})
        res.send(task)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.delete('/tasks/:id', auth, async (req,res) => {
    try {
        const task = await Task.findOneAndDelete({_id: req.params.id, creator: req.user._id})
        if(!task){
            return res.status(404).send()
        }
        res.status(200).send()  
    } catch (error) {
        res.status(500).send()
    }
    
})


module.exports = router


