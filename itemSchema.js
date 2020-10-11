var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var itemSchema = new Schema({
    item: {type: String, _index: 1, required: true}
}, {collection: 'my_collection'});
exports.itemSchema = itemSchema;