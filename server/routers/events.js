const { Router } = require('express')
const eventController = require('../controllers/events')
const eventRouter = Router()

eventRouter.get('/', eventController.showAccepted)
eventRouter.get('/all', eventController.index) 
eventRouter.get('/:event_name', eventController.show) 
eventRouter.post('/:event_id/accept', eventController.accept)
eventRouter.post('/:event_id/decline', eventController.decline)
eventRouter.get('/not', eventController.showUnaccepted);
eventRouter.post('/create', eventController.create)
eventRouter.delete('/:event_name', eventController.destroy)
 
module.exports = eventRouter