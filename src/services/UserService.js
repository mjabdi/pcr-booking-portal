import API from './api';

export default class UserService{

    static signUp = (payload) =>
    {
        return API.post('/api/user/signup', payload)
    }

    static preSignUp = (payload) =>
    {
        return API.post('/api/user/presignup', payload)
    }

    static signIn = (payload) =>
    {
        return  API.post('/api/user/signin', payload)
    }

    static forgotPassword = (payload) =>
    {
        return  API.post('/api/user/forgotpassword', payload)
    }

    static resetPassword = (payload) =>
    {
        return  API.post('/api/user/resetpassword', payload)
    }

    static checkToken = (payload) =>
    {
        return  API.post('/api/user/checktoken', payload)
    }

}