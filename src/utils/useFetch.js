import  {useState,  useEffect, useContext} from 'react'
import axios from "axios";
import {accountContext, useGlobalState} from '../views/base/Components/AccountContext'

const useFetch = (url, data, options) => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [profile, ] = useGlobalState('profile');
    const value = useContext(accountContext);

    useEffect(() => {
          const fetchData =  () => {
              setLoading(true);
              setResponse(null);
              setError(null);
            try {
                //if(!loading){
                    //const res = await fetch(url, options);
                    //const json = await res.json();
                  const json = profile.token==='noTOken'? value.login(url,{}):value.submitGet(url, setResponse)
                  if(json) setResponse(json);
                    setLoading(false);
               // }
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
    return [{ response, loading, error }];
}
export default useFetch;

