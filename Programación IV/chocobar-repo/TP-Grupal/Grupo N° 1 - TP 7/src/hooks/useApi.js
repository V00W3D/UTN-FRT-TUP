import { useState, useCallback } from 'react';

export default function useApi(asyncFn) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const run = useCallback(async (...args) => {
    setLoading(true);
    setError(null);
    try {
      const result = await asyncFn(...args);
      setLoading(false);
      return result;
    } catch (e) {
      setError(e);
      setLoading(false);
      throw e;
    }
  }, [asyncFn]);

  return { run, loading, error };
}
