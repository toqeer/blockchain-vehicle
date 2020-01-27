import { isArray } from "util";
import axios from "axios";
import jwt from "jsonwebtoken";

export const isEmpty = data => {
  if (data === null || data === "undefind" || data === "" || data === "{}") {
    return true;
  }

  if (isArray(data)) {
    if (data.length === 0) {
      return true;
    }
  }
  return false;
};

export const compareArray = (arr1, arr2) => {
  if (!arr1 || !arr2) return;

  let result;

  arr1.forEach((e1, i) =>
    arr2.forEach(e2 => {
      if (e1.length > 1 && e2.length) {
        result = this.compareArray(e1, e2);
      } else if (e1 !== e2) {
        result = false;
      } else {
        result = true;
      }
    })
  );

  return result;
};

export const setAuthToken = token => {
  if (token) {
    // Apply to every request
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  } else {
    // Delete auth header
    delete axios.defaults.headers.common["Authorization"];
  }
};

export const decodeToken = token => {
  if (token) {
    var decoded = jwt.decode(token);
    return decoded;
  }
};
