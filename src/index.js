const express = require("express");
const path = require("path");
const compression = require("compression");

//looking up the port in the env file, the server runs on 8080 when the port isn't found
const PORT = process.env.port || 8080;

const app = express();

app.use(compression());

app.use(express.json());

app.use(express.static(path.resolve(`${__dirname}/../front/build`)));

require("./routes")(app);

app.listen(PORT, () => {
  console.log(`Listenning on port ${PORT}`);
});
