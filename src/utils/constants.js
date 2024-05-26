export const COLORS = {
    backgroundcolor: "#DFE2F1",
    accent: "#F4564E",
    HeadingLight:'#DFE2F1',
    HeadingHeighlight:'#084C81',
    TextColorNavBar:'#6B94B3',
    TextColorPlaceholder:'#6A6A6A',
    TextColorMainText:'#545454',
    BlackColor:'#000000',
    
  }

  export const borderStyles = {
    searchBoxBorder:'2px solid'+COLORS.TextColorNavBar,
  }

  export const LocalStorageKey = {
       userId: "userid",
       token: "token",
       createdByUserId: "created_By_User_UID"
  }

  export const API_RESPONSE_CODES = {
    SUCCESS: 200,
    SUCCESS_CREATE: 201,
    SUCCESS_NO_CONTENT: 204,
    UNAUTHORISED: 401,
    NOT_FOUND: 404,
    BATREQUEST: 400,
    INTERNALSERVERERROR:500
  }

  export const PATTERN = {
   // NUM: /^\d+$/,
   // EMAIL: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
  }

  export const REGX_TYPE = {
    NUM: 'NUM'
  }

  export const API_REQ_TYPE = {
    GET: "get",
    POST: "post",
    PATCH: "patch",
    PUT: "put",
    DELETE: "delete",
  }

  export const ROUTES = {
    LOGIN: "/",
    AUTH: "/auth",
    FORGOT_PASSWORD: "/forgotPassword",
    HOME: "/home",
    RESET_PASSWORD: "/resetPassword",   
  }
  