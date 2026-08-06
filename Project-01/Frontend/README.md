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