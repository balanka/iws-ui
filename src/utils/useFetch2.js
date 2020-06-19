import { useState, useEffect } from 'react'
const useFetch2 = (initialUrl, skip = false) => {
    const [url, updateUrl] = useState(initialUrl)
   // const [params, updateParams] = useState(initialParams)
    const [data, setData] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [hasError, setHasError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    //const [refetchIndex, setRefetchIndex] = useState(0)
   // const queryString = Object.keys(params)
   //     .map((key) => encodeURIComponent(key) + '=' +
    //        encodeURIComponent(params[key])).join('&')
   // const refetch = () => setRefetchIndex((prevRefetchIndex) => prevRefetchIndex + 1)
    useEffect(() => {
        const fetchData = async () => {
            if (skip) return
            setIsLoading(true)
            try {
                console.log('fetaching data', url)
                const response = await fetch(`${url}`)
                const result = await response.json()
                if (response.ok) {
                    setData(result)
                    console.log('fetching_result', result)
                } else {
                    setHasError(true)
                    setErrorMessage(result)
                }
            } catch (err) {
                setHasError(true)
                setErrorMessage(err.message)
            } finally {
                setIsLoading(false)
            }
        }
        fetchData()
    }, [url])
    return { data, isLoading, hasError, errorMessage, updateUrl }
}
export default useFetch2
// use it like
// const { data, isLoading, hasError, errorMessage, updateUrl } = useFetch2(url)