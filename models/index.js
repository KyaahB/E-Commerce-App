// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
Product.belongsTo(Category, {
  foreignKey: 'product_id'
});
// Categories have many Products
Category.hasMany(Product, {
  foreignKey: 'product_id'
})
// Products belongToMany Tags (through ProductTag)
Product.hasMany(Tag, {
  foreignKey: 'product_tag'
})
// Tags belongToMany Products (through ProductTag)
Tag.hasMany(Product, {
  foreignKey: 'product_tag'
})
module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
