import { useState, useEffect } from 'react'

export default httpClient => {
    const [error, setError] = useState(null);

    const requestInterceptor = httpClient.interceptors.request.use(req => {
        setError(null);
        return req;
    })
    const responseInterceptor = httpClient.interceptors.response.use(res => res, err => {
        setError(err);
    })

    useEffect(() => {
        return () => {
            httpClient.interceptors.request.eject(requestInterceptor);
            httpClient.interceptors.response.eject(responseInterceptor);
        }
        // console.log('will unmount', this.requestInterceptor, this.responseInterceptor)
    }, [httpClient, requestInterceptor, responseInterceptor]);

    const errorConfirmedHandler = () => {
        setError(null);
    }

    return [error, errorConfirmedHandler]
}