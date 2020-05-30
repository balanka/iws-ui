import React, { useState, useEffect } from "react";
export default function AsyncHook(url) {
        const [result, setResult] = useState([]);
        const [loading, setLoading] = useState("true");

           useEffect(() => {
            async function fetchData(url_) {
                try {
                    setLoading("true");
                    console.log('About to fetch data for url:',url_);
                    const response = await fetch(url_);
                    const json = await response.json();
                     console.log('ResultAsjson_',json);
                    setResult(json);
                } catch (error) {
                   console.log('Error while invoking _',url_);
                    setLoading("null");
                }
            }
            if (url!== "") {
              fetchData(url);
            }
        }, [url]);
        return [result, loading];
    }
