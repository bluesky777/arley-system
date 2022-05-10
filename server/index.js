// create an express app
const express = require("express");
const routes = require("./routes");
const cors = require('cors');
const app = express();
const path = require('path');

const publicPath = path.join(__dirname, '..', 'public');

app.use(cors());
app.use(express.static("public"));
app.use(express.json());

app.use('/api', routes);

app.get('*', (_, res) => {
	res.sendFile(path.join(publicPath, 'index.html')), function(err) {             
		if (err) {                 
			res.status(500).send(err) 
		}        
	};
});
// start the server listening for requests
app.listen(process.env.PORT || 3001, 
	() => console.log("Server is running..."));