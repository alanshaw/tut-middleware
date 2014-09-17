# Middleware tutorial

- Explain middleware as a high level concept
- We're going to create a middleware system similar to how express works
- We'll have a demo app with a profile, login and 404 page
- `npm init`
- Add test.js
- `npm install --save-dev tape request`
- RUN TESTS
- Add index.html, login.html and 404.html
- Add app.js
    - Start with `http.createServer()`
    - `express()` same as `middleware()`
- `npm install --save async`
- RUN TESTS
- Add middleware.js
    - Exports should return a "listener"
    - Augment the `res` obj
    - Add the `use`/`get` handler registration fns
    - Iterate over the handlers with `async.series`