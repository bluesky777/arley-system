// create an express app
const express = require("express");
const routes = require("./routes");
const cors = require('cors');
const app = express();

// use the express-static middleware
app.use(cors());
app.use(express.static("public"));
app.use(express.json());

app.use('/api', routes);

// start the server listening for requests
app.listen(process.env.PORT || 3001, 
	() => console.log("Server is running..."));