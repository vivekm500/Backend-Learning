to careate the folder structure of frontend run the command "npm create vite@latest ." in frontend folder

--------------------------
/logign => login form
/register => register form

--------------------
to use scss in react we need to install a package sass with command "npm i sass"

to use API in frontend we need a package axios, can be installed with run command "npm i axios"

-----------------------
to solve cors error install cors package in backend with command "npm i cors" then require it app.js "const cors = require("cors)" of backend and use it as middleare "app.use(cors())"

---------------------------
we use "withCredentials: true" in api calling from frontend so that server can set the jwt token in cookie storage of browser and can read this token 

```js
async function handleFormSubmimt(e){
      e.preventDefault();

      axios.post("http://localhost:3000/api/auth/register", {
        username,
        email,
        password
      },
    {
      withCredentials: true  // it will set the cookies
    })
      .then(res =>{
        console.log(res.data)
      })
    }
```

in backend also we set "credentials: true" and origi: "frontend link" in app.js in cors middleware

```js
// used as middleware to communicate with frontend
app.use(
  cors({
    credentials: true,  // to store token in cookie in browser
    origin: "http://localhost:5173" 
  }));
  ```

  -----------------------

  Read react architecture notes from "https://github.com/ankurdotio/cohort-2.0/blob/main/notes/react-architecture.md"

  -----------------

**useContext** hook in react

useContext is a React Hook that lets a component read data from a Context.

Think of it like this:

createContext() → creates a shared storage.
Context.Provider → puts data into that storage.
useContext() → takes data out of that storage.
Why do we need useContext?

Imagine this component tree:

App
│
├── Navbar
│      │
│      └── UserProfile
│
└── Dashboard

Suppose App knows who the logged-in user is.

Without Context, you have to pass the user through every component:

<App user={user}>
  <Navbar user={user}>
    <UserProfile user={user} />
  </Navbar>
</App>

This is called prop drilling.

Navbar doesn't even need user; it only forwards it.

With Context

Create a Context:

import { createContext } from "react";

export const AuthContext = createContext();

Provide the data:

<AuthContext.Provider value={{ user }}>
    <App />
</AuthContext.Provider>

Now any component inside <App /> can access user directly.

useContext

Suppose UserProfile wants the logged-in user.

Instead of receiving props:

function UserProfile({ user }) {
    return <h1>{user.username}</h1>;
}

you simply write:
```js
import { useContext } from "react";
import { AuthContext } from "./AuthContext";

function UserProfile() {
    const { user } = useContext(AuthContext);

    return <h1>{user.username}</h1>;
}
```
useContext(AuthContext) tells React:

"Give me the current value stored in AuthContext."

In your project

Your provider is:

<AuthContext.Provider
    value={{
        user,
        loading,
        handleLogin,
        handleRegister
    }}
>
    {children}
</AuthContext.Provider>

So the value inside the context is:

{
    user,
    loading,
    handleLogin,
    handleRegister
}

Now, anywhere in your app:

const auth = useContext(AuthContext);

console.log(auth);

prints something like:

{
    user: {
        username: "vivek",
        email: "vivek@gmail.com"
    },
    loading: false,
    handleLogin: ƒ,
    handleRegister: ƒ
}
Your useAuth hook

You likely have something like:

import { useContext } from "react";
import { AuthContext } from "../auth.context";

export function useAuth() {
    return useContext(AuthContext);
}

Then in Login.jsx:

const { handleLogin } = useAuth();

is exactly the same as:

const { handleLogin } = useContext(AuthContext);

The custom hook just saves you from importing both useContext and AuthContext everywhere.

What happens when setUser() is called?

Suppose:

const [user, setUser] = useState(null);

Initially:

user = null

Your Navbar does:

const { user } = useAuth();

It shows:

Login

Now after a successful login:

setUser({
    username: "vivek",
    email: "vivek@gmail.com"
});

React updates the context value.

Every component using:

useContext(AuthContext)

automatically re-renders.

Now the Navbar shows:

Welcome, vivek

without you manually updating it.

Visual flow
                createContext()
                      │
                      ▼
              AuthContext (empty)
                      │
                      ▼
      <AuthContext.Provider value={...}>
                      │
      ┌───────────────┼────────────────┐
      ▼               ▼                ▼
   Navbar          Login          Dashboard
      │               │                │
      └───────────────┼────────────────┘
                      ▼
         useContext(AuthContext)
                      │
                      ▼
     { user, loading, handleLogin, handleRegister }
One important rule

useContext(AuthContext) only works if the component is inside:

<AuthContext.Provider>
    ...
</AuthContext.Provider>

If you call useContext(AuthContext) outside the provider, you'll get the context's default value (often undefined or whatever you passed to createContext). That's why your AuthProvider needs to wrap the part of the app that uses authentication.



this is one of the most important React concepts. Let's go step by step.

First, what is children?

In React, children is a special prop.

Whenever you write:

<AuthProvider>
    <AppRoutes />
</AuthProvider>

React automatically converts it into something conceptually like:

<AuthProvider children={<AppRoutes />} />

You never write children yourself here—React creates it automatically.

In your App.jsx

You have:

<AuthProvider>
    <AppRoutes />
</AuthProvider>

So inside AuthProvider, the value of children is:

<AppRoutes />
Inside AuthProvider
export function AuthProvider({ children }) {

    return (
        <AuthContext.Provider value={...}>
            {children}
        </AuthContext.Provider>
    );
}

Replace children with its actual value:

return (
    <AuthContext.Provider value={...}>
        <AppRoutes />
    </AuthContext.Provider>
);

This is effectively what React renders.

Visual representation

Your code:

<AuthProvider>
    <AppRoutes />
</AuthProvider>

becomes

AuthProvider
    │
    ▼
children
    │
    ▼
<AppRoutes />

Then AuthProvider returns:

AuthContext.Provider
        │
        ▼
<AppRoutes />

So your final component tree looks like:

<AuthContext.Provider>

    <AppRoutes />

</AuthContext.Provider>

Everything inside <AppRoutes /> can now access the authentication context.

Why do we put {children} there?

Suppose you wrote this:

export function AuthProvider({ children }) {

    return (
        <AuthContext.Provider value={{ user }}>
        </AuthContext.Provider>
    );
}

Notice there's no {children}.

Then React renders:

<AuthContext.Provider>

</AuthContext.Provider>

Nothing is inside the provider.

Your entire app disappears.

That's exactly the bug you had earlier when you accidentally wrote Children instead of children.

Another example

Suppose you have:

<Box>
    <h1>Hello</h1>
    <button>Click</button>
</Box>

React treats it like:

<Box
    children={
        <>
            <h1>Hello</h1>
            <button>Click</button>
        </>
    }
/>

Inside Box:

function Box({ children }) {
    return (
        <div className="box">
            {children}
        </div>
    );
}

React renders:

<div class="box">
    <h1>Hello</h1>
    <button>Click</button>
</div>

Here, children represents everything between the opening and closing tags.

In your authentication flow

Your tree is:

<App>
    │
    ▼
<AuthProvider>
    │
    ▼
<AppRoutes>
    │
    ├── Login
    ├── Register
    └── Home

children is:

<AppRoutes />

When AuthProvider returns:

<AuthContext.Provider value={...}>
    {children}
</AuthContext.Provider>

React produces:

<AuthContext.Provider>

    <AppRoutes />

</AuthContext.Provider>

Then every component inside AppRoutes:

Login
Register
Home
Navbar
Profile

can call:

const auth = useAuth();

because they are descendants of AuthContext.Provider.

A common misconception

children is not specific to Context.

It works with any React component.

For example:

<Card>
    <img src="..." />
    <h2>Product</h2>
    <button>Buy</button>
</Card>

Inside Card:

function Card({ children }) {
    return (
        <div className="card">
            {children}
        </div>
    );
}

The children prop is simply the content placed between <Card> and </Card>.

The same principle applies to AuthProvider: it uses children to wrap your application with the authentication context while still rendering the components inside it.


-------------------
**state layer**

```js

// ==========================
// AUTH CONTEXT (STATE LAYER)
// ==========================
//
// This file is responsible for managing the authentication state
// of the entire application.
//
// It stores:
// 1. Current logged-in user
// 2. Loading state during API calls
// 3. Login function
// 4. Register function
//
// Any component wrapped inside AuthProvider can access these values
// without passing props manually (avoids prop drilling).

import { createContext, useState } from "react";

// API functions responsible for making HTTP requests to the backend.
//
// register()  -> POST /register
// login()     -> POST /login
// getMe()     -> GET /me (currently unused)
import { register, login, getMe } from "./services/auth.api";


// =====================================================
// Create an empty Context object.
//
// Think of this as creating a global storage box.
//
// Initially:
//
// AuthContext
//      {}
//
// Later this storage box will contain:
//
// {
//     user,
//     loading,
//     handleLogin,
//     handleRegister
// }
//
// Components can access these values using:
//
// const auth = useContext(AuthContext);
// =====================================================
export const AuthContext = createContext();



// =====================================================
// AuthProvider Component
//
// This component wraps the entire application.
//
// Example:
//
// <AuthProvider>
//      <App />
// </AuthProvider>
//
// React automatically passes everything inside
// AuthProvider as the special "children" prop.
//
// So:
//
// <AuthProvider>
//      <App />
// </AuthProvider>
//
// becomes internally:
//
// children = <App />
//
// Later when we render:
//
// {children}
//
// React simply renders:
//
// <App />
// =====================================================
export function AuthProvider({ children }) {



    // ============================================
    // Stores the currently logged in user.
    //
    // Initially:
    //
    // user = null
    //
    // After login:
    //
    // user = {
    //      username: "vivek",
    //      email: "vivek@gmail.com"
    // }
    //
    // Whenever setUser() is called,
    // React automatically re-renders every component
    // using this context.
    // ============================================
    const [user, setuser] = useState(null);



    // ============================================
    // Loading state used while waiting for API calls.
    //
    // Initially:
    //
    // loading = false
    //
    // User clicks Login:
    //
    // loading = true
    //
    // API finishes:
    //
    // loading = false
    //
    // Can be used for:
    //
    // loading ? <Spinner/> : <LoginForm/>
    //
    // or
    //
    // <button disabled={loading}>
    // ============================================
    const [loading, setloading] = useState(false);




    // ==================================================
    // LOGIN FUNCTION
    //
    // Called when user submits the Login form.
    //
    // Flow:
    //
    // User clicks Login
    //          ↓
    // loading = true
    //          ↓
    // Send request to backend
    //          ↓
    // Backend verifies credentials
    //          ↓
    // Backend returns user object
    //          ↓
    // Save user globally
    //          ↓
    // loading = false
    // ==================================================
    const handleLogin = async (username, password) => {

        // Turn on loading indicator before API request
        setloading(true);

        try {

            // Wait until backend responds.
            //
            // login() internally does something like:
            //
            // axios.post("/login", {
            //      username,
            //      password
            // })
            //
            // "await" pauses this function until
            // the request finishes.
            const response = await login(username, password);


            // Store logged-in user globally.
            //
            // Example:
            //
            // response.user =
            //
            // {
            //      username: "vivek",
            //      email: "vivek@gmail.com"
            // }
            //
            // After this,
            // every component using AuthContext
            // automatically receives updated user.
            setuser(response.user);


            // Return response back to the component
            // that called handleLogin().
            //
            // Without this line:
            //
            // const res = await handleLogin(...)
            //
            // res would be undefined.
            return response;

        }

        catch (err) {

            // If API fails,
            // print error in console.
            console.log(err);

        }

        finally {

            // finally ALWAYS executes.
            //
            // Success
            // or
            // Failure
            //
            // loading becomes false.
            setloading(false);

        }
    };





    // ==================================================
    // REGISTER FUNCTION
    //
    // Almost identical to Login.
    //
    // Flow:
    //
    // User submits Register form
    //          ↓
    // loading = true
    //          ↓
    // Call backend register API
    //          ↓
    // Backend creates new user
    //          ↓
    // Save newly created user globally
    //          ↓
    // Return response
    //          ↓
    // loading = false
    // ==================================================
    const handleRegister = async (username, email, password) => {

        setloading(true);

        try {

            // Send registration request
            const response = await register(
                username,
                email,
                password
            );

            // Store newly registered user globally.
            setuser(response.user);

            // Return response to Register component.
            return response;

        }

        catch (err) {

            console.log(err);

        }

        finally {

            setloading(false);

        }
    };






    // ==================================================
    // Context Provider
    //
    // This is where we place data inside AuthContext.
    //
    // value={{
    //      user,
    //      loading,
    //      handleLogin,
    //      handleRegister
    // }}
    //
    // means every child component can access these values.
    //
    // Example:
    //
    // const {
    //      user,
    //      loading,
    //      handleLogin
    // } = useAuth();
    //
    // without passing props manually.
    // ==================================================
    return (

        <AuthContext.Provider

            value={{

                // Current logged-in user
                user,

                // Loading state
                loading,

                // Function for logging in
                handleLogin,

                // Function for registering
                handleRegister

            }}

        >

            {/* 
                Render everything wrapped inside AuthProvider.

                Example:

                <AuthProvider>
                    <App />
                </AuthProvider>

                children = <App />

                Therefore React renders:

                <AuthContext.Provider>

                    <App />

                </AuthContext.Provider>

                Every component inside App now has access
                to AuthContext.
            */}
            {children}

        </AuthContext.Provider>

    );

}

```


---------------------

**useNavigate**

useNavigate is a React Router hook that lets you navigate (change pages) programmatically using JavaScript instead of requiring the user to click a link.

Think of it like this:

<Link> → User clicks to navigate.
useNavigate() → Your code decides when to navigate.
Why do we need useNavigate?

Suppose a user logs in successfully.

You don't want them to manually click a link to go to the dashboard.

Instead:

User clicks Login
        │
        ▼
Backend verifies credentials
        │
        ▼
Login Successful
        │
        ▼
Automatically go to Dashboard

This is exactly what useNavigate() is for.

Syntax
import { useNavigate } from "react-router-dom";

const navigate = useNavigate();

useNavigate() returns a function.

const navigate = useNavigate();

Now you can use that function anywhere in your component.

Example 1: Navigate after login
import { useNavigate } from "react-router-dom";

function Login() {

    const navigate = useNavigate();

    async function handleSubmit() {

        const res = await handleLogin(username, password);

        if(res){

            navigate("/dashboard");

        }

    }

}

Flow:

Login Button
      │
      ▼
handleLogin()

      │
      ▼
Success

      │
      ▼
navigate("/dashboard")

      │
      ▼
Browser URL

/dashboard
Example 2: Go to Register Page

Instead of

<Link to="/register">
    Register
</Link>

you could write

const navigate = useNavigate();

<button onClick={() => navigate("/register")}>
    Register
</button>

When clicked:

Button

↓

navigate("/register")

↓

URL changes

/register
Example 3: Go Back
navigate(-1);

Works like the browser's Back button.

Home

↓

Profile

↓

Settings

↓

navigate(-1)

↓

Profile
Example 4: Go Forward
navigate(1);

Equivalent to the browser's Forward button.

Example 5: Replace the current page

Normally:

navigate("/dashboard");

adds a new entry to the browser history.

History becomes:

/login

↓

/dashboard

If the user presses Back:

/dashboard

↓

/login

Sometimes you don't want that.

Example:

After login,

the user should not return to Login by pressing Back.

Use:

navigate("/dashboard", { replace: true });

Now history becomes

/dashboard

instead of

/login

↓

/dashboard

The login page is replaced.

How it works internally

Suppose the browser is at

http://localhost:5173/login

When React executes

navigate("/dashboard");

React Router:

Updates the URL
http://localhost:5173/dashboard
Finds the matching route
<Route path="/dashboard" element={<Dashboard />} />
Renders
<Dashboard />

without reloading the page.

This is why React applications feel fast.

Difference between Link and useNavigate
Link

Used when the user clicks something.

<Link to="/profile">
    Profile
</Link>
useNavigate

Used when your code decides.

Examples:

Login successful
Register successful
Logout
Payment completed
Form submitted
Unauthorized access
Example in your project

After successful registration:

async function handleFormSubmit(e) {
    e.preventDefault();

    try {

        const res = await handleRegister(
            username,
            email,
            password
        );

        if(res){

            navigate("/login");

        }

    } catch(err){

        console.log(err);

    }
}

Flow:

User fills Register Form
            │
            ▼
handleRegister()

            │
            ▼
Backend creates user

            │
            ▼
Response received

            │
            ▼
navigate("/login")

            │
            ▼
Login Page opens
Summary
Link	useNavigate
Declarative navigation	Programmatic navigation
User clicks to move	Code decides when to move
<Link to="/login" />	navigate("/login")
Good for menus and buttons	Good after login, logout, form submission, redirects

In your authentication flow, a common pattern is:

const navigate = useNavigate();

const res = await handleLogin(username, password);

if (res) {
    navigate("/dashboard", { replace: true });
}

This logs the user in and immediately redirects them to the dashboard without requiring another click.



--------------------------

**4 layer react architecture**

Why call it a "layer"?

Think of your project like layers.

UI Layer
│
├── Login.jsx
├── Register.jsx
├── Navbar.jsx
│
▼
Hook Layer
│
├── useAuth()
├── useTheme()
├── useCart()
│
▼
State Layer
│
├── AuthContext
├── CartContext
│
▼
Service Layer
│
├── auth.api.js
├── product.api.js
│
▼
Backend

Each layer has one responsibility.

UI Layer

Responsible only for displaying things.

Example:

<button>Login</button>

Shouldn't know how Axios works.

Hook Layer

Responsible for reusable logic.

Example:

const {
    handleLogin,
    loading
} = useAuth();

The component doesn't care where these come from.

State Layer

Stores application state.

Example:

user
loading
theme
cart

Usually implemented with:

Context API
Redux
Zustand
Service Layer

Makes HTTP requests.

Example:

login(username,password)

Internally:

axios.post(...)

Components never call Axios directly.

In your project

Right now your architecture looks like this:

Login.jsx
      │
      ▼
useAuth()

      │
      ▼
AuthContext

      │
      ▼
login()

      │
      ▼
axios

      │
      ▼
Backend

Flow:

User clicks Login

        │
        ▼
Login.jsx

        │
        ▼
useAuth()

        │
        ▼
handleLogin()

        │
        ▼
login()

        │
        ▼
Backend

        │
        ▼
Response

        │
        ▼
setUser()

        │
        ▼
React updates UI
Why not call Context directly?

Without hook layer:

Every component writes

import { useContext } from "react";
import { AuthContext } from "../auth.context";

const auth = useContext(AuthContext);

Twenty components.

Twenty imports.

Twenty useContext() calls.

With hook layer:

const auth = useAuth();

Only one line.

If you later change your authentication implementation, you update useAuth() instead of every component.

Why large companies use a hook layer

Imagine you later switch from:

Context API

to

Redux

Without a hook layer:

You must edit every component.

With a hook layer:

Only useAuth() changes.

The rest of the app still does:

const { user, handleLogin } = useAuth();

No other files need to know how authentication is implemented.

Summary
Layer	 ->  Responsibility
UI Layer ->	Renders the interface and handles user interactions.
Hook Layer ->	Exposes reusable logic through custom hooks like       useAuth().
State Layer  ->	Stores shared state (user, loading, etc.).
Service Layer -> Makes API calls (Axios/fetch) and returns data.
Backend	Processes requests, interacts with the database, and returns responses.

The hook layer acts as a bridge between your UI and your application's state or services. It hides implementation details so components can focus on rendering rather than managing how data is obtained or updated.


