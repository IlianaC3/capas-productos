const { Connection, mongoose } = require('../mongoose')

//Base de datos
const DatabaseUsuarios = mongoose.model('usuarios', {
    email: { type: String, required: true },
    nombre: { type: String, required: true },
    password: { type: String, required: true }
});

//Funciones
Connection();

const CheckUser = async function(email) {
    return DatabaseUsuarios.find({ 'email': email }, { __v: 0 });
} 

const SaveUsuario = async function(object) {
    return DatabaseUsuarios.create(object);
} 

const FindUser = async function(email) {
    console.log(email)
    return DatabaseUsuarios.findOne({ 'email': email }, { __v: 0 });
} 

module.exports = { CheckUser, SaveUsuario, FindUser };