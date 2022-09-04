const { mysql } = require('../db-config');

//Funciones
const SaveProduct = async function(product) {
    return mysql('productos').insert(product)
    .then((id) => {
        return 'El producto se ha guardado  con ID: ' + id;
    })
    .catch((err) => {
        return 'No se pudo guardar el producto, intente más tarde.';
    });
}

const ProductId = async function(id) {
    return mysql('productos')
			.select({
				id: 'id',
				title: 'title',
				price: 'price',
				thumbnail: 'thumbnail'
			})
			.where({ id })
			.then((productos) => {
				return productos[0];
			})
			.catch((err) => {
				console.error(err);
				return 'Error al encontrar productos';
			});
}

const ProductAll = async function() {
    return mysql('productos')
			.select({
				id: 'id',
				title: 'title',
				price: 'price',
				thumbnail: 'thumbnail'
			})
			.then((productos) => {
				return productos;
			})
			.catch((err) => {
				console.error(err);
				return 'Error al encontrar productos';
			});
}

const UpdateProduct = async function(product) {
    return mysql('productos')
			.update(product)
			.where({ id })
			.then((result) => {
				return result > 0 ? 'El producto se ha actualizado  con ID: ' + id : 'No se ha editado el producto';
			})
			.catch((err) => {
				return 'No se pudo guardar el producto, intente más tarde.';
			});
}

const DeleteProduct = async function(id) {
    return mysql('productos')
    .delete()
    .where({ id })
    .then((result) => {
        return result > 0 ? 'El producto se ha eliminado  con ID: ' + id : 'No se ha eliminado el producto';
    })
    .catch((err) => {
        return 'No se pudo guardar el producto, intente más tarde.';
    });
}

module.exports = { SaveProduct, ProductId, ProductAll, UpdateProduct, DeleteProduct };