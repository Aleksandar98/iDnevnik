var mongoose = require("mongoose");
const { Schema } = mongoose;

const NapomenaSchema = new Schema({
    Tekst: String,
    Datum: String,
    //Ucenik: UcenikSchema
})

const DogadjajSchema = new Schema({
    Tekst: String,
    Datum: String,
    //Ucenik: UcenikSchema
})

const DanSchema = new Schema({
    Dan: String,
    Predmeti: [String]
})

/*const RasporedSchema = new Schema({
    Dani: [DanSchema]
})*/

const IzostanakSchema = new Schema({
    Razred: Number,
    Polugodiste: String,
    Tip: String,
    Predmet: String,
    Datum: String,
    //Ucenik: UcenikSchema
})

const OcenaSchema = new Schema({
    Razred: Number,
    Polugodiste: String,
    Vrednost: Number,
    //Predmet: [PredmetSchema]
}) 

const PredmetSchema = new Schema({
    Naziv: String,
    Ocene: [OcenaSchema],
    //Ucenik: UcenikSchema
})

const ForumPostSchema = new Schema({ // jedan post na forumu, TipPosta moze biti domaci,test,vannastavna,ostalo
    TipPosta: String,
    Sadrzaj: String,
    Datum: String
})


const Ucenik1Schema = new Schema({
    Ime: String,
    Prezime: String,
    Jmbg: String,
    DatumRodjenja: String,
    Adresa: String,
    Email: String,
    Razred: Number,
    Odeljenje: Number,
    Vladanje: Number,
    Napomene: [NapomenaSchema],
    Dogadjaji: [DogadjajSchema],
    Raspored: [DanSchema],
    Izostanci: [IzostanakSchema],
    Predmeti: [PredmetSchema],
    Post: [ForumPostSchema]
})

module.exports= mongoose.model('Ucenik1', Ucenik1Schema);