const mongoose = require('mongoose');

var DbConnection = function () {

    var db = null;

    async function DbConnect() {
        try {
            //const uri = "mongodb+srv://admin:PASSWORD@arley.jbqv8.mongodb.net/arleyDB?retryWrites=true&w=majority";
            const uri = process.env.MONGODB_URI;
            let _db = await mongoose.connect(uri, { useUnifiedTopology: true })
            console.log('Conected')
            return database
        } catch (e) {
            return e;
        }
    }

   async function get() {
        try {
            if (db !== null) {
                return db; // db connection is already instanced
            } else {
                db = await DbConnect(); // getting new db connection
                return db; 
            }
        } catch (e) {
            return e;
        }
    }

    return {
        get: get,
    }
}


module.exports = DbConnection();