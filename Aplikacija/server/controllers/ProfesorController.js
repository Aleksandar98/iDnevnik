const router = require('express').Router();
const Profesor = require('../models/Profesor');

router.post('/dodajProfesora', (req, res) => {
    const Ime = req.body.ime;
    const Prezime = req.body.prezime;
    const Email = req.body.email;
    const Predmet = req.body.predmet;
    const Razredni = req.body.razredni;
    const Odeljenja = req.body.odeljenja;
    const Zahtevi = req.body.zahtevi;
    let prof = new Profesor({Ime,Prezime,Email,Predmet,Razredni,Odeljenja,Zahtevi});
    console.log(req);
    prof.save()
    .then(() => res.json(prof))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.get('/vratiProfesore', (req, res) => {
    Profesor.find()
    .then(profesori => res.send(profesori))
    .catch(err => res.status(400).json('Error: ' + err));
})

router.get('/Profesor/:_id', (req, res) => {
    Profesor.findById(req.params._id)
        .then(prof => res.send(prof))
        .catch(err => console.log(err));
})


router.delete('/brisiProfesora/:id', (req, res) => {
    Profesor.findByIdAndDelete(req.params.id)  
    .then(() => {res.json('Uspesno sam obrisao profesora sa prosledjenim id-om!')})
    .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/login', (req, res) => {
    Profesor.find(req.body)
    .then(profa => res.send(profa[0]))
    .catch(err => res.status(400).json('Error: ' + err));
})

router.post('/vratiProfesora', (req, res) => {
    Profesor.find({email: req.body.email}, (err, result) => {
        if(err) 
        {
        res.send(err);
        }
        else
        {
        res.send(result[0]);
        }
    })
})

router.post('/primiZahtev', (req, res) => {
  
        Profesor.findByIdAndUpdate(req.body.id_profe,
        { $push: { Zahtevi: [req.body.zahtev] } },
        (err, result) => {
            if (err) {
                res.json('error');
            }
            else {
                res.json(result);
            }
        }
    )
})


module.exports = router;