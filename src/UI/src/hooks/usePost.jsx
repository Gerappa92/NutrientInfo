import { useCallback, useEffect, useState } from "react";
import httpClient from "../modules/axios-client";

export const usePost = (url, body, immediate = true) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(
    (body) => {
      setIsLoading(true);
      return httpClient
        .post(url, body)
        .then((response) => {
          setData(response.data);
          setError(null);
        })
        .catch((e) => {
          setError(e);
          throw e;
        })
        .finally(() => setIsLoading(false));
    },
    [url]
  );

  useEffect(() => {
    if (immediate) {
      execute(body);
    }
  }, [body, execute, immediate]);

  return [data, isLoading, error, execute];
};
