import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:5000/api'
})

export const getExhibitionData = async (params) => {
    try {
        const response = await api.post('/exhibition', {
            apiKey: "HE9EP7YE07K5E3AKTRFC2V2LCHZS1ZFF30LAW2BQO4BPX2JH7493FF30CNHVKABT89GJ",
            lang: params.lang,
            exhib_code: params.exhibCode,
            currency: params.currency,
            manager_code: "",
            company_code: "",
            contact_code: "",
            type: "",
            order_code: ""
        })
        return response.data
    } catch (error) {
        console.error('API Error:', error)
        throw error
    }
}