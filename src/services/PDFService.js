import API from './api';

export default class PDFService {


    static downloadPdfResult = (id) =>
    {
       return API.get(`/api/pdf/downloadpdfresult?id=${id}`, {
        responseType: 'arraybuffer',
        headers: {
            Accept: 'application/pdf',
        }
        });
    }

    static downloadPdfCert = (id) =>
    {
       return API.get(`/api/pdf/downloadpdfcert?id=${id}`, {
        responseType: 'arraybuffer',
        headers: {
            Accept: 'application/pdf',
        }
        });
    }

}