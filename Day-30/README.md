**Express Validator**

express-validator is a set of Express.js middlewares wrapped around the popular validator.js library. It allows you to perform server-side data validation and sanitization seamlessly within your route definitions. Instead of manually writing multiple if/else checks to inspect your incoming HTTP request payloads, express-validator utilizes a declarative syntax called Validation Chains. [1] (https://www.geeksforgeeks.org/node-js/what-is-the-purpose-of-the-express-validator-middleware-in-express-js/), [2] (https://www.youtube.com/watch?v=chxYKwAueoY), [3] (https://www.cloudthat.com/resources/blog/a-guide-to-input-validation-in-node-js-using-express-validator), [4] (https://dev.to/justwonder/building-a-robust-express-api-with-typescript-and-express-validator-3i75), [5] (https://express-validator.github.io/docs/next/guides/validation-chain/)

1. Key Architectural Concepts
Validation Chains: Functions like body(), query(), and param() target specific locations in the incoming request object. These functions return a chainable middleware object where you attach your validation, sanitization, and modifier rules sequentially. [1] (https://express-validator.github.io/docs/next/guides/validation-chain/), [2] (https://www.cloudthat.com/resources/blog/a-guide-to-input-validation-in-node-js-using-express-validator)Decoupled Architecture: Unlike other libraries (like Joi or Yup) that intercept requests, throw errors, or use strict structural schemas, express-validator does not automatically halt requests when an error is caught. It aggregates errors directly onto the req object, allowing you to choose how to handle and format the error payload down the line. [1] (https://www.youtube.com/watch?v=4FiNtjhX014&t=3), [2] (https://medium.com/@rk85783/express-validator-express-validator-4aa6d73f153f), [3] (https://www.cloudthat.com/resources/blog/a-guide-to-input-validation-in-node-js-using-express-validator), [4] (https://www.youtube.com/watch?v=chxYKwAueoY)

2. Core Modules and Methods
Location Selectors

These tell the middleware exactly where to extract data from the HTTP request structure:

body(fields): Validates properties inside req.body.
query(fields): Validates URL query string variables inside req query.
param(fields): Validates URL path/route constraints inside req.params.

check(fields): A legacy/generic fallback that scans req.body, req.cookies, req.headers, req.params, and req.query simultaneously. [1] (https://express-validator.github.io/docs/), [2] (https://www.youtube.com/watch?v=4ugw5yRwhR0&t=93), [3] (https://auth0.com/blog/express-validator-tutorial/), [4] (https://www.youtube.com/watch?v=chxYKwAueoY)

Chained Behaviors

Validators: Built-in assertions like .isEmail(), .isLength(), .isInt(), .notEmpty().Sanitizers: Transform or mutate the data (e.g., .trim(), .escape(), .normalizeEmail(), .toInt()).

Error Hooks: .withMessage('Custom message') allows you to customize the validation payload returned to users for preceding validators.

Modifiers: Methods like .optional() allow strings to pass safely if omitted entirely, and .bail() stops checking subsequent chain links for a specific field after encountering its first validation failure. [1] (https://www.youtube.com/watch?v=8aEC_cAzpUc&t=5), [2] (https://www.youtube.com/watch?v=4ugw5yRwhR0&t=93), [3] (https://www.youtube.com/watch?v=4FiNtjhX014&t=3), [4] (https://www.geeksforgeeks.org/node-js/what-is-the-purpose-of-the-express-validator-middleware-in-express-js/), [5] (https://express-validator.github.io/docs/next/guides/validation-chain/), [6] (https://www.youtube.com/watch?v=chxYKwAueoY)

3. Step-by-Step Implementation GuideStep 
1: Install the PackageRun the following package manager instruction inside your Node.js ecosystem project: [1] (https://www.youtube.com/watch?v=chxYKwAueoY), [2] (https://www.youtube.com/watch?v=8aEC_cAzpUc&t=5)
bash npm install express-validator
Step 2: Inject Middleware into RoutesChain your validators sequentially inside the route middleware parameter list. [1] (https://www.youtube.com/watch?v=8aEC_cAzpUc&t=5), [2] (https://www.youtube.com/watch?v=chxYKwAueoY)

```javascript
const express = require('express');
const { body, validationResult } = require('express-validator'); //

const app = express();
app.use(express.json()); // Essential to parse req.body JSON payloads

app.post(
  '/api/register',
  [
    // 1. Check the username field
    body('username')
      .trim()
      .notEmpty().withMessage('Username is required.') //
      .isLength({ min: 3 }).withMessage('Username must be at least 3 characters long.'),
      
    // 2. Check the email field
    body('email')
      .isEmail().withMessage('Please enter a valid email address.') //
      .normalizeEmail(),

    // 3. Check the password field
    body('password')
      .isLength({ min: 6 }).withMessage('Password must be at least 6 characters.') //
  ],
  (req, res) => {
    // Step 3 will execute inside this handler
  }
);
```
Step 3: Handle the Output ResultsBecause express-validator doesn't throw errors inherently, you use validationResult(req) inside the route execution context to evaluate the result: [1] (https://www.youtube.com/watch?v=4ugw5yRwhR0&t=93), [2] (https://www.youtube.com/watch?v=chxYKwAueoY), [3] (https://www.youtube.com/watch?v=8aEC_cAzpUc&t=5)

```javascript
(req, res) => {
  // Extract validation results mapping from the request object
  const errors = validationResult(req); //

  // If the error object is not empty, return a 400 status code with details
  if (!errors.isEmpty()) { //
    return res.status(400).json({ 
      success: false, 
      errors: errors.array() // Converts validation metadata to a standard Array
    });
  }

  // If execution succeeds, perform your business logic safely
  const { username, email, password } = req.body;
  res.status(201).json({ message: "User registered successfully!", data: { username, email } });
}
```
4. Advanced UsageCustom Validation LogicWhen built-in assertions are insufficient, you can hook into a custom resolver rule via .custom(). This is ideal for validating cross-field verification or looking up data asynchronously against external entities like databases: [1] (https://www.cloudthat.com/resources/blog/a-guide-to-input-validation-in-node-js-using-express-validator), [2] (https://www.youtube.com/watch?v=4FiNtjhX014&t=3)

```javascript
body('confirmPassword').custom((value, { req }) => {
  if (value !== req.body.password) {
    throw new Error('Password confirmation does not match password.');
  }
  return true; // Return true if validation passes successfully
})
```
Async Custom Validation
If you need to hit a database to verify unique constraints (such as making sure an email is not taken), return a database query promise inside your custom validator block: [1] (https://www.youtube.com/watch?v=4FiNtjhX014&t=3), [2] (https://www.cloudthat.com/resources/blog/a-guide-to-input-validation-in-node-js-using-express-validator)
```javascript
body('email').custom(async (value) => {
  const user = await User.findOne({ email: value });
  if (user) {
    throw new Error('E-mail already in use.'); // Rejecting the promise records the failure
  }
});
```

5. Quick Comparison: 
express-validator vs Joi
Feature              express-validator           Joi
Integration |Tight integration as Express middleware |Standalone schema evaluator (Framework agnostic)

Syntax Style  |Inline method chaining (body('name').isString())|Centralized structural object configuration schemas

Data MutationSanitizes |inline data mutations on the fly (.trim())  |Returns a cloned sanitization payload out-of-box

ERROR HANDLINGG: **https://github.com/ankurdotio/cohort-2.0/blob/main/notes/error-handling.md**

LINKS TO READ MORE ABOUT EXPRESS VALIDATOR

1. **https://www.geeksforgeeks.org/node-js/what-is-the-purpose-of-the-express-validator-middleware-in-express-js/**

2. **https://github.com/ankurdotio/cohort-2.0/blob/main/notes/express-validator.md**


**DETAILED NOTES ON EXPRESS VALIDATOR**

# Express Validator — Detailed Guide

A practical guide to using **express-validator** in Node.js + Express applications.

---

## Table of Contents

1. [What Problem Does express-validator Solve?](#1-what-problem-does-express-validator-solve)
2. [What Is express-validator?](#2-what-is-express-validator)
3. [Installation](#3-installation)
4. [Basic Validation Pattern](#4-basic-validation-pattern)
5. [Understanding `body()`](#5-understanding-body)
6. [Multiple Validations](#6-multiple-validations)
7. [Common Validators](#7-common-validators)
8. [Custom Error Messages](#8-custom-error-messages)
9. [Reading Validation Errors](#9-reading-validation-errors)
10. [Complete Registration Example](#10-complete-registration-example)
11. [Validation vs Sanitization](#11-validation-vs-sanitization)
12. [Common Sanitizers](#12-common-sanitizers)
13. [`optional()`](#13-optional)
14. [`query()`](#14-query)
15. [`param()`](#15-param)
16. [`header()` and `cookie()`](#16-header-and-cookie)
17. [Reusable Validation Middleware](#17-reusable-validation-middleware)
18. [Reusable Validator Files](#18-reusable-validator-files)
19. [Custom Validation with `.custom()`](#19-custom-validation-with-custom)
20. [Async Custom Validation](#20-async-custom-validation)
21. [`.bail()`](#21-bail)
22. [Wildcards](#22-wildcards)
23. [Nested Objects](#23-nested-objects)
24. [Conditional Validation](#24-conditional-validation)
25. [`matchedData()`](#25-matcheddata)
26. [Validation vs Database Constraints](#26-validation-vs-database-constraints)
27. [Validation vs Authentication vs Authorization](#27-validation-vs-authentication-vs-authorization)
28. [Recommended Project Structure](#28-recommended-project-structure)
29. [Request Lifecycle](#29-request-lifecycle)
30. [Common Beginner Mistakes](#30-common-beginner-mistakes)
31. [Methods Worth Learning First](#31-methods-worth-learning-first)
32. [Mental Model](#32-mental-model)
33. [Production Checklist](#33-production-checklist)

---

## 1. What Problem Does express-validator Solve?

An Express API receives data from clients through places such as:

- `req.body`
- `req.params`
- `req.query`
- headers
- cookies

You should **not blindly trust this data**.

For example, a registration endpoint might expect:

```json
{
  "username": "Rahul",
  "email": "rahul@gmail.com",
  "age": 22
}
```

But a client could send:

```json
{
  "username": "",
  "email": "not-an-email",
  "age": -500
}
```

Or:

```json
{}
```

`express-validator` lets you validate incoming data before your controller or business logic uses it.

The basic flow is:

```text
Client
   ↓
HTTP Request
   ↓
express-validator
   ↓
Validation
   ↓
Invalid → 400 response
   ↓
Valid
   ↓
Controller
   ↓
Database
```

> **Important:** express-validator validates request data. It does not replace database constraints or business rules.

---

## 2. What Is express-validator?

`express-validator` is a collection of Express middleware and validation/sanitization tools.

It can validate:

- request body fields
- URL parameters
- query parameters
- headers
- cookies
- nested objects
- arrays
- conditional data
- custom business-specific rules

It can also sanitize input.

Typical imports:

```js
const {
  body,
  param,
  query,
  header,
  cookie,
  validationResult,
  matchedData
} = require("express-validator");
```

With ES modules:

```js
import {
  body,
  param,
  query,
  header,
  cookie,
  validationResult,
  matchedData
} from "express-validator";
```

---

## 3. Installation

Install the package:

```bash
npm install express-validator
```

For a typical Express project:

```bash
npm install express express-validator
```

---

## 4. Basic Validation Pattern

The simplest validator looks like this:

```js
body("email").isEmail()
```

For example:

```js
const express = require("express");
const { body, validationResult } = require("express-validator");

const app = express();

app.use(express.json());

app.post(
  "/users",
  body("email")
    .isEmail()
    .withMessage("Please provide a valid email"),
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    res.json({
      message: "User is valid"
    });
  }
);
```

### Important concept

A validator such as:

```js
body("email").isEmail()
```

collects validation information.

It does **not automatically send the response**.

You normally retrieve the result with:

```js
const errors = validationResult(req);
```

Then check:

```js
if (!errors.isEmpty()) {
  return res.status(400).json({
    errors: errors.array()
  });
}
```

---

## 5. Understanding `body()`

`body()` validates fields inside:

```js
req.body
```

Given:

```json
{
  "username": "john",
  "email": "john@gmail.com",
  "age": 25
}
```

You can validate:

```js
body("username")
body("email")
body("age")
```

Example:

```js
body("username")
  .isLength({ min: 3 })
  .withMessage("Username must contain at least 3 characters");
```

The validation targets:

```js
req.body.username
```

---

## 6. Multiple Validations

Validators can be chained.

Example:

```js
body("password")
  .isLength({ min: 8 })
  .withMessage("Password must be at least 8 characters")
  .matches(/[A-Z]/)
  .withMessage("Password must contain an uppercase letter")
  .matches(/[0-9]/)
  .withMessage("Password must contain a number");
```

Think of this as a pipeline:

```text
password
   ↓
minimum 8 characters?
   ↓
uppercase character?
   ↓
number?
   ↓
valid
```

This makes complex validation rules readable.

---

## 7. Common Validators

You do not need to memorize every validator. Start with the commonly used ones.

### `isEmail()`

```js
body("email").isEmail()
```

Checks whether a value has a valid email-like format.

---

### `isLength()`

```js
body("username")
  .isLength({ min: 3, max: 20 })
```

Requires a string length between 3 and 20 characters.

---

### `isInt()`

```js
body("age").isInt()
```

With limits:

```js
body("age").isInt({
  min: 18,
  max: 100
})
```

---

### `isFloat()`

```js
body("price").isFloat()
```

---

### `isBoolean()`

```js
body("isAdmin").isBoolean()
```

---

### `isString()`

```js
body("name").isString()
```

---

### `isArray()`

```js
body("skills").isArray()
```

---

### `isObject()`

```js
body("address").isObject()
```

---

### `isURL()`

```js
body("website").isURL()
```

---

### `isMobilePhone()`

For example:

```js
body("phone").isMobilePhone("en-IN")
```

---

### `isIn()`

Useful when only certain values are allowed:

```js
body("role").isIn(["user", "admin"])
```

This accepts:

```json
{
  "role": "admin"
}
```

but rejects:

```json
{
  "role": "superadmin"
}
```

---

## 8. Custom Error Messages

Without a custom message:

```js
body("email").isEmail()
```

the resulting error may not be useful enough to your API consumer.

Use:

```js
body("email")
  .isEmail()
  .withMessage("Email address is invalid");
```

A validation error can look like:

```json
{
  "errors": [
    {
      "type": "field",
      "value": "hello",
      "msg": "Email address is invalid",
      "path": "email",
      "location": "body"
    }
  ]
}
```

Custom messages make your API easier to consume and debug.

---

## 9. Reading Validation Errors

Use:

```js
const errors = validationResult(req);
```

Check whether errors exist:

```js
if (!errors.isEmpty()) {
  return res.status(400).json({
    errors: errors.array()
  });
}
```

`errors.array()` returns the validation errors as an array.

Example:

```js
[
  {
    type: "field",
    value: "hello",
    msg: "Invalid email",
    path: "email",
    location: "body"
  }
]
```

---

## 10. Complete Registration Example

```js
const express = require("express");
const {
  body,
  validationResult
} = require("express-validator");

const app = express();

app.use(express.json());

app.post(
  "/register",

  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username is required")
    .isLength({ min: 3, max: 20 })
    .withMessage("Username must be 3-20 characters"),

  body("email")
    .trim()
    .isEmail()
    .withMessage("Invalid email"),

  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),

  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    const {
      username,
      email,
      password
    } = req.body;

    // Business logic here.

    res.status(201).json({
      message: "Registration successful"
    });
  }
);
```

The flow is:

```text
POST /register
      ↓
validate username
      ↓
validate email
      ↓
validate password
      ↓
validationResult(req)
      ↓
invalid → 400
      ↓
valid → controller logic
```

---

## 11. Validation vs Sanitization

These are related but different concepts.

### Validation

Validation asks:

> Is this data acceptable?

Example:

```js
body("email").isEmail()
```

---

### Sanitization

Sanitization asks:

> Can this data be cleaned or normalized?

Example:

```js
body("username").trim()
```

Input:

```text
"   Rahul   "
```

can become:

```text
"Rahul"
```

A useful mental model:

```text
Validation
    ↓
Is the data valid?

Sanitization
    ↓
Can/should the data be normalized?
```

---

## 12. Common Sanitizers

### `trim()`

```js
body("name").trim()
```

Removes surrounding whitespace.

A common pattern:

```js
body("name")
  .trim()
  .notEmpty()
  .withMessage("Name is required");
```

This is better than only checking:

```js
body("name").notEmpty()
```

because a value containing only spaces should generally not count as a meaningful name.

---

### `normalizeEmail()`

```js
body("email").normalizeEmail()
```

Normalizes the representation of an email address.

---

## 13. `optional()`

Suppose `phone` is not required.

You can write:

```js
body("phone")
  .optional()
  .isMobilePhone("en-IN")
```

The meaning is:

```text
phone does not exist
       ↓
allowed

phone exists
       ↓
must be a valid Indian phone number
```

This is particularly useful for update/PATCH endpoints.

---

## 14. `query()`

Query parameters are stored in:

```js
req.query
```

For:

```http
GET /users?page=2&limit=10
```

you can validate:

```js
query("page")
  .isInt({ min: 1 })
  .withMessage("Page must be at least 1");
```

Example:

```js
app.get(
  "/users",

  query("page")
    .isInt({ min: 1 })
    .withMessage("Invalid page"),

  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    res.json({
      page: req.query.page
    });
  }
);
```

---

## 15. `param()`

For:

```http
GET /users/123
```

the `123` is available as:

```js
req.params.id
```

Validate it with:

```js
param("id")
  .isInt({ min: 1 })
  .withMessage("Invalid user ID");
```

Example:

```js
app.get(
  "/users/:id",

  param("id")
    .isInt({ min: 1 })
    .withMessage("Invalid user ID"),

  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    res.json({
      id: req.params.id
    });
  }
);
```

---

## 16. `header()` and `cookie()`

### Headers

Import:

```js
const { header } = require("express-validator");
```

Validate:

```js
header("x-api-key")
  .notEmpty()
  .withMessage("API key is required");
```

### Cookies

Import:

```js
const { cookie } = require("express-validator");
```

Validate:

```js
cookie("sessionId")
  .notEmpty();
```

---

## 17. Reusable Validation Middleware

Repeating this everywhere is bad:

```js
const errors = validationResult(req);

if (!errors.isEmpty()) {
  return res.status(400).json({
    errors: errors.array()
  });
}
```

Create a middleware:

```js
// middleware/validate.js

const { validationResult } = require("express-validator");

const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    });
  }

  next();
};

module.exports = validate;
```

Then use:

```js
router.post(
  "/register",
  registerValidator,
  validate,
  registerController
);
```

The flow becomes:

```text
Request
   ↓
registerValidator
   ↓
validate
   ↓
errors?
 ↙       ↘
yes       no
 ↓         ↓
400     controller
```

This is much cleaner for a real application.

---

## 18. Reusable Validator Files

As your application grows, avoid putting every validation rule directly inside routes.

A useful structure:

```text
project/
├── controllers/
│   └── userController.js
├── routes/
│   └── userRoutes.js
├── validators/
│   └── userValidator.js
├── middleware/
│   └── validate.js
├── models/
│   └── User.js
└── app.js
```

### `validators/userValidator.js`

```js
const { body } = require("express-validator");

const registerValidator = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username is required")
    .isLength({ min: 3, max: 20 })
    .withMessage("Username must be 3-20 characters"),

  body("email")
    .trim()
    .isEmail()
    .withMessage("Invalid email")
    .normalizeEmail(),

  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters")
];

module.exports = {
  registerValidator
};
```

### Route

```js
const {
  registerValidator
} = require("../validators/userValidator");

router.post(
  "/register",
  registerValidator,
  validate,
  registerController
);
```

This separates validation from business logic.

---

## 19. Custom Validation with `.custom()`

Built-in validators are not enough for every application.

For example, you may want:

```text
password === confirmPassword
```

Use `.custom()`:

```js
body("confirmPassword")
  .custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Passwords do not match");
    }

    return true;
  });
```

Complete example:

```js
body("password")
  .isLength({ min: 8 }),

body("confirmPassword")
  .custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Passwords do not match");
    }

    return true;
  })
```

A custom validator should throw an error when the validation fails and return a truthy value when it succeeds.

---

## 20. Async Custom Validation

Custom validators can also perform asynchronous work.

For example, checking whether an email already exists:

```js
body("email")
  .isEmail()
  .custom(async (email) => {
    const user = await User.findOne({ email });

    if (user) {
      throw new Error("Email already registered");
    }

    return true;
  });
```

Conceptually:

```text
email
  ↓
valid email format?
  ↓
query database
  ↓
does user exist?
  ↓
yes → validation error
no  → continue
```

### Important architectural note

Database-backed validation is useful for user-friendly errors, but it is **not a substitute for a database unique constraint**. Race conditions can still occur.

---

## 21. `.bail()`

Suppose you have:

```js
body("email")
  .isEmail()
  .withMessage("Invalid email")
  .custom(async (email) => {
    // expensive database query
  });
```

If the email is already invalid, there is little reason to query the database.

Use:

```js
body("email")
  .isEmail()
  .withMessage("Invalid email")
  .bail()
  .custom(async (email) => {
    // database query
  });
```

`.bail()` means:

> If the preceding validation fails, stop this validation chain.

This can prevent unnecessary work.

---

## 22. Wildcards

Suppose the request contains:

```json
{
  "users": [
    {
      "email": "a@gmail.com"
    },
    {
      "email": "b@gmail.com"
    }
  ]
}
```

Validate every email with:

```js
body("users.*.email")
  .isEmail()
  .withMessage("Invalid email");
```

The `*` targets each array element:

```text
users[0].email
users[1].email
users[2].email
...
```

This is useful for arrays of objects.

---

## 23. Nested Objects

Suppose:

```json
{
  "name": "Rahul",
  "address": {
    "city": "Delhi",
    "pincode": "110001"
  }
}
```

Validate the city:

```js
body("address.city")
  .notEmpty()
  .withMessage("City is required");
```

Validate the pincode:

```js
body("address.pincode")
  .isPostalCode("IN")
  .withMessage("Invalid Indian pincode");
```

Nested field paths make complex request structures manageable.

---

## 24. Conditional Validation

Sometimes a field is required only under certain conditions.

For example:

```json
{
  "accountType": "business",
  "companyName": "ABC Pvt Ltd"
}
```

If `accountType` is `business`, require `companyName`.

You can use `.if()`:

```js
body("companyName")
  .if(body("accountType").equals("business"))
  .notEmpty()
  .withMessage(
    "Company name is required for business accounts"
  );
```

This lets you build conditional validation rules.

---

## 25. `matchedData()`

Sometimes you don't want to use the entire `req.body`.

Import:

```js
const { matchedData } = require("express-validator");
```

Then:

```js
const data = matchedData(req);
```

Suppose the client sends:

```json
{
  "name": "Rahul",
  "email": "rahul@gmail.com",
  "isAdmin": true,
  "randomField": "whatever"
}
```

If your validators only define `name` and `email`, `matchedData(req)` can be used to extract the fields that matched your validation configuration.

This can be safer than blindly passing all of `req.body` into application logic.

For example:

```js
const data = matchedData(req);

await userService.create(data);
```

---

## 26. Validation vs Database Constraints

This is a critical distinction.

You might validate:

```js
body("email").isEmail()
```

That only verifies the email format.

It does **not** guarantee that the email is unique.

Consider two requests arriving almost simultaneously:

```text
Request A → test@gmail.com
Request B → test@gmail.com
```

Both could pass:

```text
Does this email already exist?
        ↓
       NO
```

before either request inserts the user.

Therefore, your database should also enforce uniqueness:

```text
UNIQUE(email)
```

The robust architecture is:

```text
Request validation
       ↓
Business rules
       ↓
Database constraints
```

Use validation for good API behavior, and database constraints for data integrity.

---

## 27. Validation vs Authentication vs Authorization

Do not confuse these concepts.

### Validation

> Is the incoming data correctly formatted and acceptable?

Example:

```text
email = "hello@gmail.com"
```

### Authentication

> Who is this user?

Examples:

```text
JWT
Session
OAuth
```

### Authorization

> Is this authenticated user allowed to perform this operation?

Example:

```text
Admin → can delete users
Normal user → cannot delete users
```

A typical API may use all three:

```text
Request
   ↓
Validation
   ↓
Authentication
   ↓
Authorization
   ↓
Controller
```

---

## 28. Recommended Project Structure

A clean Express application can look like:

```text
src/
├── controllers/
│   └── userController.js
│
├── routes/
│   └── userRoutes.js
│
├── validators/
│   └── userValidator.js
│
├── middleware/
│   ├── validate.js
│   └── auth.js
│
├── models/
│   └── User.js
│
├── services/
│   └── userService.js
│
└── app.js
```

### Recommended responsibility

```text
validators/
    ↓
Validate request data

middleware/
    ↓
Shared request-processing logic

controllers/
    ↓
Handle HTTP request/response

services/
    ↓
Business logic

models/
    ↓
Database interaction/schema
```

Do not dump validation, database queries, authentication, and business logic into one route handler. That becomes difficult to test and maintain.

---

## 29. Request Lifecycle

Suppose the client sends:

```http
POST /register
```

with:

```json
{
  "username": "Ra",
  "email": "hello",
  "password": "123"
}
```

And your route is:

```js
router.post(
  "/register",
  registerValidator,
  validate,
  registerUser
);
```

### Step 1 — Request arrives

```text
POST /register
```

### Step 2 — Validator runs

```js
body("username")
  .isLength({ min: 3 })
```

This fails.

### Step 3 — Error is recorded

`express-validator` stores the validation error on the request.

### Step 4 — `validate` runs

```js
const errors = validationResult(req);
```

### Step 5 — Error response

```js
return res.status(400).json({
  errors: errors.array()
});
```

### Step 6 — Controller is not executed

```text
validator
   ↓
failed
   ↓
validate
   ↓
400 response
   ↓
STOP
```

If validation succeeds:

```text
validator
   ↓
success
   ↓
validate
   ↓
next()
   ↓
controller
```

Understanding this middleware flow is more important than memorizing individual validator names.

---

## 30. Common Beginner Mistakes

### Mistake 1 — Defining a validator but not attaching it to the route

This does nothing useful by itself:

```js
body("email").isEmail();
```

Attach it as middleware:

```js
app.post(
  "/register",
  body("email").isEmail(),
  handler
);
```

---

### Mistake 2 — Forgetting `validationResult(req)`

Validation rules collect errors, but you need to read those errors:

```js
const errors = validationResult(req);

if (!errors.isEmpty()) {
  return res.status(400).json({
    errors: errors.array()
  });
}
```

---

### Mistake 3 — Forgetting `return`

Avoid:

```js
if (!errors.isEmpty()) {
  res.status(400).json({
    errors: errors.array()
  });
}

next();
```

Use:

```js
if (!errors.isEmpty()) {
  return res.status(400).json({
    errors: errors.array()
  });
}

next();
```

The `return` prevents the middleware from continuing after sending the error response.

---

### Mistake 4 — Trusting `req.body`

Avoid blindly doing:

```js
const user = new User(req.body);
```

If the client sends fields your API did not intend to accept, you may accidentally allow unwanted data.

Prefer explicitly selecting allowed fields or using `matchedData(req)`.

---

### Mistake 5 — Treating validation as database security

This:

```js
body("email").isEmail()
```

does not replace:

```text
UNIQUE(email)
```

in your database.

Use both.

---

### Mistake 6 — Putting database/business logic everywhere

Avoid making a single route responsible for:

```text
validation
authentication
authorization
database queries
password hashing
emails
business rules
response formatting
```

Split responsibilities into validators, middleware, controllers, services, and models as the application grows.

---

## 31. Methods Worth Learning First

Do not try to memorize the entire library immediately.

Start with:

```js
body()
param()
query()
header()
cookie()

.notEmpty()
.isEmail()
.isLength()
.isInt()
.isFloat()
.isBoolean()
.isString()
.isArray()
.isObject()
.isIn()

.trim()
.normalizeEmail()

.optional()

.withMessage()

.custom()

.bail()

.if()

validationResult()
matchedData()
```

Once you understand these, you can handle most everyday Express validation tasks.

---

## 32. Mental Model

Do not think:

> "`express-validator` is just a collection of validation functions."

Think:

> **express-validator is a middleware-based validation pipeline attached to an HTTP request.**

For example:

```js
body("email")
  .trim()
  .notEmpty()
  .withMessage("Email is required")
  .bail()
  .isEmail()
  .withMessage("Invalid email")
  .normalizeEmail();
```

Read it from top to bottom:

```text
req.body.email
      ↓
remove surrounding whitespace
      ↓
must exist
      ↓
if empty → error
      ↓
stop if failed
      ↓
must be a valid email
      ↓
normalize the value
```

That mental model makes the library much easier to understand.

---

## 33. Production Checklist

Before considering request validation complete, ask:

- [ ] Are required fields checked?
- [ ] Are string fields trimmed where appropriate?
- [ ] Are formats such as email/URL/phone validated?
- [ ] Are numeric ranges validated?
- [ ] Are enum-like values restricted with `isIn()`?
- [ ] Are optional fields handled with `optional()`?
- [ ] Are nested objects and arrays validated?
- [ ] Are custom business-specific validations covered?
- [ ] Are expensive custom validators protected with `bail()` where appropriate?
- [ ] Are validation errors returned consistently?
- [ ] Are only expected fields passed to business logic?
- [ ] Are database constraints still enforced?
- [ ] Is validation separated from controllers as the project grows?

---

# The Core Pattern to Memorize

If you're learning Express validation for the first time, master this pattern:

### Validator

```js
const registerValidator = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required"),

  body("email")
    .trim()
    .isEmail()
    .withMessage("Invalid email"),

  body("password")
    .isLength({ min: 8 })
    .withMessage(
      "Password must be at least 8 characters"
    )
];
```

### Validation middleware

```js
const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    });
  }

  next();
};
```

### Route

```js
router.post(
  "/register",
  registerValidator,
  validate,
  registerController
);
```

Then learn, in this order:

```text
1. body()
2. validationResult()
3. withMessage()
4. trim()
5. notEmpty()
6. isEmail()
7. isLength()
8. optional()
9. param() / query()
10. custom()
11. bail()
12. nested fields / wildcards
13. matchedData()
```

That progression is much more useful than trying to memorize every API method at once.

