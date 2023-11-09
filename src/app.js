const express = require("express");
const app = express();
const musiciansRouter = require("../routers/musicians");



app.use("/musicians", musiciansRouter);

module.exports = app;
