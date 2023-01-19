
import axios from "axios";
import React from "react";

export const baseURL = 'http://127.0.0.1:5000/';

export const createPost = async (route,reqbody) => {
    var res = await axios.post(baseURL+route, {
        body: reqbody
      })
      return res.data
  }

export const createGet = async (route) => {
    var res = await axios.get(baseURL+route)
    return res.data
  }
