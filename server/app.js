const express = require('express')
const cors = require('cors')
const eventRouter = require('./routers/events')

const app = express()

app.use(cors())
app.use(express.json())
app.use('/events', eventRouter)


app.get("/", (req, res) => {
    res.status(200).json({
      title: "Upcoming Events",
      description: "Get involved with the community and find the right event for you."
    })
  })

module.exports = app