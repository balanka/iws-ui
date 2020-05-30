import { useState, useEffect } from "react";
import axios from "axios";
export default function useAsyncMasterfileHook(props) {

        const [query, url] = [props.query, props.url];
        const [result, setResult] = useState([]);
        const [loading, setLoading] = useState("false");
         console.log("query ==>", query);
         console.log("props.query ==>", props.query);
         console.log("props.url ==>", props.url);
         console.log("url ==>", url);
         var l=null;
         var k=null;
           useEffect(() => {
            async function fetchDataList() {
                try {
                    setLoading("true");
                    const url_= url.concat(query);
                    console.log("url_", url_);
                    //const response = await fetch( url_);
                    const response = await axios.get( url_);
                  console.log("response.data", response.data);
                  k=response.data;
                  l="true";
                    setResult( response.data);
                  console.log("result", result);
                } catch (error) {
                    setLoading("null");
                  console.log("error", error)
                }finally {
                  console.log("loading result", loading.concat(result));
                  //setLoading("true");
                  console.log("l k", l)
                  console.log("k", k)
                }
            }
             console.log("search XXXX", query);
            if (query !== "") {
              fetchDataList();
            }
        }, [query, url]);
        //console.log("result", result);
        return [result, loading];
    }
