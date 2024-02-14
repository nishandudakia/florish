const Event = require('../models/Events')

async function index(req, res) {
    try{
        const events = await Event.getAll()
        res.status(200).json(events)
    } catch(err) {
        res.status(500).json({error: err.message})
    }
}

async function show(req, res) {
    try{

        let name = req.params.event_name 
        const event = await Event.getOneEvent(name)
        res.status(200).json(event)

    } catch(err) {
        res.status(404).json({error: err.message})
    }
}

async function accept(req, res) {
    try{
        let id = req.params.event_id
        const event = await Event.acceptAnEvent(id)
    }
}

async function create(req, res) {
    try{
        const data = req.body
        const newEvent = await Event.create(data)
        res.status(201).json(newEvent)
    } catch(err) {
        res.send(400).json({error: err.message})
    }

}

async function destroy(req, res) {
    try{
        const name = req.params.event_name 
        const event = await Event.getOneEvent(name) 
        const result = await event.destroy()
        res.status(204).end()
    } catch(err) {
        res.send(404).json({error: err.message})
    }
}

module.exports = {index, show, create, destroy}