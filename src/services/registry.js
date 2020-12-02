import axios from 'axios';

export default class RegistryService {

    constructor(url, portalUrl, token) {
        this.url = url
        this.portalUrl = portalUrl
        this.token = token
    }

    getPortalUrl() {
        return this.portalUrl
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
        const {data} = await this.http.get('/api/me/');
        return data;
    }

    async getUserRecords(page, size) {
        const {data} = await this.http.get('/api/resources/records/', {
            params: {
                page: page, size: size
            }
        })
        return data;
    }

    async getIdentifierByValue(value) {
        const {data} = await this.http.get('/api/resources/identifiers', {
            params: {
                value
            }
        })
        return data;
    }

    async getIGSNRecordByValue(value) {
        const {data} = await this.http.get('/api/resources/igsn-records', {
            params: {
                igsn: value
            }
        })

        return data;
    }

    async getVersions(record, schema) {
        const {data} = await this.http.get(`/api/resources/records/${record}/versions/`, {
            params: {schema}
        })
        return data
    }

    async getVersionContent(versionID) {
        const {data} = await this.http.get(`/api/resources/versions/${versionID}/content/`)

        return data
    }

    async getContentByIdentifierValue(identifierValue) {
        let idResult = await this.getIdentifierByValue(identifierValue)
        let recordID = idResult.content[0].record
        let identifierID = idResult.content[0].id

        let verResult = await this.getVersions(recordID, "ardc-igsn-desc-1.0")
        let versionID = verResult.content[0].id

        let versionContent = await this.getVersionContent(versionID)

        return {
            recordID, identifierID, versionID, versionContent
        }
    }

    async getUserIGSNRecords(page, size, title) {
        let params = {
            page: page,
            size: size
        }
        if (title) {
            params.title = title
        }
        const {data} = await this.http.get('/api/resources/igsn-records/', {
            params
        })
        return data;
    }

    async generateIGSNIdentifier(allocationID) {
        let params = {}
        if (allocationID) {
            params.allocationID = allocationID
        }
        const {data} = await this.http.get('/api/services/igsn/generate-igsn', {params});

        return data;
    }

    async mint(xml, ownerType, ownerID) {
        const {data} = await this.http.post('/api/services/igsn/mint', xml, {
            headers: {
                'Content-Type' : 'application/xml'
            },
            params: {
                'ownerID': ownerID,
                'ownerType': ownerType
            }
        });

        return data;
    }

    async update(xml) {
        const {data} = await this.http.post('/api/services/igsn/update', xml, {
            headers: {
                'Content-Type' : 'application/xml'
            }
        });

        return data;
    }


}