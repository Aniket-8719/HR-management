import axios from "axios";
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

} from "../constants/userContstants.js";
import { CLEAR_ERRORS } from "../constants/userContstants";


const API_URL = import.meta.env.VITE_BACKEND_URL;


// Login
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const config = { 
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    const { data } = await axios.post(
      `${API_URL}/auth/login`,
      { email, password },
      config
    );
    localStorage.setItem("token", data.token);
    dispatch({ type: LOGIN_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
  }
};

//  Register
export const register = (userData) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_USER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "multipart/form-data", // Important for file upload
      },
      withCredentials: true, // Include cookies for authentication
    };
    
    const { data } = await axios.post(
      `${API_URL}/auth/register`, // Replace with your API endpoint
      userData,
      config
    );  
    localStorage.setItem("token", data.token); 
    dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({
      type: REGISTER_USER_FAIL,
      payload: error.response?.data?.message || "Server Error",
    });
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      return dispatch({ type: "LOAD_USER_FAIL" });
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get("/api/me", config); // adjust your route
    dispatch({
      type: "LOAD_USER_SUCCESS",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "LOAD_USER_FAIL",
      payload: error.response.data.message,
    });
  }
};


// Logout User
export const logout = () => async (dispatch) => {
  try {
    localStorage.removeItem("token");
    await axios.get(`${API_URL}/auth/logout`, {
      withCredentials: true, // Include this option to send cookies with the request
    });

    dispatch({ type: LOGOUT_USER_SUCCESS });
  } catch (error) {
    dispatch({ type: LOGOUT_USER_FAIL, payload: error.response.data.message });
  }
};

// clear errors
export const clearError = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
