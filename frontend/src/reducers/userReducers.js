import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,

    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,

    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,

    LOGOUT_USER_SUCCESS,
    LOGOUT_USER_FAIL,

    
    CLEAR_ERRORS,
  } from "../constants/userContstants";
  
  //  Login or Register 
  export const userReducer = (state = { user: {} }, action) => {
    switch (action.type) {
      case LOGIN_REQUEST:
      case REGISTER_USER_REQUEST:
      case LOAD_USER_REQUEST:
        return {
          loading: true,
          isAuthenticated: false,
        };
      case LOGIN_SUCCESS:
      case REGISTER_USER_SUCCESS:
      case LOAD_USER_SUCCESS:
        return {
          ...state,
          loading: false,
          isAuthenticated: true,
          user: action.payload,
        };
      case LOGOUT_USER_SUCCESS:
        return {
          loading: false,
          user: null,
          isAuthenticated: false,
        };
      case LOGIN_FAIL:
      case REGISTER_USER_FAIL:
        return {
          ...state,
          loading: false,
          isAuthenticated: false,
          user: null,
          error: action.payload,
        };
      case LOAD_USER_FAIL:
        return {
          loading: false,
          isAuthenticated: false,
          user: null,
          error: action.payload,
        };
      case LOGOUT_USER_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
      default:
        return state;
    }
  };
    
  // User Details
  export const userDetailsReducer = (state = { user: {} }, action) => {
    switch (action.type) {
      case USER_DETAILS_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case USER_DETAILS_SUCCESS:
        return {
          ...state,
          loading: false,
          user: action.payload.user,
         
        };
  
      case USER_DETAILS_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
  
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
  
      default:
        return state;
    }
  };
  

