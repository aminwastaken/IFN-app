module.exports = (township, townshipName = "") => {
  const desiredKeys = [
    "ACCES A L'INFORMATION",
    "ACCÈS AUX INTERFACES NUMERIQUES",
    "COMPETENCES ADMINISTATIVES",
    "COMPÉTENCES NUMÉRIQUES / SCOLAIRES",
    "department_score",
    "Population",
    "region_score",
    "township_score",
  ];
  const townshipDTO = {
    townshipName,
  };

  for (const key of desiredKeys) {
    let value;

    if (typeof township[key] === "string") {
      value = parseInt(township[key].replace(/\r/, ""), 10);
    } else {
      value = parseInt(township[key], 10);
    }

    townshipDTO[key] = value;
  }
  return townshipDTO;
};
