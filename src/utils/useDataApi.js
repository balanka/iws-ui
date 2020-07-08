import React, {useState, useEffect } from 'react';
import axios from 'axios';

const useDataApi = (initialUrl, initialData) => {
    const [data, setData] = useState(initialData);
    const [url, setUrl] = useState(initialUrl);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsError(false);
            setIsLoading(true);
      console.log("data",data)
            try {
                const result = await axios(url);
                console.log("result",result)
                setData(result.data);
            } catch (error) {
                console.log("errorZ",error)
                setIsError(true);
            }

            setIsLoading(false);
        };

        fetchData();
    }, [url]);

    return [{ data, isLoading, isError }, setUrl];
};
export default useDataApi