var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var contact = new Schema({
        FullName:
            {
                type: String,
            },
        Phone: {
            type: Number,
        }
    }
);

module.exports = mongoose.model('contacts', contact);
