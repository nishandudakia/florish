const { Router } = require('express')
const eventController = require('../controllers/events')
const eventRouter = Router()

eventRouter.get('/', eventController.index) 
eventRouter.get('/:event_name', eventController.show) 
eventRouter.get('/', eventController.showAccepted)
eventRouter.post('/:event_id', eventController.accept)
eventRouter.post('/:event_id', eventController.decline)
eventRouter.post('/', eventController.create)
eventRouter.delete('/:event_name', eventController.destroy)

module.exports = eventRouter