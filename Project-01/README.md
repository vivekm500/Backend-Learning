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

-----------------------------------------

What is bcryptjs?
bcryptjs is a JavaScript implementation of the bcrypt password hashing function. It is designed to be secure and efficient, making it a suitable choice for hashing passwords in Node.js applications.

Key Features
Security: Uses a computationally intensive hashing algorithm to make brute-force attacks difficult.
Salting: Adds a unique salt to each password to ensure that even if two users have the same password, their hashes will be different.
Cross-Platform: Works across different operating systems and platforms.
Approach
To encrypt password in Node App using bcrypt module, firstly

The bcryptjs module is imported. A plain text password password is defined. A variable hashedPassword is declared to store the hashed password.
bcrypt.genSalt(10, function (err, Salt) {...}) generates a salt with 10 rounds and executes a callback function with the generated salt.
Inside the salt generation callback, bcrypt.hash(password, Salt, function (err, hash) {...}) hashes the password with the generated Salt.
If an error occurs, an error message is logged. If successful, the hashed password is stored in hashedPassword and logged.
bcrypt.compare(password, hashedPassword, async function (err, isMatch) {...}) compares the original password with the hashed password.
If they match, logs indicate successful encryption and matching. If they don't match, an error message is logged.
Steps to Set Up Node Project and Implement bcrypt
Step 1: You can visit the link to Install bcryptjs module. You can install this package by using this command.

npm install bcryptjs
Step 2: After installing bcryptjs module you can check your request version in the command prompt using the command.

npm version bcryptjs
Step 3: After that, you can create a folder and add a file for example index.js, To run this file you need to run the following command.

node index.js
Example: Implementation to show encryption in Node.js using bcryptjs module

```js
// Filename - index.js

// Requiring module
const bcrypt = require('bcryptjs');

const password = 'pass123';
const hashedPassword;

// Encryption of the string password
bcrypt.genSalt(10, function (err, Salt) {

    // The bcrypt is used for encrypting password.
    bcrypt.hash(password, Salt, function (err, hash) {

        if (err) {
            return console.log('Cannot encrypt');
        }

        hashedPassword = hash;
        console.log(hash);

// first convert the password in hash then compare it with hashedpassword stored in db
        bcrypt.compare(password, hashedPassword,
            async function (err, isMatch) {

                // Comparing the original password to
                // encrypted password
                if (isMatch) {
                    console.log('Encrypted password is: ', password);
                    console.log('Decrypted password is: ', hashedPassword);
                }

                if (!isMatch) {

                    // If password doesn't match the following
                    // message will be sent
                    console.log(hashedPassword + ' is not encryption of '
                        + password);
                }
            })
    })
})
```
Step to run the application: Run the application using the following command:

node index.js
Output: We will see the following output on the console screen.

$2a$10$4DRBPlbjKO7WuL2ndpbisOheLfgVwDlngY7t18/ZZBFNcW3HdWFGm Encrypted password is: pass123 Decrypted password is: $2a$10$4DRBPlbjKO7WuL2ndpbisOheLfgVwDlngY7t18/ZZBFNcW3HdWFGm


----------------------------------------
Once we creted a collection users so forther when we will create other collection for posts or stories or whatever then we will use userId from already created collection users by referencing to users collection


To use a userId from an existing Users collection in a new collection (like Posts, Orders, or Blogs), you create a "reference" between them. This is the MongoDB equivalent of a foreign key in a relational database.

1. Define the Relationship in the Schema 
In your new collection's schema, define a field (e.g., author or user_id) with the type mongoose.Schema.Types.ObjectId and a ref property pointing to your User model. 

```javascript
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  // This connects this post to a specific user
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' // Must match the name used in mongoose.model('User', ...)
  }
});

const Post = mongoose.model('Post', postSchema);
```
Use code with caution.

2. Save Data with the User ID
When creating a new document in the second collection, simply assign the _id of the existing user to that field. 

```javascript
const createPost = async (userId) => {
  const newPost = new Post({
    title: "My First Post",
    content: "Hello World!",
    author: userId // The ID from your Users collection
  });
  
  await newPost.save();
};
```
Use code with caution.
3. Retrieve Linked Data (Population) 
To get the full user details alongside the post instead of just the ID, use the Mongoose populate() method during your query. This automatically replaces the ID with the actual user document. 

```javascript
// This will return the post with the full user object inside 'author'
const postWithUser = await Post.findOne({ title: "My First Post" })
  .populate('author'); 

console.log(postWithUser.author.email); // Access user data directly
Use code with caution.
```
--Why Use Referencing?

Consistency: Data is stored in one place (the Users collection), ensuring higher consistency if user details change.
Normalized Design: It prevents data duplication across multiple collections.

Flexibility: It is ideal for "one-to-many" relationships where a user might have thousands of entries (like logs or comments), preventing individual documents from hitting MongoDB's 16MB size limit. 

------------------------
if we have to send files from frontend to express server then we use form-data format

By default express can't read this format so we use a package **multer** install it with them command "npm i multer"


Multer is a Node.js middleware primarily used for handling multipart/form-data, which is the standard encoding type for uploading files. It acts as a bridge between the client-side form submission and your server-side storage. 

--Key Functions and Use Cases

Parsing File Data: Standard body-parsers (like express.json()) cannot process file data. Multer specifically parses the incoming chunks of a file and makes them accessible in your route handler via req.file or req.files.

Storage Management: It allows you to decide exactly where and how files are saved using two built-in storage engines:
DiskStorage: Saves files directly to your server's hard drive.
MemoryStorage: Keeps files in RAM as Buffer objects, which is useful for temporary processing or uploading directly to cloud services like AWS S3.

Security & Validation: You can set file size limits to prevent Denial of Service (DoS) attacks and use a fileFilter to restrict uploads to specific formats like .jpg or .pdf. 

Basic Setup Example
To use Multer, you first install it via NPM and then configure it as middleware for your routes: 

```javascript
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Files will be saved in 'uploads' folder

// Handle a single file upload from a form field named 'avatar'
app.post('/profile', upload.single('avatar'), (req, res) => {
  console.log(req.file); // Contains information about the uploaded file
  res.send('File uploaded!');
});
```
Use code with caution.

Important Considerations
Encoding: On the frontend, your HTML form must have enctype="multipart/form-data" or the upload will fail.

Storage Choice: For performance, use disk storage for large files; memory storage can quickly exhaust your server's RAM if many users upload files at once.

Route-Specific Use: Never apply Multer as a global middleware; only use it on specific routes that require file handling to prevent security vulnerabilities. 

----------------------------------------

imagekit is a cloud-based media stack that provides end-to-end solutions for image and video management. Unlike Multer, which only handles the upload process on your local server, ImageKit manages the entire lifecycle: storage, real-time optimization, and global delivery. 

Primary Usages
Real-Time Transformation: You can resize, crop, or add watermarks to images instantly by simply adding parameters to the image URL.
Automatic Optimization: It automatically converts images to modern, lighter formats like WebP or AVIF based on the user's browser, significantly improving page load speeds.
Video Streaming: ImageKit handles adaptive bitrate streaming (similar to YouTube), ensuring smooth video playback by adjusting quality based on the viewer's network speed.
Digital Asset Management (DAM): It serves as a central hub where teams can store, search (using AI-powered natural language), and collaborate on media assets with granular access controls. 
ImageKit
ImageKit
 +3
Why Developers Use It
Easy Integration: You can link your existing storage (like AWS S3 or Google Cloud) to ImageKit and start delivering optimized media in minutes without moving your files.
Global CDN: It comes with a built-in Content Delivery Network (CDN) with over 700 nodes worldwide to ensure assets load in under 50ms for any user.
Cost Savings: By offloading heavy media processing to ImageKit's servers, you save on your own server's CPU and bandwidth costs.
Flexible Plans: For small projects, you can use the ImageKit free plan which includes essential DAM features and monthly bandwidth allowances. 

Comparison: Multer vs. ImageKit
Feature 	Multer	                   ImageKit
Role|	Middleware for local file parsing	|Complete media management platform
Storage|	Your server or a local disk	 |Cloud storage with global CDN
Processing|	Manual (requires extra libraries)	|Automatic real-time transformations
Best For|	Temporary file handling	|Production-ready media delivery


With the new @imagekit/nodejs SDK, the process is cleaner. Since you are likely using Multer to get the file from the user's request, the toFile helper is now the standard way to handle those file buffers.
Here is the updated implementation:
1. Installation
Install the new official package:

bash
npm install @imagekit/nodejs multer

Use code with caution.
2. Implementation
This setup uses the toFile helper to convert the Multer buffer into a format the new ImageKit SDK expects.
```javascript
import ImageKit, { toFile } from "@imagekit/nodejs";
import multer from "multer";

// 1. Initialise the new client
const imagekit = new ImageKit({
  publicKey: "your_public_key",
  privateKey: "your_private_key",
  urlEndpoint: "https://imagekit.io"
});

// 2. Setup Multer in-memory
const storage = multer.memoryStorage();
const upload = multer({ storage });

// 3. The Upload Route
app.post("/upload", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).send("No file provided");

    // Use the toFile helper for the buffer provided by Multer
    const fileForUpload = await toFile(req.file.buffer, req.file.originalname);

    const result = await imagekit.files.upload({
      file: fileForUpload,
      fileName: req.file.originalname,
      folder: "/profile_pictures"
    });

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```
Use code with caution.
What Changed in the New SDK?
Method Path: You now use client.files.upload() instead of just client.upload().
The toFile Helper: This is the big addition. It ensures that raw bytes (like a Buffer or Uint8Array) are wrapped correctly with metadata before being sent to ImageKit's servers [1].
Modern Imports: The SDK is designed for modern ES Modules (import/export), though it still works with require.
Pro Tip: If you are uploading a very large file that is already saved on your server, use fs.createReadStream('/path/to/file') directly as the file parameter—it’s much more memory-efficient than a buffer [1].