🔗 Relationship between Database and Cluster

--Think of it like this:
👉 Database = data + structure
👉 Cluster = infrastructure that stores and manages that database

--Simple analogy (don’t overcomplicate)
Database = your notebook
Cluster = multiple photocopies of that notebook across rooms

If one room burns → data still exists elsewhere

--In MongoDB Atlas (your case)
When you write:
mongoose.connect("mongodb+srv://...")
You are: 👉 connecting to a cluster
Inside that cluster:
👉 there are databases
Inside a database:
👉 there are collections
Inside collections:
👉 there are documents

--🧱 Full hierarchy (important)
Cluster
  └── Database (Day-06)
        └── Collection (notes)
              └── Document ({title: "..."})
⚠️ Brutal truth

--Most beginners think:
“Database = MongoDB Atlas”
Wrong.
MongoDB Atlas = cloud service managing clusters
Database = actual data container inside it

--🎯 Why this matters for YOU
When your connection string says:
...mongodb.net/Day-06
👉 Day-06 = your database name

ut you're actually connecting to:
👉 a cluster that contains that database

--🧠 Final clarity
Concept	What it actually is
Database	Organized data storage
Cluster	Multiple servers storing that data
MongoDB Atlas	Service managing clusters
🔥 Key takeaway

You don’t connect to “a database directly”.
👉 You connect to a cluster
👉 Then work with a database inside it

--------------------------------------------------

we don't make server.js complicated so we will place the code for connecting to database in separate database.js file inside "./src/config" folder and do module.exports database connecting function and import that function in server.js and call it to connect to database

----------------------------------------
-- SCHEMA -> database ko btana ki hum kis format me data store karne wale h

we have to define the schema (format of data) that how we will store data in the database we will do this in 
"./src/model" folder in notes.model.js file

```js
const SchemaName = new mongoose.Schema({
    title: String,
    description: string
})
```
--MODEL
There we also create a model which interact with a collection on the database
```js
const modelName = mongoose.model("collectionName", Schema)
```
A Mongoose model is a class that serves as your primary tool for interacting with a specific MongoDB collection

The model provides methods like find(), create(), updateOne(), and remove() to perform CRUD (Create, Read, Update, Delete) operations on a specific collection. 

 When you create a model using the mongoose.model() function, Mongoose automatically associates it with a specific MongoDB collection (e.g., a model named 'notes' will correspond to the 'notes' collection in the database)

---------------------------------------------
when we are creating a note on database then mongodb database insert an id in each note created abd this id is unique for every note