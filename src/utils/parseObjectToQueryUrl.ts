/* eslint-disable @typescript-eslint/no-explicit-any */
const parseObjectToQueryUrl = (query: any) => {
  return Object.keys(query)
    .filter((key) => {
      if (Array.isArray(query[key]) && query[key].length > 0) {
        return true;
      }
      if (!Array.isArray(query[key]) && query[key] !== "") {
        return true;
      } else {
        return false;
      }
    })
    .map((key) => {
      if (Array.isArray(query[key]) && query[key].length > 0) {
        return query[key].map((value) => `${key}=${value}`).join("&");
      } else {
        return `${key}=${query[key]}`;
      }
    })
    .join("&");
};
  
export default parseObjectToQueryUrl;
  