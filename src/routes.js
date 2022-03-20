const { data, listRegion, CPDict } = require("./utils/dataGenerator");
const generateDTO = require("./utils/generateDTO");
module.exports = function (app) {
  // departments route
  app.get("/departments", (req, res) => {

    const { region: regionName } = req.query;
    if (typeof regionName !== "string" || !(regionName in data)) {
      // the request was well-formed but was unable to be followed due to semantic errors
      res.status(422).send("Region name does not exist");
      return;
    }

    const region = data[regionName];
    // getting departments from regions
    const regionDepartments = Object.keys(region).sort();
    res.send(regionDepartments);

  });
  app.get("/regions", (_, res) => {

    res.send(listRegion);

  });

  //city route
  app.get("/townships", (req, res) => {
    const {
      department = "",
      region = "",
      postalCode,
      township: cityName,
    } = req.query;

    if (typeof postalCode === "string") {
      const code = postalCode.replace(/\s/, "");
      const cityDict = CPDict[code];

      if (!(code in CPDict)) {

        res.status(422).send("Postal code is not valid");
        return;

      }
      if (!cityDict) {

        res.status(404).send("Page not found");
        return;

      }
      const {

        NameOfDep: departmentNameFromDict,
        cityName: townshipNameFromDict,

      } = cityDict;

      for (const regionName in data) {

        for (const NameOfDep in data[regionName]) {

          if (NameOfDep === departmentNameFromDict) {
            if (!(townshipNameFromDict in data[regionName][NameOfDep])) {

              res.status(404).send("Page not found");

            } else {
              const townDTO = generateDTO(
                data[regionName][NameOfDep][townshipNameFromDict],
                townshipNameFromDict
              );

              res.send(townDTO);
            }
            return;
          }
        }

      }
      res.status(404).send("Page not found");
      return;
    }


    if (!(region in data)) {

      res.status(422).send("Region name is not valid");
      return;
    }




    if (!(department in data[region])) {
      res.status(422).send("Department name is not valid");
      return;
    }



    if (typeof cityName !== "string") {
      res.send(Object.keys(data[region][department]).sort());
      return;
    }




    if (!(cityName in data[region][department])) {


      res.status(422).send("City name is not valid");

      return;
    }




    const city = data[region][department][cityName];
    if (city) {

      res.send(generateDTO(city, cityName));

      return;
    } else {

      res.status(404).send("Page not found");
    }
  });



  app.get("*", (_, res) => {
    res.status(404).send("Page not found");
  });
};
