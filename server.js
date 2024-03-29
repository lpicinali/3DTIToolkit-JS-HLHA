const path = require('path')
const express = require('express')
const logger = require('morgan')

const app = express()
const port = process.env.PORT || 8262

app.use(logger('common'))
app.use(express.static('public'))
// app.set('trust proxy', true)

app.use((req, res) => {
  res.sendFile(path.resolve('./public/index.html'))
})

app.listen(port, error => {
  if (error) {
    console.error(error)
  } else {
    console.info(
      '==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.',
      port,
      port
    )
  }
})
