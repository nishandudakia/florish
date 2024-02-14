const Event = require('../models/Events')

async function index(req, res) {
    try{
        const events = await Event.getAll()
        res.status(200).json(events)
    } catch(err) {
        res.status(500).json({error: err.message})
    }
}