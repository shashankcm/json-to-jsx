import * as types from "../constants/actionTypes";
import axios from "axios";

/* export function savePersonalInformation(data) {
  var url = "http://localhost:3002/piData/";
  const request = axios.post(url, data);
  return dispatch => {
    function onSuccess(suc) {
      dispatch({ type: types.SAVE_PERSONAL_INFORMATION, payload: suc });
      return suc;
    }
    return request.then(success => onSuccess);
  };
} */
var url = "http://localhost:3002/piData";
export const savePersonalInformation = postData => {
  return dispatch => {
    return axios
      .post(url, postData)
      .then(res => {
        console.log(res.status);
        dispatch({
          type: types.SAVE_PERSONAL_INFORMATION,
          payload: res.status
        });
      })
      .catch(error => {
        throw error;
      });
  };
};
