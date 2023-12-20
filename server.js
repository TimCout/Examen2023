import express from 'express';
import Voc from './models/Voc.js';

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get("/", async function (req, res) {
  const listeMots = await Voc.loadMany();
  const randomIndex = Math.floor(Math.random() * listeMots.length);
  res.render('listVoc.ejs', {listeMots, randomIndex});
});


app.get("/ajout", async function (req, res) {
  const listeMots = await Voc.loadMany();
  res.render('ajout.ejs', {listeMots});
});


app.post("/add", async function (req, res) {
  const mot = new Voc();
  mot.mot = req.body.mot;
  mot.trad = req.body.trad;
  await mot.save();
  res.redirect('/');
});

app.get("/rep/:id", async function (req, res) { //Faut encore faire le cas où mauvaise rep
  const good = await Voc.load({id: req.params.id});
  const rep = req.body.trad;
  if (rep == good.trad){
    res.redirect('/');
  }
});


app.get("/delete/:id", async function (req, res) {
  await Voc.delete({ id: req.params.id });
  res.redirect('/');
});


app.listen(80);
