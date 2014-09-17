var http = require("http")
var fs = require("fs")
var middleware = require("./middleware")

var app = middleware()

app.get("/login", function (req, res, next) {
  res.sendFile(__dirname + "/login.html")
})

// Auth middleware
app.use(function (req, res, next) {
  // Inspect session
  // Logged in?
  //   Deserialize user (async?)
  //   req.user = [object User]
  //   next()
  req.user = {}
  next()
  // else
  //   res.redirect("/login")
})

app.get("/", function (req, res, next) {
  // Fetch profile
  fs.readFile(__dirname + "/index.html", "utf8", function (er, html) {
    if (er) return next(er)
    res.write(html.replace("{{name}}", "Bob"))
    res.end()
  })
})

// 404
app.use(function (req, res, next) {
  res.status(404).sendFile(__dirname + "/404.html")
})

http.createServer(app).listen("8080")