import { useState, useEffect } from "react";
import axios from "axios"
export default function AsyncHook(props) {
        const [query, url] = [props.query, props.url];
        const [result, setResult] = useState([]);
        const [loading, setLoading] = useState("false");
         console.log("query ==>", query);
         console.log("props.query ==>", props.query);
         console.log("props.url ==>", props.url);
         console.log("url ==>", url);
           useEffect(() => {
            async function fetchBookList() {
                try {
                    setLoading("true");

                    const url_= url.concat(query);
                    console.log("searchBook ==>", query);
                     console.log("searchBook ==>", {query});
                    console.log("url_ ==>", url_);
                    //const response = await axios.get( url_);
                    const response = await fetch( url_);
                    //const response = await fetch( url_
                     // `https://www.googleapis.com/books/v1/volumes?q=${searchBook}`

                   // );

                    const json = await response.json();
                    // console.log(json);
                    setResult(
                        json.items.map(item => {
                           // console.log(item.volumeInfo.title);
                            return item.volumeInfo.title;
                        })
                    );
                } catch (error) {
                    setLoading("null");
                }
            }
             console.log("search XXXX", query);
           // if (search !== "") {
                fetchBookList();
            //}
        }, [query, url]);

        return [result, loading];
    }
