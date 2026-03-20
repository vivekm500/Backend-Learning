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

----------------------------------------------
IN production we can't expose our Database connecting URI to github.  we should never push it to github

So, we put this URI in .env file in a variable like
```js
const MONGO_URI = URI
```
now we will use this variable **MONGO_URI** in database.js file to connect to database

to use this variable created in .env file first we need to install a package "dotenv" with command 
**npm i dot env**  then import dot env in the file where we want to use that variable created in .env  then use that variable like **process.env.variableName**

```js
require("dotenv").config() // to use variable from .env file

mongoose.connect(process.env.MONGO_URI)
```

-------------------------------------------
mongoose Model has some methods likw:-
1. create() -> In Mongoose, the create() method is a static convenience function used to instantiate and save one or more documents to the database in a single step.

What it Does
Combines Steps: It is a shortcut that internally calls new Model() to create a document instance and then immediately calls .save() on that instance. 

Single or Bulk Insertion: It can accept a single object to create one document, or an array of objects to create multiple documents at once. 

Triggers Middleware: Because it calls .save() internally, it triggers all of your schema's pre('save') and post('save') hooks, as well as automatic validation. 

Returns a Promise: It returns a Promise that resolves to the newly created document (or an array of documents if multiple were inserted). 

Code Example
```javascript
// Creating a single document
const user = await User.create({ name: 'Alice', age: 25 });

// Creating multiple documents at once
const users = await User.create([
  { name: 'Bob', age: 30 },
  { name: 'Charlie', age: 35 }
]);
```

2. find() -> it searches the database for data and return an array og objects

In Mongoose, the find() method is the primary tool for querying a collection to retrieve multiple documents that match specific criteria. 

Core Functionality
Querying: It searches the database for all documents that satisfy the provided filter. If you pass an empty object {} as a filter, it returns all documents in the collection. 

Return Type: It returns a Mongoose Query object. When this query is executed (e.g., using await or .exec()), it resolves to an array of documents. 

Empty Results: If no documents match the criteria, find() returns an empty array [], which is still a truthy value in JavaScript. 

Common Parameters
The method typically accepts three main arguments: 
Filter (Required): The search criteria (e.g., { age: { $gte: 18 } }).

Projection (Optional): Specifies which fields to include or exclude in the results (e.g., { name: 1, password: 0 }).
Options (Optional): Additional settings like limit, skip, or sort. 

Key Differences
find() vs. findOne(): While find() returns an array of all matching records, GeeksforGeeks notes that findOne() returns only the first document that matches or null if none are found. 

Chaining: Because it returns a Query object, you can chain additional methods like .sort(), .limit(), or .populate() before executing it. 

Example:
```javascript
// Find all users named 'Alice' who are over 20, 
// returning only their names and sorting by age.
const users = await User.find({ name: 'Alice', age: { $gt: 20 } })
                        .select('name')
                        .sort({ age: 1 });
                        ```


