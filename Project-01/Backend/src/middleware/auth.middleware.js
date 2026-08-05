const jwt = require("jsonwebtoken");

require("dotenv").config();

// taking out user token and verifying thw jwt token and decoding it was repeating all post controllers so we made it as middleware to avoid repeattion of same code multiple times

async function identifyUser(req, res, next) {
  // -------------------------------------------------------
  // STEP 1: Get the JWT token stored in the user's cookies.
  // The browser automatically sends this cookie with every request.
  // -------------------------------------------------------
  const token = req.cookies.token;

  // -------------------------------------------------------
  // STEP 2: Check whether the token exists.
  // If the user is not logged in, there will be no token.
  // In that case, stop execution and return 401 Unauthorized.
  // -------------------------------------------------------
  if (!token) {
    return res.status(401).json({
      message: "No token found, Unauthorised access",
    });
  }

  // -------------------------------------------------------
  // STEP 3: Variable to store the decoded payload after
  // successfully verifying the JWT.
  // Initially it is undefined.
  // -------------------------------------------------------
  let decoded;

  // -------------------------------------------------------
  // STEP 4: Verify the JWT.
  //
  // jwt.verify() checks:
  // ✔ Token is correctly formatted
  // ✔ Token was signed using OUR secret key
  // ✔ Token has not been modified (tampered)
  // ✔ Token has not expired
  //
  // If everything is valid, it returns the payload
  // (user id, email, etc.).
  //
  // If verification fails, an exception is thrown and
  // execution jumps to the catch block.
  // -------------------------------------------------------
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }

  // added a new property in req ans stored the decoded data of user
  req.user = decoded

// used next function to forward request from midlleware ahead
  next()
}



module.exports = identifyUser;
