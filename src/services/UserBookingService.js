import API from './api';

export default class UserBookingService{

    static setToken = (token) =>
    {
        this.token = token
    }

    static getAllPCRUserBookings = () =>
    {
        return API.post('/api/userbookings/getallpcrbookings', {token: this.token})
    }

    static getMostRecentBookingId = () =>
    {
        return API.post('/api/userbookings/getmostrecentbookingid', {token: this.token})
    }


    

}