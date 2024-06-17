import axios from "axios"
import { API_RESPONSE_CODES, API_REQ_TYPE, ROUTES } from "../utils/constants"
import { APIS } from "../utils/apiList"
import { isObject, removeLocalStorageItem, setLocalStorageItem, clearLocalStorage } from "../utils/utils"
import { NOTIFICATIONS } from "../utils/messages";
import {apiResponseObject} from '../utils/apiRequestData'

const customAxios = axios.create({
  withCredentials: false,
  // Add other Axios configuration options here if needed
});


const basePath = APIS.BASEURL;  //process?.env?.REACT_APP_BASE_API_URL
// authBasePath is for authentication purpose only
const authBasePath = APIS.BASEURL; //process?.env?.REACT_APP_AUTH_API_URL
const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, GET, OPTIONS, PUT, HEAD, DELETE",
}

const logoutUser = () => {
  clearLocalStorage()
  window.location.reload()
}

const handleErrorResponse = async (err, req) => {
  if (err.response) {
    const errorText = err.response.data ? (err.response.data.error_description ? err.response.data.error_description : err.response.data.message) : err.response.statusText
    if (errorText === NOTIFICATIONS.REFRESH_TOKEN_EXPIRED_2) {
      logoutUser()
    } else if (err?.response?.status === API_RESPONSE_CODES.NOT_FOUND) {
      window.location.href = ROUTES.NOT_FOUND
    }  else {
      if (errorText === NOTIFICATIONS.REFRESH_TOKEN_EXPIRED || errorText === NOTIFICATIONS.REFRESH_TOKEN_EXPIRED_2) {
        logoutUser()
      }
      return errorText
    }
  } else {
    return err
  }
}

const handleSuccessResponse = (res) => {
  const { SUCCESS, SUCCESS_CREATE, SUCCESS_NO_CONTENT } = API_RESPONSE_CODES
  if (res.status === SUCCESS) {
    return res.data
  } else if ([SUCCESS_CREATE, SUCCESS_NO_CONTENT].includes(res.status)) {
    return res
  }
  return {}
}

const handleAPIResponse = (res) => {
  const { SUCCESS, SUCCESS_CREATE, SUCCESS_NO_CONTENT,INTERNALSERVERERROR,BATREQUEST } = API_RESPONSE_CODES
  if(res && res.statusCode)
    {
        if(res.statusCode == SUCCESS)
          {

          }
    }
    else
    {

    }

}

const handleSuccessRes = (res) => {
  const { SUCCESS, SUCCESS_CREATE, SUCCESS_NO_CONTENT } = API_RESPONSE_CODES
  if (res.status === SUCCESS) {
    return res;
  } else if ([SUCCESS_CREATE, SUCCESS_NO_CONTENT].includes(res.status)) {
    return res
  }
  return {}
}

export const getData = (url) => {
  //headers.Authorization = localStorage.getItem(TOKEN_KEY)
  return customAxios
    .get(`${basePath}${url}`, { headers: headers })
    .then((res) => res)
    .catch((err) => null)
}

export const postData = (url, body, isBaseURL = false) => {
  //headers.Authorization = localStorage.getItem(TOKEN_KEY)
  return customAxios
    .post(`${isBaseURL ? authBasePath : basePath}${url}`, body,{ headers: headers })
    .then((res) => res)
    .catch((err) => null) // handleErrorResponse(err), { type: API_REQ_TYPE.POST, url, body, isBaseURL })
}

export const postDataAPI = (url, body, isBaseURL = false) => {
  //headers.Authorization = localStorage.getItem(TOKEN_KEY)
  return customAxios
    .post(`${isBaseURL ? authBasePath : basePath}${url}`, body,{ headers: headers })
    .then((res) => handleSuccessRes(res))
    .catch((err) => handleErrorResponse(err), { type: API_REQ_TYPE.POST, url, body, isBaseURL })
}

export const testmethod = (url,body) => {
  return axios.post(`${basePath}${url}`, body); // Use Axios for POST request
  
}

export const patchData = (url, body) => {
 // headers.Authorization = localStorage.getItem(TOKEN_KEY)
  return axios
    .patch(`${basePath}${url}`, body, { headers: headers })
    .then((res) => handleSuccessResponse(res))
    .catch((err) => handleErrorResponse(err, { type: API_REQ_TYPE.PATCH, url, body }))
}

export const putData = (url, body) => {
 // headers.Authorization = localStorage.getItem(TOKEN_KEY)
  return axios
    .put(`${basePath}${url}`, body, { headers: headers })
    .then((res) => handleSuccessResponse(res))
    .catch((err) => handleErrorResponse(err, { type: API_REQ_TYPE.PUT, url, body }))
}

export const deleteData = (url) => {
  //headers.Authorization = localStorage.getItem(TOKEN_KEY)
  return axios
    .delete(`${basePath}${url}`, { headers: headers })
    .then((res) => handleSuccessResponse(res))
    .catch((err) => handleErrorResponse(err, { type: API_REQ_TYPE.DELETE, url }))
}

