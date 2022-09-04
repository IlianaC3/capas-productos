const ChatDB = require('../../db/db-functions/Chat')
const parseJSON = obj => JSON.parse(JSON.stringify(obj))

class Contenedor {
    async save(chat) {
		try {
            let autorObject = {};
            const AutorInfo = await ChatDB.CheckAutor(chat.autor.id);
            if (AutorInfo.length > 0) {
                autorObject = {
                    id: chat.autor.id,
                    nombre: AutorInfo[0].nombre,
                    apellido: AutorInfo[0].apellido,
                    edad: AutorInfo[0].edad,
                    avatar: AutorInfo[0].avatar,
                    alias: AutorInfo[0].alias,
                }
            } else {
                autorObject = {
                    id: chat.autor.email,
                    nombre: chat.autor.nombre,
                    apellido: chat.autor.apellido,
                    edad: chat.autor.edad,
                    avatar: chat.autor.avatar,
                    alias: chat.autor.alias,
                }
                const SaveInfoAutor = await ChatDB.SaveAutor(autorObject);
            }
            let object = {
                text: chat.text,
                timestamp: new Date(),
                autor: autorObject
            }
            let doc = await ChatDB.SaveMensaje(object);
            doc = parseJSON(doc)
            return "Mensaje guardado" + chat.text
        } catch(error) {
            return "Error al leer archivo" + error;
        }
	}

	async getAll() {
		try {
            let docs = await ChatDB.GetMensajes();
            docs = docs.map(parseJSON)
            return docs
            } catch (error) {
                return `Error al listar todo: ${error}`
        }
	}

}

module.exports = Contenedor;