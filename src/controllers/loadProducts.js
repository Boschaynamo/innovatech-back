const fs = require('fs');
const path = require('path');
const { Products, Categories } = require("../db"); // Asegúrate de ajustar la ruta al modelo de Products
const getProductById = require('./getProductById');

const loadProducts = async () => {
  // Leer el archivo JSON
  const data = fs.readFileSync(path.join(__dirname, '..', 'assets', 'utils', 'tech.json'), 'utf8');

  // Convertir los datos a un objeto JavaScript
  const products = JSON.parse(data);



  try {
    // Insertar los productos en la base de datos
    for (let i = 0; i < products.length; i++) {
      const findedCategory = await Categories.findOne({where:{name:products[i].category}})
      delete products[i].category;

      const createdProduct = await Products.create(products[i]);;
      const result = await createdProduct.setCategory(findedCategory);
    }
    console.log('Productos cargados exitosamente');
  } catch (error) {
    console.error('Error al cargar los productos:', error);
  }
}

module.exports = loadProducts;