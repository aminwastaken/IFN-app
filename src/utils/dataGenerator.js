const path = require("path");
const fs = require("fs");

const { build, getPostCodeData } = require("./dataBuilder");

let data = null;
const pathData = path.resolve(`${__dirname}/../../res/data.json`);

try {

  if (fs.existsSync(pathData)) {

    try {

      data = JSON.parse(fs.readFileSync(pathData, "utf-8"));

    } catch (e) {

      console.error(
        "Impossible d'obtenir des données, tentative de rebuild le json"
      );

      tryBuild();
    }
  } else {

    tryBuild();

  }
} catch (e) {

  console.error(e);
  tryBuild();

}

function tryBuild() {

  try {

    data = build(true, pathData);

  } catch (e) {

    console.error("Impossible de construire le data.json", e);
    process.exit(1);

  }

}

const listRegion = Object.keys(data).sort();
const listDepartment = [];
const listTown = [];



let CPDict = null;
try {

  CPDict = getPostCodeData();

} catch (e) {

  console.error(e, "Impossible d'obtenir le code postal");
  process.exit(1);

}

for (const nameRegion in data) {

  for (const nameDepartment in data[nameRegion]) {

    listTown.push(...Object.keys(data[nameRegion][nameDepartment]));

  }

}

for (const nameRegion in data) {

  listDepartment.push(...Object.keys(data[nameRegion]));

}




module.exports = {
  listDepartment: listDepartment.sort(),
  data,
  CPDict,
  listRegion,
  listTown: listTown.sort(),
};
