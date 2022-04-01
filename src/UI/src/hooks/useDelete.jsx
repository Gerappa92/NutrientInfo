import { useCallback, useEffect, useState } from "react";
import httpClient from "../modules/axios-client";

export const useDelete = (url, immediate = true) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback((url) => {
    setIsLoading(true);
    return httpClient
      .delete(url)
      .then((response) => {
        setData(response.data);
        setError(null);
      })
      .catch((e) => {
        setError(e);
        throw e;
      })
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    if (immediate) {
      execute(url);
    }
  }, [execute, immediate, url]);

  return [data, isLoading, error, execute];
};
