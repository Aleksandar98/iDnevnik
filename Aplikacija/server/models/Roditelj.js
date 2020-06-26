var mongoose = require("mongoose");
//var Ucenik1 = require('./Ucenik1');
const { Schema } = mongoose;

const RoditeljSchema = new Schema({
    Ime: String,
    Prezime: String,
    Email: String,
    Telefon: String,
    Pol:String,
    Deca: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ucenik"
    }
})

module.exports = mongoose.model('Roditelj', RoditeljSchema);