const mongoose = require('mongoose');
const Connections = require('./db-config');

const Connection = async function main() {
    await mongoose.connect(Connections.mongodbU.cnxStr, Connections.mongodbU.options);
}

module.exports = { Connection, mongoose }