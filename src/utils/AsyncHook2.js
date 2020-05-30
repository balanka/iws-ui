import React, { useState, useEffect } from "react";
export default function AsyncHook2(url, accUrl, loading, loadingAcc) {
  const [result, setResult] = useState([]);
  const [ data, setData] = useState({ hits:[]});
  const [ accData, setAccData] = useState({ hits:[]});
  // const [loading, setLoading] = useState("true");
  // const [loadingAcc, setLoadingAcc] = useState("true");

  async function fetchFn(url, setDaten){
    const response = await fetch(url);
    const json = await response.json();
    console.log('ResultAsjson_', json);
    setDaten(json);
  }

  try {
    //setLoading("true");
    console.log('About to fetch data for url:',url);
    if(loading) {
      fetchFn(url.concat(get), setData);
      //  setLoading("false");
    }
    // setLoadingAcc("true");
    console.log('About to fetch data for accUrl:',accUrl );
    if(loadingAcc) {
      fetchFn(accUrl, setAccData);
      //   setLoadingAcc("false");
    }
  } catch (error) {
    console.log('Error while invoking ',url);
    // setLoading("null");
    // setLoadingAcc("null");
  };
  return [{ data:data, accData:accData}];
};



