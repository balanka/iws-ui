import { useState, useEffect } from "react";
import axios from "axios";
export default function useAsyncMasterfileHook(query, url, search) {

  //const [query, url] = [props.query, props.url];
   const [loading, setLoading] = useState(false);
  console.log("query ==>", query);
  console.log("url ==>", url);
  const [data, setData] = useState({ hits:[]});
  useEffect(() => {
    setLoading(true);
    console.log('mounted or updated', loading);
    const url_ = url.concat(query);
    console.log("url_", url_);
    axios
      .get(url_)
      .then(response => {
          if (loading) {
            console.log(' response.data.hits', response.data.hits);
            console.log(' response.data', response.data);
            setData(response.data);
            console.log('newsxxxxx', data.hits.length);
          }
        }
      );
    return () => {
      console.log('will unmount');
      setLoading(false);
    }
  }, [loading, setLoading]);
  console.log('returning data', data);
  return [data, loading,search];
  }
