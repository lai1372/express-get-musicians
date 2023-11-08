const express = require("express");
const router = express.Router();
const { Musician } = require("../models/index");
const { db } = require("../db/connection");

router.get("/", async (req, res) => {
  const musicians = await Musician.findAll();
  res.json(musicians);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const response = await Musician.findByPk(id);
  res.json(response);
});

router.post("/", async (req, res) => {
  const body = req.body;
  const newMusician = await Musician.create({
    name: body.name,
    instrument: body.instrument,
  });
  res.json(newMusician);
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const musician = await Musician.findByPk(id);
  const update = await musician.update({
    name: `${req.body.name}`,
    instrument: `${req.body.instrument}`,
  });
  res.json(update);
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const deleted = await Musician.destroy({ where: { id: `${id}` } });
  res.json(deleted);
});

module.exports = router;
