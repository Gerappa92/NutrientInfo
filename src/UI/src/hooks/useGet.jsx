import { useCallback, useEffect, useState } from "react";
import httpClient from "../modules/axios-client";

export const useGet = (url, immediate = true) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(() => {
    setIsLoading(true);
    return httpClient
      .get(url)
      .then((response) => {
        setData(response.data);
        setError(null);
      })
      .catch((e) => {
        setError(e);
        throw e;
      })
      .finally(() => setIsLoading(false));
  }, [url]);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return [data, isLoading, error, execute];
};
