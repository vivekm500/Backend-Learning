we can use an extension --env masker-- to hide the url's in .env file

----------------------------------------------------
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