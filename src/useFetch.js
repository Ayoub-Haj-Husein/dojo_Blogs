import {useState, useEffect} from 'react'
const useFetch = (url) => {
    const [data, setData] = useState(null)
    const [isPending, setIsPending] = useState(true)
    const [error, setError] = useState(null)
    useEffect(() => {
        const abortCoun = new AbortController()
        setTimeout(() => {
            fetch(url, {signal: abortCoun.signal})
            .then(res => {
                if(!res.ok) {
                    throw Error('could not fetch the data for that resource')
                }
                return res.json()
            }).then(data => {
                setData(data)
                setIsPending(false)
                setError(null)
            }).catch((error) => {
                if(error.name === 'AbortError') {
                    console.log('fetch aborted');
                } else {
                    setError(error.message)
                    setIsPending(false)
                }
            })
        }, 1000)
        return () => abortCoun.abort()
    },[url])
    return {data, isPending, error}
}

export default useFetch


