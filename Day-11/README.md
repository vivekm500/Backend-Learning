
🔐 Authentication API (Register + Login + Protected Route)

This module implements a basic authentication system using:

Node.js
Express.js
MongoDB (Mongoose)
JWT (JSON Web Tokens)
Cookies for session handling

It provides:

User Registration
User Login
A Protected Route (basic demo)
📂 Project Structure
auth/
│
├── routes/
│   └── authRouter.js      # All authentication routes
│
├── models/
│   └── user.model.js      # User schema (MongoDB)
│
├── .env                   # Contains JWT_SECRET
│
└── app.js                 # Main server file
📌 API Endpoints
1️⃣ Register User

Route:

POST /api/auth/register
📥 Request Body
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "123456"
}
⚙️ Flow
Check if user already exists:
const isUserAlreadyExist = await userModel.findOne({ email })
If exists → return error:
return res.status(400).json({
  message: "user already exist with this email"
})
Hash password using MD5:
const hash = crypto.createHash("md5").update(password).digest("hex")
Create user:
const user = await userModel.create({
  name,
  email,
  password: hash
})
Generate JWT token:
const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
Store token in cookies:
res.cookie("jwt_token", token)
Send response:
{
  "message": "user registered",
  "user": {},
  "token": "jwt_token"
}
2️⃣ Login User

Route:

POST /api/auth/login
📥 Request Body
{
  "email": "john@example.com",
  "password": "123456"
}
⚙️ Flow
Find user by email:
const user = await userModel.findOne({ email })
If user not found → 404 error
Hash entered password:
crypto.createHash("md5").update(password).digest("hex")
Compare with stored password:
user.password === hashedPassword
If invalid → 401 error
Generate JWT token:
const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
Store token in cookies:
res.cookie("jwt_token", token)
Send success response
3️⃣ Protected Route (Demo Only)

Route:

POST /api/auth/protected
⚙️ What It Does
console.log(req.cookies)
Prints cookies (including JWT) from request
Always returns success response


🔐 Authentication Flow Summary
Register → Hash Password → Store User → Generate Token → Store Cookie
Login → Verify User → Match Password → Generate Token → Store Cookie
Protected → (Currently just reads cookies, no security)

-------------------------------------------
Hashing 
in hashing same input will always generate same output
hash is one way hash can't be converted back to string
