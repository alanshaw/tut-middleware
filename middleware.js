var http = require("http")
var fs = require("fs")
var async = require("async")

function handlesRequest (handler, request) {
  if (request.method == handler.method || handler.method == "*") {
    if (request.url == handler.route || handler.route == "*") {
      return true
    }
  }
  return false
}

module.exports = function () {
  var handlers = []

  var listener = function (req, res) {
    res.status = function (code) {
      res.statusCode = code
      return this
    }

    res.redirect = function (loc) {
      res.writeHead(302, {Location: loc})
      res.end()
    }

    res.sendFile = function (filename) {
      fs.createReadStream(filename).pipe(res)
    }

    var middleware = handlers.map(function (h) {
      return function (cb) {
        if (!handlesRequest(h, req)) return cb()

        h.listener(req, res, function (er) {
          if (er) return cb(er)
          cb()
        })
      }
    })

    async.series(middleware, function (er) {
      if (er) console.error("Error in middleware", er)
    })
  }

  listener.use = function (listener) {
    handlers.push({method: "*", route: "*", listener: listener})
  }

  listener.get = function (route, listener) {
    handlers.push({method: "GET", route: route, listener: listener})
  }

  return listener
}