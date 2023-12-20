import React, { useEffect, useState } from "react";
import { axiosInstance } from "../api/axios";

const useFetch = () => {
  const [result, setResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const postData = async (url, data) => {
    setIsLoading(true);

    try {
      let response = await axiosInstance.post(url, data);
      // console.log(response);
      setIsError(false);
      setResult(response.data);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsError(true);
      setIsLoading(false);
    }
  };

  const fetchAllData = async (url) => {
    setIsLoading(true);
    try {
      let response = await axiosInstance.get(url);
      console.log(response?.data);
      setIsLoading(false);
      setResult(response?.data);
      setIsError(false);
    } catch (err) {
      setIsError(true);
      setErrMsg("error happened while fetching");
      setIsLoading(false);
    }
  };

  const fetchSingleData = async (url, id) => {
    setIsLoading(true);
    try {
      let response = await axiosInstance.get(`${url}/${id}`);
      // console.log(response);
      setResult(response?.data);
      setIsLoading(false);
      setIsError(false);
    } catch (err) {
      setIsError(true);
      setErrMsg("Error happend while fetching ...");
      setIsLoading(false);
    }
  };

  const updateData = async (url, id, data) => {
    setIsLoading(true);
    try {
      let response = await axiosInstance.patch(`${url}/${id}`, data);
      // console.log(response);
      setResult(response?.data);
      setIsLoading(false);
      setIsError(false);
    } catch (err) {
      setIsError(true);
      setErrMsg("Error happend while fetching ...");
      setIsLoading(true);
    }
  };

  const deleteSingleData = async (url, id) => {
    setIsLoading(true);

    try {
      let response = await axiosInstance.delete(`${url}/${id}`);
      // console.log(response);
      setResult(response?.data);
      setIsLoading(false);
      setIsError(false);
    } catch (err) {
      setIsError(true);
      setErrMsg("Error happend while fetching ...");
      setIsLoading(false);
    }
  };

  const deleteSelectedData = async (url, selectedID) => {
    setIsLoading(true);
    try {
      let response = await axiosInstance.delete(`${url}`, selectedID);
      // console.log(response);
      setResult(response?.data);
      setIsLoading(false);
      setIsError(false);
    } catch (error) {
      setIsError(true);
      setErrMsg("Error happend while fetching ...");
      setIsLoading(false);
    }
  };

  return {
    result,
    isLoading,
    isError,
    fetchSingleData,
    fetchAllData,
    deleteSelectedData,
    deleteSingleData,
    postData,
    updateData,
    setIsLoading,
  };
};

export default useFetch;
