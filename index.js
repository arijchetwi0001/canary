const express = require('express')
const app = express()
const port = 3000
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.get('/signin', (req, res) => {
    res.send('sign in')
  })
  app.get('/signup', (req, res) => {
    res.send('sign up')
  })

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})