import {useEffect, useState} from 'react'

export function useGet<A>(ctx:string, token:string, init:A[] ) {
    const [data, setData] = useState<A[]>(init)
    const [isLoading, setIsLoading] = useState(false)
    const [errMessage, setErrMessage] = useState('')
    useEffect(() => {
        setIsLoading(true)
        console.log('calling Fetch>>>>', ctx)
        fetch(ctx, {headers: {method: 'GET', Accept: 'application/json', Authorization: `Bearer ${token}`},
        }).then((response) => response.json())
            .then((_data: A[]) => setData(_data))
               .catch((e:any) => setErrMessage(e.message))
    }, [ctx])
    console.log('data>>>>', data)
    console.log('isLoading>>>>', isLoading)
    console.log('errMessage>>>>', errMessage)
    return [data??[], isLoading, errMessage]
}



/**
 * Fetch example Json data
 * Not recommended for production use!
 */
export const useFetchJson = <T,>(url:string, limit?: number) => {
    const [data, setData] = useState<T[]>();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            // Note error handling is omitted here for brevity
            const response = await fetch(url);
            const json = await response.json();
            const data = limit ? json.slice(0, limit) : json;
            setData(data);
            setLoading(false);
        };
        fetchData();
    }, [url, limit]);
    return { data, loading };
};
