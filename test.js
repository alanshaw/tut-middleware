var test = require("tape")
var request = require("request")

require("./app")

/*
test("Auth middleware redirects to login page", function (t) {
  request("http://localhost:8080/", {followRedirect: false}, function (er, res, body) {
    t.ifError(er)
    t.equal(res.statusCode, 302)
    t.equal(res.headers.location, "/login")
    t.end()
  })
})
*/

test("Get profile page for user", function (t) {
  request("http://localhost:8080/", {followRedirect: false}, function (er, res, body) {
    t.ifError(er)
    t.equal(res.statusCode, 200)
    t.end()
  })
})

test("404 for unknown route", function (t) {
  request("http://localhost:8080/unknown-route", {followRedirect: false}, function (er, res, body) {
    t.ifError(er)
    t.equal(res.statusCode, 404)
    t.end()
  })
})

