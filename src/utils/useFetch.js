import React, { useState,useMemo } from 'react'
const useFetch = (url, options) => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
  useMemo(() => {
          const fetchData = async () => {
            console.log('Fetching data for ',url);
              setLoading(true);
              setResponse(null);
              setError(null);
              console.log('setLoading',loading);
            try {
                if(!loading){
                    const res = await fetch(url, options);
                    const json = await res.json();
                  console.log('FetchedData',json);
                    setResponse(json);
                    setLoading(false);
                }
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };
        fetchData();
      return () => {
        setLoading(false);
          }
    }, [url]);
    return { response, error };
}
export default useFetch;
