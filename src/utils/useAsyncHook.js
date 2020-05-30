
import React, { useState, useEffect } from "react";
export default function useAsyncHook(url) {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async (url_) => {
      setLoading(true);
      try {
        console.log('About to fetch data for url:',url_);
        const response = await fetch(url_);
        const json = await response.json();
        console.log('ResultAsjson_',json);
        setResult(json);
        setLoading(false);
      } catch (error) {
        console.log('Error while invoking '+url_, error);
        setError(error);
        setLoading(false);
      }
    };
    //if (url!== "") {
      fetchData(url)
   // }
   //}, [url]);
   }, []);
  return [result, loading, error];
}
