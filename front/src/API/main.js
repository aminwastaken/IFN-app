import { HOST } from './contants';

const checkError = (res) => {
  if (res.status !== 200) {
    throw new Error(res);
    console.log(res);
  }
  return res;
}

export const getRegions = () => {
  const url = `${HOST}/regions`;
  return fetch(url)
    .then(checkError)
    .then((res) => res.json());
};

export const getDepartments = ( region = '') => {
  const params = new URLSearchParams({ region });
  const url = `${HOST}/departments?${params}`;
  return fetch(url)
    .then(checkError)
    .then((res) => res.json());
};

export const getTownships = (region = '', department = '') => {
  const querys = new URLSearchParams({ region, department });
  const url = `${HOST}/townships?${querys}`;
  return fetch(url)
    .then(checkError)
    .then((res) => res.json());
};

export const getTownshipByFullAddress = (region = '', department = '', township = '') => {
  const querys = new URLSearchParams({ region, department, township });
  const url = `${HOST}/townships?${querys}`;
  return fetch(url)
    .then(checkError)
    .then((res) => res.json());
};

export const getTownshipByPostalCode = (postalCode = '') => {
  const querys = new URLSearchParams({ postalCode });
  const url = `${HOST}/townships?${querys}`;
  return fetch(url)
    .then(checkError)
    .then((res) => res.json());
};
