
---API

An API (Application Programming Interface) is a set of rules and protocols that allows two different software programs or systems to communicate and exchange data with each other. It acts as an intermediary or messenger, enabling applications to share data and functionality without the developers needing to know the internal workings of the other system. 


--How APIs Work
The communication generally follows a client-server model using a request-response cycle: 

Request: A client application (e.g., a mobile app) sends a request to a specific API endpoint (a URL) for a particular service or data, often including parameters and authentication credentials.

Processing: The API receives the request and sends it to the server that hosts the required data or functionality.

Response: The server processes the request, retrieves the data or performs the action, and sends the result back to the API.

Delivery: The API delivers the response to the client application, typically in a standardized format like JSON or XML, which the application then interprets and displays to the user. 

--Common Examples
You interact with APIs constantly in daily life, often without realizing it: 

Weather Apps: Your phone's weather app uses an API to fetch the latest data from a national weather service.
Online Payments: When you use options like "Pay with PayPal" on an e-commerce site, an API securely connects the website to the payment processor to handle the transaction.
Social Media Login: The ability to "Log in with Google" or Facebook on third-party websites is facilitated by APIs that verify your identity.
Ride-sharing and Maps: Apps like Uber use the Google Maps API to provide maps, directions, and real-time location services. 

--Types of APIs
APIs are categorized by their scope and architecture: 


Public (Open) APIs: Available for use by any external developer to foster innovation and expand reach (e.g., the NASA API for imagery).

Partner APIs: Shared only with specific business partners to facilitate secure business-to-business integrations (e.g., a hotel booking system integrating with an airline's API).

Private (Internal) APIs: Used exclusively within an organization to connect internal systems and teams, not exposed to the public internet. 


--Key Benefits
Faster Development: Developers can reuse existing, proven functionality instead of building everything from scratch.
Integration: APIs enable seamless connectivity between disparate software systems, allowing data to flow automatically.
Security: APIs provide a structured, secure way to share data and functionality, hiding the complexity of the backend system and applying controls like authentication.

---------------------------------------

app.use(express.json())  // its a middleware --- here it used to read the data sent from frontend

/ post method ->  Creates a new resource. The request body contains the data for the new resource. 

app.post('/notes', (req, res) => {

    console.log(req.body) // req (request) is used for getting data from user/client/frontend

    res.send("note created") // res (response) is used for sending data from server
})


/ get method -> Retrieves a resource or a list of resources. Should not modify data on the server.
app.get('/notes', (req,res) => {
    res.send(notes) // shows data on frontend
})

"WE USE POSTMAN FOR API BUILDING AND TESTING"