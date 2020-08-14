import axios from 'axios';

export default class RegistryService {

    constructor(url, token) {
        this.url = url
        this.token = token
    }

    setToken(token) {
        this.token = token;
        this.createHttpClient()
    }

    createHttpClient() {
        this.http = axios.create({
            baseURL: this.url,
            headers: {
                'Authorization': `Bearer ${this.token}`
            }
        })
    }

    async getUserInfo() {
        const { data } = await this.http.get('/api/me/');
        return data;
    }

    async getUserRecords(page, size) {
        const { data } = await this.http.get('/api/resources/records/', {
            params: {
                page: page, size: size
            }
        })
        return data;
    }

    async getUserIGSNRecords(page, size, title) {
        let params = {
            page: page, 
            size: size, 
            include: "igsn"
        }

        if (title) {
            params.title = title
        }
        
        const { data } = await this.http.get('/api/resources/records/', {
            params
        })
        return data;
    }


}