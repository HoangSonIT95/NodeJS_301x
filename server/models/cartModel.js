const fs = require('fs');
const path = require('path');

const p = path.join(path.dirname(require.main.filename), 'data', 'cart.json');

module.exports = class Cart {
  static addProduct(id, productPrice) {
    // lay du lieu gio hang tu file json
    fs.readFile(p, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 };
      // neu lay du lieu thanh cong thi set cart = fileContent tu du lieu json
      if (!err) {
        cart = JSON.parse(fileContent);
      }
      // tim index cua product co trong cart ma co id = id truyen vao
      const existingProductIndex = cart.products.findIndex(
        product => product.id === id
      );
      let updateProd;
      const existingProduct = cart.products[existingProductIndex];
      // neu co san pham tim dc tu gio hang
      if (existingProduct) {
        updateProd = { ...existingProduct };
        updateProd.qty = updateProd.qty + 1; // update qty tang len 1
        cart.products = [existingProduct];
        cart.products[existingProductIndex] = updateProd;
      } else {
        updateProd = { id: id, qty: 1 };
        cart.products = [...cart.products, updateProd];
      }

      cart.totalPrice = cart.totalPrice + +productPrice;

      fs.writeFile(p, JSON.stringify(cart), err => {
        console.log(err);
      });
    });
  }

  static getCart(cb) {
    fs.readFile(p, (err, fileContent) => {
      const cart = JSON.parse(fileContent);
      if (err) {
        cb(null);
      } else {
        cb(cart);
      }
    });
  }
};
