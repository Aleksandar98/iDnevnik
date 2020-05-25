let RoditeljModel = require('../models/Roditelj');

let RoditeljController = {
    all: async (req, res) => {
        let sviRoditelji = await RoditeljModel.find();
        res.json(sviRoditelji);
    },
    create: async (req, res) => {
        let noviRoditelj = new RoditeljModel(req.body);
        let saved = await noviRoditelj.save();
        res.json(saved);
    },
    find: async (req, res) => {
        let found = await RoditeljModel.find({ Ime: req.params.Ime });
        res.json(found);
    }
}

module.exports = RoditeljController;