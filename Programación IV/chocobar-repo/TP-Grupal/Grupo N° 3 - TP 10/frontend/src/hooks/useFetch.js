import { useState, useEffect } from "react";

export function useFetch(fetchFunction, deps = []) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const cargar = async () => {
    setLoading(true);
    try {
      const result = await fetchFunction();
      setData(result);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargar();
  }, deps);

  return { data, loading, error, reload: cargar };
}
