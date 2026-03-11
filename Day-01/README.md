1. Code Packages (Modules/Libraries)

A code package is a reusable bundle of software containing pre-written code (like libraries, frameworks, and utilities), along with essential metadata and documentation, designed to add specific functionality to a project without writing everything from scratch. These are central to modern web development, saving significant time and effort. 

Purpose:

Code Reusability: Developers leverage existing, tested code to implement common features (e.g., handling dates, making HTTP requests, UI components).

Modularity & Organization: Packages break large applications into manageable, logical components, making the codebase cleaner and easier to maintain.

Dependency Management: They define what other packages they rely on, and package managers automate the process of installing and updating these dependencies.

Avoiding Naming Conflicts: They use namespaces to prevent conflicts between different packages that might use the same class or function names.

Management Tools: Packages are managed using package managers such as:

npm (Node Package Manager): The default and most widely used package manager for JavaScript and Node.js projects, providing access to a vast public registry of packages.

Yarn: An alternative to npm, known for speed and reliable, deterministic installations using a lockfile.

pnpm: A fast, disk-space efficient package manager that uses a unique installation method to save storage space.

Examples: Popular packages include React (UI library), Axios (HTTP requests), Bootstrap (CSS framework), and Express (Node.js server framework). 


-------------------------------------

To use any package in our project or in a specific folder first we need to install it 

to install go to that project/folder thenn use command "npm i/install <package-name>"

to use the installed package use "require("package-name")" in js file and save it in varible like "const catMe = require(cat-me)" then call it

```js
const catMe = require("cat-me")
catMe()
```

-------------------------------------
A package has following files

- package.json -> it list the dependencies that on which package our js code depends

- node_modules -> this folder contains all the codes of the package

- package-lock.json -> our installed package dependsd on what other packages that is managed by this file


-------------------------------------

SERVER

a server is a computer or software system that stores, processes, and delivers web content to users (clients) over the internet using the client-server model. Its primary role is to listen for client requests and respond with the appropriate information, such as web pages, images, or data. 

Key Components
A server typically involves a combination of hardware and software: 
Hardware: The physical computer that is connected to the internet and stores a website's files and software. These machines are often more powerful and reliable than personal computers and are designed for continuous operation.

Software: The programs that handle the requests and manage the flow of data. The most essential piece of software is the HTTP server (e.g., Apache HTTP Server, Nginx, Microsoft IIS) which understands URLs and the HTTP protocol. 

How It Works
The process of a user accessing a website involves several steps:

Request: A user enters a URL in their web browser (the client), which sends an HTTP request to the server.
Processing: The browser first finds the server's IP address using the Domain Name System (DNS). It then connects to the server, which receives and processes the request.

Response: The server locates the requested file (e.g., an HTML document, image, or CSS file) in its storage. If the content is static, it sends the file as-is. If the content is dynamic (e.g., personalized content from a database), the server runs server-side scripts (like PHP, Python, or Node.js) to generate the content before sending it back to the browser.

Rendering: The browser receives the response and renders the webpage on the user's screen. 

Types of Servers in Web Development
The term "server" can refer to different functionalities:

Web Server: Primarily handles HTTP requests and serves static content like HTML, CSS, and image files.

Application Server: Extends the capabilities of a web server by adding business logic and processing dynamic content, often interacting with a database.

Database Server: Manages and stores structured data that applications can access and manipulate.

Mail Server, File Server, etc.: Other specialized servers used for specific tasks like email communication or file sharing. 


-----------------------------------

/ to create a server first run the command "npm init -y" in the terminal 
// install express package with the command "npm i express" in the terminal
// use "require("express")" in  your js file

```js
const express = require("express")

const app = express() // server create kr chuke ho

app.listen(3000) // "app.listen()" server ko sart krta h
```