
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