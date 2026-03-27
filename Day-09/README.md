
----------------------------------------------------
BACKEND

we can use an extension --env masker-- to hide the url's in .env file

 Schema -> defines the format in which data will be stored on database, what will be stored and its datatype

 mongoose helps in creation of schema and model

```js
const schemaName = new mongose.Schema({
    title: String, // title will be stored in string type
    description: string
})
```

Collection -> stores similar kind of data

// Model -> firstly it creates a collection for a defines schema,  provides a way to interac with a specific collection and we perform CRUD operations with the help of model

```js
const ModelName = new mongoose.model("collectionName", schema)
```

we do all this schema and model creation in separate folder inside src in separate file in model.js "./src/mode/model.js"

we will export this model created so that it can be used in app.js to perform CRUD operations
```js
module.exports = modelName.js
```

mongoose Model has some methods like:-

1. create() -> used create and save data on monodb 

2. find()  -> used to find data from a specific collection from database

3. findByIdAndDelete() -> used to find the data related with a specific id and delete them from database

code example:
```js
const id = req.params.id
await noteModel.findByIdAndDelete(id)
```

4. findByIdAndUpdate()  -> used to find the data by its id and update the required data

code example: 

```js
const id = req.params.id
const {description} = req.body
await noteModel.findByIdAndUpdate(id, {description})
```

-------------------------------------------------
FRONTEND

use command "npm create vite@latest ." to create a folder structure for frontend

we will use axios to make a request to api
first do install axios in frontend with command "npm i axios"

axios.get/post/patch/delete/any method you want to perform('api')

```js
axios.get('api').then()
```

A CORS policy error is a security alert that occurs when a web browser blocks a web page from making an HTTP request to a different origin (domain, protocol, or port) than the one that served the page. This is a fundamental browser security measure designed to prevent malicious activity, known as the Same-Origin Policy (SOP). 

Cross-Origin Resource Sharing (CORS) is a mechanism that adds flexibility to the strict SOP by using special HTTP headers to explicitly allow some cross-origin requests while rejecting others. A CORS error happens when the server you are trying to access does not include the necessary CORS headers in its response to grant permission to the requesting origin.

So to make cross origin request we will use cors
-- first install cors packsge in backend with command "npm i cors"
-- then require it in app.js and write the code app.use(cors())
```js
const cors = require("cors")
app.use(cors())
```

------------------------------------------------------
Day-10 lec

As of we now our frontend is running on different port and backend is running on different so to integrate them on single port and can run on single port

-- run the commmand "npm run build" in frontend folder
-- this command will sum of all react codes in html css and javascript , css and javascript will be in a foldrer named asses all these will in a folder  named dist and dist folder will also conatin any asset like photo or video or font you have used in the frontend


**Now move all the three html css and javascript files/folder created on running the command npm run build to a public folder in backend folder

---------------------------------------------

in backend in app.js we will send response for the api's that is not created by us

```js

const path = require("path") // a middleware to use path.join



app.use('*name', (req,res)=>{
    // res.send("this is wildcard")  // now if any request to any api that i haven't created then this response will be send

    // we will send html.index file in response which we taken out fron frontend by running the command "npm run build" in frontend
    res.sendFile(path.join(__dirname, "..", "./public/index.html"))
})

__dirname // jis v folder ke andar isse chalaoge to ye uss file ke folder tak ka path return krta h

".." // to go back from src to public


app.use(express.static("./public"))  // middleware to make all from folder publically available so that when we browser makes a request on server from any api that we haven't created then it should able to acess all html,css and js file from public folder and load the frontend from the same  port that is used on backend

// so now our frontend and backend is running on same port both get integrated

// if any requested file from browser is not found in public folder then it will send html file as we have send html file in response in wildcard api

```

if you change frontend code later?

Nothing happens automatically.

Your backend is still serving the old build files, not your updated code.

What you MUST do after frontend changes

Every time you update frontend:

Go to frontend folder

Run: npm run build
Replace old files in backend public/ with new ones
If you skip this → your changes will NOT show.