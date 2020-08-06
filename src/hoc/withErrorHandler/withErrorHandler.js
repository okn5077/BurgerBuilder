import React, { } from 'react'
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxiliary/Auxiliary';
import useHttpErrorHandler from '../../hooks/http-error-handler';

const withErrorHandler = (WrappedComponent, axios) => {
    return props => {
        const [error, clearError] = useHttpErrorHandler(axios);
        // const [error, setError] = useState(null);

        // const requestInterceptor = axios.interceptors.request.use(req => {
        //     setError(null);
        //     return req;
        // })
        // const responseInterceptor = axios.interceptors.response.use(res => res, err => {
        //     setError(err);
        // })

        // useEffect(() => {
        //     return () => {
        //         axios.interceptors.request.eject(requestInterceptor);
        //         axios.interceptors.response.eject(responseInterceptor);
        //     }
        //     // console.log('will unmount', this.requestInterceptor, this.responseInterceptor)
        // }, [requestInterceptor, responseInterceptor]);

        // const errorConfirmedHandler = () => {
        //     setError(null);
        // }

        return (
            <Aux>
                <Modal show={error} modalClosed={clearError}>
                    {error ? error.message : null}
                </Modal>
                <WrappedComponent {...props} />
            </Aux>
        )
    }
}

export default withErrorHandler;