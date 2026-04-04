🔐 Authentication Module (Register, Login, Get Current User)

This module implements a basic authentication system using:

Node.js
Express.js
MongoDB (Mongoose)
JWT (JSON Web Tokens)
Cookies for session management
Crypto (for password hashing)
📦 Required Packages

Install all dependencies:

npm install express mongoose jsonwebtoken cookie-parser dotenv
📌 Why Each Package is Used
Package	   Purpose
express	-> Backend framework to create APIs
mongoose -> Connect and interact with MongoDB
jsonwebtoken ->	Generate and verify JWT tokens
cookie-parser -> Read cookies from requests (req.cookies)
dotenv	-> Manage environment variables (JWT_SECRET)
crypto ->	Hash passwords (built-in Node.js module)
📂 Project Structure
project/
│
├── models/
│   └── auth.model.js       # User schema
│
├── routes/
│   └── authRouter.js       # Authentication routes
│
├── .env                    # JWT_SECRET stored here
│
├── app.js                  # Main server file
⚙️ Core Concepts Used

Before jumping into APIs, understand these:

1. 🔒 Hashing (Password Security)
Password is never stored directly
Converted into a fixed string using SHA-256
crypto.createHash('sha256').update(password).digest('hex')
2. 🪪 JWT (JSON Web Token)
Used for authentication
Contains user ID
Signed using a secret key
3. 🍪 Cookies
Token is stored in browser cookies
Sent automatically in future requests
📌 API Endpoints
1️⃣ Register User

POST /api/auth/register

📥 Request Body
{
  "name": "Vivek",
  "email": "vivek@example.com",
  "password": "123456"
}

⚙️ Step-by-Step Flow
Step 1: Extract Data
```js
const { name, email, password } = req.body;
```
Step 2: Check if User Already Exists
```js
const isUserExist = await userModel.findOne({ email })
```
If user exists → return 409 Conflict
Step 3: Hash Password
```js
crypto.createHash('sha256').update(password).digest('hex')
```
Converts password into secure format (not plain text)
Step 4: Save User in Database
```js
await userModel.create({
  name,
  email,
  password: hashedPassword
})
```
Step 5: Generate JWT Token
```js
jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
  expiresIn: "1h"
})
```

Step 6: Store Token in Cookie
```js
res.cookie("jwt_token", token)
```

Step 7: Send Response
{
  "message": "user registered successfully",
  "user": {
    "name": "Vivek",
    "email": "vivek@example.com"
  }
}


2️⃣ Login User

POST -> /api/auth/login

📥 Request Body
{
  "email": "vivek@example.com",
  "password": "123456"
}
⚙️ Flow
Find user by email
Hash entered password
Compare with stored password
Generate JWT
Store token in cookies
⚠️ Important Detail

You are storing login token in a different cookie name:

res.cookie("login_token", jwt_token)

But in /get-me, you are reading:

req.cookies.jwt_token

👉 This is inconsistent and will break authentication.

3️⃣ Get Current User (Protected Route)

GET /api/auth/get-me

⚙️ Flow
Step 1: Read Token from Cookies
const token = req.cookies.jwt_token
Step 2: Verify Token
const decoded = jwt.verify(token, process.env.JWT_SECRET)
If invalid → error thrown
Step 3: Extract User ID
decoded.id
Step 4: Fetch User from Database
await userModel.findById(decoded.id)
Step 5: Return User Data
{
  "name": "Vivek",
  "email": "vivek@example.com"
}
🔁 Authentication Flow (Simple View)
Register → Hash Password → Save → Generate Token → Store Cookie
Login → Verify Password → Generate Token → Store Cookie
Get-Me → Read Cookie → Verify Token → Fetch User
⚠️ Critical Issues (Don’t Ignore)

Let’s be brutally honest — this is still not production-ready.

❌ 1. Using SHA-256 Without Salt
crypto.createHash('sha256')
Fast → easy to brute-force
No salt → identical passwords = identical hashes

👉 This is not secure enough.

❌ 2. Cookie Name Inconsistency
Register → jwt_token
Login → login_token
Get-me → expects jwt_token

👉 This breaks authentication flow.

❌ 3. No Error Handling in Token Verification
jwt.verify()
If token is invalid → app crashes
❌ 4. Insecure Cookies
res.cookie("jwt_token", token)

Missing:

httpOnly
secure
sameSite
✅ Recommended Improvements
1. Use bcrypt instead of crypto
const bcrypt = require("bcrypt")
const hashedPassword = await bcrypt.hash(password, 10)
2. Fix Cookie Naming

Use same name everywhere:

res.cookie("jwt_token", token)
3. Add Try-Catch for JWT
try {
  const decoded = jwt.verify(token, process.env.JWT_SECRET)
} catch (err) {
  return res.status(401).json({ message: "Invalid token" })
}
4. Secure Cookies
res.cookie("jwt_token", token, {
  httpOnly: true,
  secure: true,
  sameSite: "strict"
})
🧠 What You Learned
How authentication works end-to-end
How JWT is generated and verified
How cookies store session data
How backend connects authentication to database



