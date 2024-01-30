'use client'
import { useState, useEffect } from "react";
import { fetchData } from "./helpers";
import { useContext } from "react";
import { AlertContext } from "@/lib/contexts";
import { ResponseData, ErrorData } from "./types";

export const useAlert = () => useContext(AlertContext);

export const useQuery = (
  endpoint: string,
  method: string,
  successCallback?: (res: ResponseData) => void,
  errorCallback?: (error: ErrorData) => void
) => {
  const [data, setData] = useState<ResponseData>();
  const [error, setError] = useState<string | null>();
  const [loading, setLoading] = useState(false);

  const handleError = (error: string) => {
    setError(JSON.parse(error));
    setLoading(false);
    errorCallback && errorCallback(JSON.parse(error));
  };

  const handleSuccess = (res: ResponseData) => {
    setError(null);
    setData(res);
    setLoading(false);
    successCallback && successCallback(res);
  };

  const runQuery = (values?: { [key: string]: string }) => {
    setLoading(true);
    setError(null);
    fetchData(endpoint, {
      method,
      body: values && JSON.stringify(values),
    })
      .then(handleSuccess)
      .catch(handleError);
  };

  useEffect(() => {
    if (method === "GET") {
      runQuery();
    }
  }, [method]);

  return { data, loading, error, refetch: runQuery };
};
