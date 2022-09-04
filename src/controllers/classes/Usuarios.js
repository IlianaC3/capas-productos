const UsuariosDB = require('../../db/db-functions/Usuarios')
const bcrypt = require('bcrypt');
const parseJSON = obj => JSON.parse(JSON.stringify(obj))

class Contenedor {
    async save(usuario) {
		try {
            let userObject = {};
            const usuarioInfo = await UsuariosDB.CheckUser(usuario.email);
            if (usuarioInfo.length < 1) {
                let salt = bcrypt.genSaltSync(10);
				let hash = bcrypt.hashSync(usuario.password, salt);
                userObject = {
                    email: usuario.email,
                    nombre: usuario.name,
                    password: hash
                };
                let doc = await UsuariosDB.SaveUsuario(userObject);
                // console.log(doc)
                doc = parseJSON(doc)
                return userObject
            } else {
                return null;
            }
            
        } catch(error) {
            console.log(error)
            return undefined;
        }
	}

	async loginUser(usuario) {
		try {
            const docs = await UsuariosDB.FindUser(usuario.email);
            let hash = docs.password;
			let verify = bcrypt.compareSync(usuario.password, hash);
			if (verify) {
                let info = {
                    email: docs.email,
                    nombre: docs.nombre
                }
                return info
            } else {
                return null
            }
            } catch (error) {
                return undefined
        }
	}

}

module.exports = Contenedor;