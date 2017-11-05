const webserver = require('../webserver')
const apiBackend = require('./apibackend')

module.exports = {
  serve: function () {
    webserver.app.post('/api/recent', function (req, res) {
      const key = req.body.key
      const amount = req.body.amount

      if (key !== null) {
        apiBackend.fetchLatest(key, amount, (data) => {
          res.send(JSON.stringify(data))
        })
      } else {
        res.send([])
      }
    })

    webserver.app.post('/api/search', function (req, res) {
      const key = req.body.key
      const amount = req.body.amount
      const str = req.body.str // String to be searched
      apiBackend.searchForMessages(key, amount, str, (data) => {
        res.send(JSON.stringify(data))
      })
    })

    webserver.app.post('/api/validatekey', function (req, res) {
      const key = req.body.key
      apiBackend.validateApiKey(key, (data) => {
        res.send(JSON.stringify(data))
      })
    })

    webserver.app.post('/api/wordcounts', function (req, res) {
      const key = req.body.key
      const head = req.body.head // Top n
      const order = req.body.order // 'asc' 'desc'

      apiBackend.wordCounts(key, head, order, (error, data) => {
        if (error) {
          res.send(JSON.stringify({'error': error}))
        } else {
          res.send(JSON.stringify(data))
        }
      })
    })
  }
}
