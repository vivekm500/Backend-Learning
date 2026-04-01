-- AUTUHENTICATION SYSTEM 
authentication system is the mechanism used to verify the identity of a user, device, or system before granting access to protected resources. It essentially answers the question, "Who are you?"

-1. AAUTHENTICATION
identify krna ki request kis user se ayi hai

Authentication (AuthN) is the ongoing process of proving your identity every time you log in. It compares your provided credentials against the "verified" record created during signup. 

Goal: Confirm the user is the same person who originally registered.
Example: Entering your username and password, scanning your fingerprint (FaceID), or entering an OTP (One-Time Password).
Analogy: Using your key to open the front door of your house

-2. AUTHORIZATION
user kya-kya kar sakta hai

Authorisation (AuthZ) happens after a user is successfully authenticated. it determines their permissions and access levels. 

Goal: Control which specific resources (pages, data, buttons) a user can interact with.

Example: An "Admin" can delete users, while a "Guest" can only read posts.

Analogy: Once inside the building, your badge only lets you enter the 3rd floor, not the executive suite.

-3. VALIDATION
Data ka format check karna

Validation is the first step, often happening before the system even knows who the user is. It checks if the data provided matches the required format and constraints. 

Goal: Ensure data integrity and prevent errors or malicious code (like SQL injection). 

Example: Checking if an email address contains an "@" symbol or if a password meets the minimum length of 8 characters. 

Analogy: A doorman checking if you are wearing the required "Black Tie" attire before even asking for your name. 

-4. VERIFICATION
Data sahi hai ya nhi

Verification is the process of confirming that an identity is authentic and belongs to a real person. This usually happens once during onboarding or when high-risk actions are taken. 

Goal: Establish a baseline of trust by matching a user to external, authoritative sources. 

Example: Uploading a government ID (Passport/Driver’s License) to a banking app, or clicking a link in a "Verify your Email" message. 

Analogy: A front desk clerk checking your physical ID card to make sure the face on the card matches yours. 



a server authenticates a user through a multi-step process that starts with verifying credentials and ends with establishing a "persistent" session so the user doesn't have to log in for every single click. 

1. The Initial Handshake (Login)
Submission: The user enters their identifier (like an email) and secret (password) into a client-side form. The client sends this to the server over a secure HTTPS connection. 

Validation: The server first performs Validation to ensure the data is safe and correctly formatted (e.g., checking if the email is valid). 

Credential Check: The server looks up the user in its database. To keep passwords secure, the server never stores them in plain text; instead, it uses a hashing algorithm (like bcrypt) to compare the submitted password against the stored hash. 

2. Maintaining the "Logged-In" State
HTTP is stateless, meaning the server "forgets" the user after every request. To keep them logged in, the server uses one of two main strategies: 


**A. Session-Based Authentication (Stateful)**
Creation: After a successful login, the server creates a Session ID and stores it in its own memory or a database (like Redis). 

The Cookie: The server sends this Session ID back to the browser in a Set-Cookie header. The browser automatically stores this cookie. 

Recognition: For every future request, the browser automatically attaches that cookie. The server checks the ID against its list to find exactly who the user is. 


**B. Token-Based Authentication (Stateless - e.g., JWT)**
Generation: The server creates a digital "ticket" called a JSON Web Token (JWT) that contains the user's info (like their ID). This token is cryptographically signed with a secret key known only to the server. 

The Handover: The token is sent to the client, which stores it in localStorage or a secure cookie. 

Self-Verification: The client sends this token in the Authorization header of every request. The server doesn't need to look at a database; it simply verifies the signature to know the token is valid and who it belongs to. 


-------------------------------------------------------
DAY-12

creating register api for authentication

create a server and connect to Database 
define a schema to store data of users and also create a model for registering users

Now we will create the register api in a new folder and file
"./src/routes/auth.routes.js"

In auth.routes.js file require express and we will need "express.Router" as we are creating an api outside of app.js or other than app.js file

schema should be well defined like email should be unique , username shouldebe unique , what type of password to accept

we will module.exports auth

after creating register api to register new user we also have to generate a JWT(json web token) token that will sign every request

this jwt token is generated by server

to generate this jwt token we need jsaonwetoken package that can be installed with the command "npm i jsonwebtoken" 

this jwt generated token during registration should be present in user's every request so that server knows who you are -> this will be implemented using cookies-storage which is present on client side(browser) and this cookies storage is directly accesible by server

server can read or write any data from cookies-storage

so, now whenever any jwt token will be generated we will set it in cookies-storage and to do we will need a package 
"npm i cookie-parser" use this as middleware in app.js

**auth.rouotes.js**
```js
const express = require("express")
const userModel = require("../models/user.model")

const jwt = require("jsonwebtoken")  // for generating jwt token


const authRouter = express.Router() // agr app.js ke alawa kisi aur file me routes/api create krni ho "express.Router()" ki jarurat padti hai


authRouter.post('/register', async (req,res)=>{
     const {name, email, password} =  req.body

     const isUserAlreadyExist = await userModel.findOne({email})

     // if user exist already return from here
     if(isUserAlreadyExist){
      return res.status(400).json({
         message: "user already exist with this email"
      })
     }

     // if user doesn't exists with the entered email then create thtat user
     const user = await userModel.create({
       name,
       email,
       password,
     });

     // method to create jwt token with signature
     const token  = jwt.sign({
      id:user._id,
     }, process.env.JWT_SECRET)

     // pasing jwt token in cookies-storage
     res.cookie("jwt_token", token)

     res.status(201).json({
        message: "user registered",
        user,
        token
     })
})

module.exports = authRouter



```