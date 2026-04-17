ImageKit.io is a cloud-based media optimization and delivery platform that provides real-time image/video resizing, compression, and delivery via a global Content Delivery Network (CDN). It acts as a middleware that connects to existing storage (e.g., AWS S3, Google Cloud) to optimize media on-the-fly, ensuring faster website load times without manual image processing. 

just upload the image and it will give a link through which image is accesible 

------------------------------------------

// here we are checking for user by its email or username both at a time using $or:[]  so that we don't need to make several different calls to server for finding user by its username, email separately

const isUserAlreadyExist = await userModel.findOne({ 
        $or: [
            {username},
            {email}
        ]})

---------------------------

**controllers** - its a folder in src having file auth.controllers.js  where we write all logic of api (whatever inside callback function in api creation)

we module.exports all controllers

```js
module.exports = {
    registerController,
    loginController
}
```

In auth.routes.js we just define the api and use controllers in palce of callback in api creation by importing it from auth.controllers.js

