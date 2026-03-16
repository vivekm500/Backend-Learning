--HTTP Status Codes
Status codes are three-digit numbers the server uses to indicate the outcome 
of a client's request. They are categorized into five classes:

--Refer to the notes for mmore info--

HOW TO SEND A STATUS CODE FROM SERVER

```js
app.delete("/notes/:index", (req, res)=>{
    delete notes[req.params.index]

    // when we use 204 then no message will be shown ... to see even messages use 200
    res.status(204).json({
        message: "note deleted successfully"
    })
})
```

-----------------------------------------

MongoDB is a popular NoSQL, document-oriented database designed to handle large volumes of structured, semi-structured, and unstructured data. Instead of using traditional tables with rows and columns, it stores data in flexible, JSON-like documents called BSON (Binary JSON). 

--Key Features

Flexible Schema: Unlike relational databases (SQL), MongoDB doesn't require a predefined structure. You can add or change fields in a document without affecting other records in the same collection.

Scalability: It is built for horizontal scaling through a technique called sharding, which distributes data across multiple servers to handle high traffic and massive datasets.

High Availability: It uses replica sets—multiple copies of data on different servers—to provide automatic failover if one server crashes.

Rich Query Language: It uses the MongoDB Query Language (MQL), which supports ad-hoc queries, indexing, and complex real-time aggregations. 


--MongoDB Atlas is the fully managed, multi-cloud Database-as-a-Service (DBaaS) version of MongoDB. While standard MongoDB is the database engine itself, Atlas is a platform that hosts and manages it for you on cloud infrastructure like AWS, Google Cloud, or Microsoft Azure

It is designed to remove "operational heavy lifting," allowing developers to focus on building apps rather than managing servers


--MongoDB Compass is the clear glass door and organizer tool you use to look inside and move things around without needing to use a complicated manual. 
It is a Graphical User Interface (GUI)—a desktop application for Windows, Mac, or Linux that lets you interact with your data visually instead of typing code into a black terminal screen. 


What can you do with it?
Visual Exploration: Instead of writing commands to find data, you can just click on your databases and collections to see what's inside. 

Easy Editing: You can add, delete, or change documents (your data records) by clicking buttons like a regular computer program. 

Point-and-Click Queries: It has a Visual Query Builder. You can filter and sort your data using menus instead of memorizing "query syntax". 

Schema Analysis: It shows you a "map" of your data, helping you see what types of information you have (like which fields are numbers or text) and if any data is missing or inconsistent. 


-----------------------------------------

--HOW TO CREATE A DATABASE ON MONGODB ATLAS AND CONNECT TO IT IN MONGODB COMPASS

Setting up a cloud database might seem intimidating, but you can do it in about 10–15 minutes by following these three main stages.

-Phase 1: Download & Install MongoDB Compass 
Before working with the cloud, get the "remote control" (Compass) ready on your computer. 

Visit the Download Page: Go to the official MongoDB Compass Download site.

Select Your Version: Choose your operating system (Windows, macOS, or Linux) and click Download.
Install: Open the downloaded file (e.g., the .exe for Windows) and follow the installation wizard. Once finished, launch the application. 

-Phase 2: Create Your MongoDB Atlas Account & Cluster 
This is where your data will actually live on the internet.
Sign Up: Go to MongoDB Atlas and click Start Free. You can use your email or sign up instantly with a Google or GitHub account. 

Deploy a Free Cluster: 

Choose the M0 Free (Shared) tier to ensure you aren't charged.
Select a Cloud Provider (like AWS) and a Region marked as "Free Tier Available" that is closest to you for better speed.
Click Create Deployment.
Security Setup (Crucial): 

Database User: Create a username and password. Note: This is not your Atlas login; it’s specifically for accessing the database. Save these credentials!.
IP Access List: Click Add My Current IP Address. This tells the cloud to only allow connections coming from your specific computer.
Finish: Click Finish and Close to go to your Database Dashboard. 

-Phase 3: Connect Atlas to Compass
Now, you’ll link the cloud database to the app on your computer.
Get the Connection String: 

In the Atlas Dashboard, click the Connect button next to your cluster.

Choose Compass as your connection method.
Copy the provided connection string (it looks like mongodb+srv://<db_username>:<password>@cluster0...).
Connect in Compass: 

Open MongoDB Compass.
Click New Connection and paste the string you just copied into the box.

Important: Replace <password> in the string with the actual database password you created in Phase 2.
Click Connect.

-Phase 4: Create Your First Database
Once connected, you can create your storage structure.
Create Database: In Compass, click the (+) icon next to "Databases" in the left sidebar.

Name It: Enter a Database Name (e.g., MyStore) and a Collection Name (e.g., Products).

Save: Click Create Database. You are now ready to add data by clicking "Add Data" inside your new collection. 


-----------------------------

cluster is a group of servers (or "nodes") that work together to store and manage your data. Instead of relying on just one computer, a cluster connects multiple machines so they can act as a single, powerful system. 

Think of a cluster like a team of librarians. Instead of one person trying to handle every visitor and book alone, a team divides the work to make sure the library stays open and runs fast. 

-Why use a Cluster instead of one server?
A cluster provides three main benefits that a single machine cannot: 

High Availability (Safety): If one server in the cluster crashes, the others take over immediately. Your app stays online, and your data isn't lost. 

Scalability (Growth): As your data grows, you can add more servers to the cluster to handle the extra load. 

Performance (Speed): The cluster can split up heavy tasks (like big searches) across multiple machines so they finish faster.
