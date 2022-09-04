const { Connection, mongoose } = require('../mongoose')

//Bases de datos
const DatabaseAutor =  mongoose.model('autor', {
    id: { type: String, required: true },
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    edad: { type: Number, required: true },
    alias: { type: String, required: true },
    avatar: { type: String, required: true },
});

const DatabaseMensaje = mongoose.model('mensajes', {
    text: { type: String, required: true },
    timestamp: { type: Date, default: new Date(), required: true },
    autor: { type: {}, required: true }
});

//Funciones
Connection();

const CheckAutor = async function(id) {
    return DatabaseAutor.find({ 'id': id }, { __v: 0 });
} 

const SaveAutor = async function(object) {
    return DatabaseAutor.create(object);
} 

const SaveMensaje = async function(object) {
    return DatabaseMensaje.create(object);
} 

const GetMensajes = async function() {
    return DatabaseMensaje.find({}, { __v: 0 }).lean()
}

module.exports = { CheckAutor, SaveAutor, SaveMensaje, GetMensajes }