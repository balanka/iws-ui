import  {useState,  useEffect, useContext} from 'react'
import axios from "axios";
import {accountContext, useGlobalState} from '../views/base/Components/AccountContext'

const useFetch = (url, data, options) => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [profile, setProfile] = useGlobalState('profile');
    const value = useContext(accountContext);
    console.log('urlX', url);

    const submitGet = (url) => {
        console.log('authorization2', profile.token);
        axios.get( url, {headers: {'authorization':profile.token}})
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
                //if(!loading){
                    //const res = await fetch(url, options);
                    //const json = await res.json();
                    const json = profile.token==='noTOken'? value.login(url,{}):value.submitGet(url, setResponse)
                  console.log('FetchedDataX',json);
                  console.log('response',response);
                  if(json) setResponse(json);
                    setLoading(false);
               // }
            } catch (error) {
                console.log('errorX',error);
                console.log('profile.token',profile.token);
                setError(error);
                setLoading(false);
            }
        };
        fetchData();
      return () => {
        setLoading(false);
          }
    }, [url]);
    return [{ response, loading, error }];
}
export default useFetch;

