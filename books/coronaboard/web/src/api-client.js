const axios = require('axios');

class ApiClient {
    constructor() {
        const client = axios.create({
            baseURL: process.env.CB_API_BASE_URL || 'http://localhost:8080',
        });

        client.interceptors.response.use((resp) => {
            return resp.data;
        });

        this.client = client;
    }

    async getAllGlobalStats() {
        const response = await this.client.get('global-stats');
        return response.result;
    }

    async getByAgeAndSex() {
        const response = await this.client.get('key-value/byAgeAndSex');
        // byAgeAndSex 값이 직렬화된 JSON 형태로 되어 있기 때문에
        // JSON.parse를 이용하여 객체로 변환
        return JSON.parse(response.result.value);
    }
}

module.exports = ApiClient;