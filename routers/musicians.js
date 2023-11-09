const express = require("express");
const musiciansRouter = express.Router();
const { check, validationResult } = require("express-validator");
const { Musician } = require("../models/index");
musiciansRouter.use(express.json());
musiciansRouter.use(express.urlencoded({ extended: true }));

//CRUD OPERATIONS HERE
musiciansRouter.get("/", async (req, res) => {
  const musicians = await Musician.findAll();
  res.json(musicians);
});

musiciansRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  const response = await Musician.findByPk(id);
  res.json(response);
});

musiciansRouter.post(
  "/",
  [
    check("name").not().isEmpty().trim(),
    check("name").isLength({ min: 2, max: 20 }),
    check("instrument").not().isEmpty().trim(),
    check("instrument").isLength({ min: 2, max: 20 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json({ error: errors.array() });
    } else {
      const body = req.body;
      const newMusician = await Musician.create({
        name: body.name,
        instrument: body.instrument,
      });
      res.json(newMusician);
    }
  }
);

musiciansRouter.put(
  "/:id",
  [
    check("name").not().isEmpty().trim(),
    check("name").isLength({ min: 2, max: 20 }),
    check("instrument").not().isEmpty().trim(),
    check("instrument").isLength({ min: 2, max: 20 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json({ error: errors.array() });
    } else {
      const id = req.params.id;
      const musician = await Musician.findByPk(id);
      const update = await musician.update({
        name: `${req.body.name}`,
        instrument: `${req.body.instrument}`,
      });
      res.json(update);
    }
  }
);

musiciansRouter.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const deleted = await Musician.destroy({ where: { id: `${id}` } });
  res.json(deleted);
});

module.exports = musiciansRouter;
