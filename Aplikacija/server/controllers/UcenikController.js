let UcenikModel = require('../models/Ucenik');

let UcenikController = {
    all: async (req, res) => {
        let sviUcenici = await UcenikModel.find();
        res.json(sviUcenici);
    },
    create: async (req, res) => {
        let noviUcenik = new UcenikModel(req.body);
        let saved = await noviUcenik.save();
        res.json(saved);
    },
    find: async (req, res) => {
        let found = await UcenikModel.find({ Ime: req.params.Ime });
        res.json(found);
    },
    findByEmail: async (req, res) => {
        let found = await UcenikModel.find({ Email: req.params.Email });
        res.json(found);
    },
    findById: async (req, res) => {
        let sc = await UcenikModel.find({ _id: req.params._id });
        res.json(sc);
    }
    // ,
    // changePass: async (req, res) => {
    //     let sc = await UcenikModel.find({ _id: req.params._id });
    //     res.json(sc);
    // }
}

module.exports = UcenikController;