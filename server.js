const app = require("./src/app");
const musiciansRouter = require("./routers/musicians");
const { db } = require("./db/connection");
const port = 3000;

app.listen(port, () => {
  db.sync();
  console.log(`Listening at http://localhost:${port}/musicians`);
});

app.use("/musicians", musiciansRouter);
