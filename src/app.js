const express = require("express");
const app = express();
const { Musician } = require("../models/index");
const { db } = require("../db/connection");

const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//TODO: Create a GET /musicians route to return all musicians

app.get("/musicians", async (req, res) => {
  const musicians = await Musician.findAll();
  res.json(musicians);
});

app.get("/musicians/:id", async (req, res) => {
  const id = req.params.id;
  const response = await Musician.findByPk(id);
  res.json(response);
});

app.post("/musicians", async (req, res) => {
  const newMusician = await Musician.create(req.body);
  res.json(newMusician);
});

app.put("/musicians/:id", async (req, res) => {
  const id = req.params.id;
  const musician = await Musician.findByPk(id);
  const update = await musician.update({
    name: `${req.body.name}`,
    instrument: `${req.body.instrument}`,
  });
  res.json(update);
});

app.delete("/musicians/:id", async (req, res) => {
  const id = req.params.id;
  const deleted = await Musician.destroy({ where: { id: `${id}` } });
  res.json(deleted);
});

module.exports = app;
