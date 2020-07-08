import React, {useState, useMemo, useEffect} from 'react'
import axios from "axios";
import {useGlobalState} from '../views/base/Components/AccountContext'

const useFetch = (url, data, options) => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useGlobalState('token');

    const login = (url, data) => {
        axios.post( url, data)
            .then(response => {
                console.log('responsex', response.data);
                const {authorization} =  response.headers
                const tken = response.data.hash
                setToken(authorization)
                console.log('tken', tken)
                console.log('authorization', authorization);
                return authorization
            }).catch(function (error) {
            console.log('error', error);
        });
    }

    const submitGet = (url) => {
        console.log('authorization2', token);
        axios.get( url, {headers: {'authorization':token}})
            .then(response => {
                console.log('response.data', response.data);
                console.log('response.headers', response.headers);
                const resp = response.data
                return resp;
            }).catch(function (error) {
            console.log('error', error);
        });
    }

    useEffect(() => {
          const fetchData = async () => {
            console.log('Fetching data for ',url);
              setLoading(true);
              setResponse(null);
              setError(null);
              console.log('setLoading',loading);
              console.log('options', options)
            try {
                if(!loading){
                    //const res = await fetch(url, options);
                    //const json = await res.json();
                    const json = data? login(url,data):submitGet(url)
                  console.log('FetchedData',json);
                    setResponse(json);
                    setLoading(false);
                }
            } catch (error) {
                console.log('errorX',error);
                setError(error);
                setLoading(false);
            }
        };
        fetchData();
      return () => {
        setLoading(false);
          }
    }, [url]);
    return [{ response, loading, error }, setToken];
}
export default useFetch;

