// Here maintain commonly used methods
import { REGX_TYPE,PATTERN} from "./constants"




export const isObject = (val) => {
  return val && val instanceof Object
}
export const setLocalStorageItem = (key, val) => {
  localStorage.setItem(key, val)
}
export const removeLocalStorageItem = (key) => {
  localStorage.removeItem(key)
}

export const clearLocalStorage = () => {
  localStorage.clear();
  /*if (localStorage.getItem(IS_REMEMBER_ME) === 'true') {
    const username = localStorage.getItem(USERNAME)
    localStorage.clear();
    setLocalStorageItem(IS_REMEMBER_ME, true)
    setLocalStorageItem(USERNAME, username)
  } else {
    localStorage.clear();
  }*/
}

export const clearToken = () => {
  localStorage.clear();
}

export const sortArrayOnNumericKey = (list, key) => {
  return list.sort(function (a, b) {
    return a[key] - b[key]
  })
}

export function isLocalStorageValueExists(key)
{
    let value = localStorage.getItem(key);
    if(!value || value == "" || value == undefined)
      {
        return false;
      }
      return true;
}

export function isArray(arrayElement) {
  return arrayElement && Array.isArray(arrayElement) && arrayElement.length > 0
}
export const isNum = (str) => !PATTERN.NUM.test(str)
export const isEmail = (str) => !PATTERN.EMAIL.test(str)
//export const isObjectEmpty = (obj) => !obj || Object.keys(obj).length === 0 && obj.constructor === Object

/*export const isValidEmail = (value) => {
  return /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,5}$/.test(value)
}*/

export const getClonedObj = obj => JSON.parse(JSON.stringify(obj))
export const copyTextToClipboard = (text) => navigator.clipboard.writeText(text)


export const isValidStr = (str, type) => {
  const { NUM } = REGX_TYPE
  switch (type) {
    case NUM: return /^\d+$/.test(str);
    default: return false
  }
}
export const ScrollToTop = () => window.scrollTo(0, 0);

export const isString = obj => typeof (obj) === 'string'

export const scrollToBottom = (className) => {
  let messageBody = document.querySelector(className);
  messageBody.scrollTop = messageBody.scrollHeight - messageBody.clientHeight;
}

export const isEmptyObject = (obj) => {
  for (const key in obj) {
    if (obj[key] !== null && obj[key] !== undefined && obj[key] !== '') {
      return false;
    }
  }
  return true;
};