import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

describe('auth reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefine, {})).toEqual({

            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: '/'

        });
    });

    it('should store the token upon login', () => {
        expect(reducer({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: '/'
        },
            {
                type: actionTypes.AUTH_SUCCESS,
                idToken: 'sometoken',
                userId: 'someId'
            })).toEqual({
                token: 'sometoken',
                userId: 'someId',
                error: null,
                loading: false,
                authRedirectPath: '/'
    
            })
    })
});