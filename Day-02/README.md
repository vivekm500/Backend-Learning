The app.get() function in Express.js is a routing method used to handle HTTP GET requests to a specific path on the server. It is fundamental for fetching or retrieving data from the server, such as displaying a webpage or getting API data. 

--Syntax
The basic syntax for app.get() is:
```js
app.get(path, callback, ...);
```

path: A string representing the URL path or a route pattern (e.g., '/', '/users', '/users/:id').

callback: One or more middleware or handler functions that process the request (req) and send a response (res). This function typically ends the request-response cycle by using methods like res.send(), res.json(), or res.sendFile(). 

--Example
Here is a complete, simple example of an Express app using app.get():
```js
const express = require('express');
const app = express();
const port = 3000;

// Define a route that handles GET requests to the root URL ('/')
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is running on [http://localhost:${port}](http://localhost:3000/)`);
});

```

When you navigate to http://localhost:3000/ in a browser, the callback function executes and sends the "Hello World!" message to the client. 

--Key Features and Use Cases
HTTP Method Specific: It only responds to GET requests, ignoring POST, PUT, DELETE, etc..

Data Retrieval: Primarily used when the client is asking the server for information.

Visible Parameters: Data passed in GET requests is typically included in the URL as query parameters, making them suitable for bookmarking or sharing.

Route Handling: It allows developers to specify exactly what happens when a client requests data from a specific URL. 

app.get() vs. app.use()
A common point of confusion, app.get() differs from app.use() in the following ways: 

HTTP Method: app.get() only handles GET requests, while app.use() runs for all HTTP methods (GET, POST, etc.).
Path Matching: app.get() requires an exact match for the specified path (or uses route parameters), whereas app.use() matches any path that starts with the specified path prefix.

Purpose: app.get() is for defining specific route handlers, while app.use() is generally for applying middleware functions across the application or a set of routes. 

--------------------------
"node server.js" this command runs the server then any changes made in server.js after that is not get registered
so use  "npx nodemon server.js"   this will kwwp updating server.js as we will make any changes  in it.

--npm -> it is package manager

--npx -> it is package executer

------------------------------
if you want any file not to get uploded on github then create a file called   ".gitignore"  and inside it write the files you don't want to upload like "Day-02/node_module/"  and ".env"   so node_modules in Day-02 and .env file will get ignored by github and will not be uploaded there


------------------------------

--Deploying Server

To deploy your server create a repo on github and take your code there and use any cpu provider service like render which is free and great for personel projects

go to render and signin using your github then click new -> select the repo you want to deploy -> configure it -> give a name -> branc-main -> select root directory -> build command - if node_module is not there in repo then use "npm i" -> start command - npm server.js(your js file name) -> choose free service -> click deploy web service

------------------------
Here is the live link of deployed server 

```
https://backend-learning-day-02-server-deploy.onrender.com

``` 