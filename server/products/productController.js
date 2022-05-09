const db = require('../db').get();

exports.index = async function(req, res) {
    res.json(['uno', 'otro']);
}

exports.insert = async function(req, res) {
    const productDump = {
        name: 'Pescado frito',
        precio1: 2000,
        precio2: 2500,
        precio3: 2800,
        precio4: 3000,
    }
    let result = await db.collection('products').insert(productDump);
    res.json(result);
}
