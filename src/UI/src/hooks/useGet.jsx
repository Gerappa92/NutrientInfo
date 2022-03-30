import { useEffect, useState } from "react";
import httpClient from "../modules/axios-client";

export const useGet = (url) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    httpClient
      .get(url)
      .then((response) => setData(response.data))
      .catch((e) => setError(e))
      .finally(() => setIsLoading(false));
  }, [url]);

  return [data, isLoading, error];
};
