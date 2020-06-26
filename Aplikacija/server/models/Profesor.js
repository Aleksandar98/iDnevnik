const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OdeljenjeSchema = new Schema({
    Razred: Number,
    Odeljenje: Number
})
const NaCekanjuSchema = new Schema({
    RoditeljId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Roditelj"
    },
    DeteId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ucenik"
    },
    Razred: Number,
    Polugodiste: String,
    Tip:String,
    Predmet: String,
    Datum: String,
    Prihvata: Boolean
})
const ProfesorSchema = new Schema({
    Ime:String,
    Prezime:String,
    Email:String,
    Predmet:String,
    Razredni: Boolean,
    Pol:String,
    Odeljenja: [OdeljenjeSchema],
    OdeljenjaRazredni:[OdeljenjeSchema],
    Zahtevi: [NaCekanjuSchema]
});

const Profesor = mongoose.model('Profesor',ProfesorSchema);
module.exports = Profesor;