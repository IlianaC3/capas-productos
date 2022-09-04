const ProductosDB = require('../../db/db-functions/Productos')

class Contenedor {
	async save(product) {
		return await ProductosDB.SaveProduct(product)
	}

	async getById(id) {
		return await ProductosDB.ProductId(id)
	}

	async getAll() {
		return await ProductosDB.ProductAll()
	}

	async updateById(id, product) {
		return await ProductosDB.UpdateProduct(id, product)
	}

	async deleteById(id) {
		return await ProductosDB.DeleteProduct(id)
	}
}

module.exports = Contenedor;
