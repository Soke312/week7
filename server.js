var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/myDB');
var itemSchema = require('./itemSchema.js').itemSchema;
var Items = mongoose.model('item', itemSchema);

var ROOT_DIR = "./";

mongoose.connection.once('open', function() {
    app.use(bodyParser.urlencoded({extended: true}));

    app.post('*', function (request, response) {
        var newItem = new Items({
            item: (request.body).item
        })
        newItem.save(request.body, function (err, doc) {
            console.log(doc)
            response.status(200);
            response.send(JSON.stringify({}));
        });
    });
    app.use(express.static('./'))

    app.get('/list', function(request, response) {
        var query = Items.find();
        query.exec(function (err, docs) {
            response.writeHead(200);
            response.end(JSON.stringify({docs}));
        })
    });
    app.use('/', express.query());

    app.delete("/", function(request,response) {
        Items.deleteOne({_id: request.query.id}).exec()
    })

    app.listen(8080, function(){
        console.log('Application actually works!, Yay!')
    });
});


