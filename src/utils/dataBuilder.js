const fs = require("fs");
const path = require("path");

function build(save = false, pathToSave = "") {
  const regionData = path.resolve(`${__dirname}/../../res/regional_data.csv`);
  const file = fs.readFileSync(regionData, "UTF-8");

  let lines = file.split("\n");

  const data = {};


  for (const line of lines.slice(0, lines.length - 2)) {

    const lineContent = line.split(",");
    const city = lineContent[0];
    const dep = lineContent[1];
    const region = lineContent[2];
    const cityScore = lineContent[6];
    const depScore = lineContent[5];
    const regionScore = lineContent[4];



    const content = {

      "city_score": cityScore,
      "dep_score": depScore,
      "region_score": regionScore,

    };

    if (!(region in data)) {

      data[region] = {};

    }

    if (!(dep in data[region])) {

      data[region][dep] = {};

    }

    data[region][dep][city] = content;
  }

  const pathFragilityScores = path.resolve(
    `${__dirname}/../../res/fragility_scores.csv`
  );
  const fileFragilityScores = fs.readFileSync(pathFragilityScores, "UTF-8");
  lines = fileFragilityScores.split("\n");

  function getCity(city = "") {

    for (const regionName in data) {

      for (const depName in data[regionName]) {

        for (const cityName in data[regionName][depName]) {
          if (city.toLowerCase().trim() === cityName.toLowerCase().trim()) {

            return data[regionName][depName][cityName];

          }
        }
      }
    }

    return null;
  }

  let city = null;
  let lastCity = "";
  const fieldList = [];

  for (const line of lines.slice(0, lines.length - 2)) {

    const lineContent2 = line.split(",");
    const cityName = lineContent2[0];
    const irisZName = lineContent2[1];
    const field = lineContent2[2];
    const value = lineInfo[3];

    if (lastCity !== cityName) {

      lastCity = cityName;
      city = getCity(cityName);

    }

    if (city === null) continue;

    if (city["iris"] === undefined) city["iris"] = [];

    let irisZ = city.iris.find((iz) => iz.name === irisZName);

    if (irisZ === undefined) {
      irisZ = {
        name: irisZName,
      };

      city.iris.push(irisZ);
    }

    if (!isNaN(value)) {
      const number = parseFloat(value);
      irisZ[field] = number;
    }

    if (!fieldList.includes(field)) {
      fieldList.push(field);
    }
  }

  for (const regionName in data) {

    for (const depName in data[regionName]) {

      for (const cityName in data[regionName][depName]) {

        const city = data[regionName][depName][cityName];

        if (city.iris instanceof Array) {

          const totalPopulation = city.iris.reduce((sum, irisZ) => {
            if (typeof irisZ.Population === "number") {
              return sum + irisZ.Population;
            }

            return sum;
          }, 0);

          for (const field of fieldList) {

            city[field] =
              city.iris.reduce((sum, irisZ) => {
                if (
                  typeof irisZ[field] === "number" &&
                  typeof irisZ.Population === "number"
                ) {
                  return sum + irisZ.Population * irisZ[field];
                }

                return sum;
              }, 0) / totalPopulation;
          }

          city["Population"] = totalPopulation;
          delete city.iris;
        }
      }
    }
  }

  if (save) {

    fs.writeFile(pathToSave, JSON.stringify(data), (err) => {

      if (err) {
        console.error(err);
      }

      console.log(pathToSave, "saved");
    });
  }

  return data;
}

function getPostCodeData() {

  postCodeDict = {};

  const pathPostCodeData = path.resolve(
    `${__dirname}/../../res/postal_codes.json`
  );

  const postCodeData = fs.readFileSync(pathPostCodeData, "UTF-8");

  const postCodeJSON = JSON.parse(postCodeData);

  const pathDepData = path.resolve(`${__dirname}/../../res/departments.json`);

  const depData = fs.readFileSync(pathDepData, "UTF-8");

  const depJSON = JSON.parse(depData);

  for (const postCodeInstance of postCodeJSON) {

    const postCode = postCodeInstance["codePostal"];

    const cityName = postCodeInstance["nomCommune"];

    const depNumber = postCode.substring(0, 2);

    let depName = "";

    for (const dep of depJSON) {

      if (dep["code"] === depNumber) {
        depName = dep["name"].toUpperCase();
        break;
      }
    }

    postCodeDict[postCode] = { cityName, depName };
  }

  return postCodeDict;
}

module.exports = {
  build,
  getPostCodeData,
};
