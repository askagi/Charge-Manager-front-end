import axios from 'axios';


const viaCepApi = async (cep) => {
    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    if (response.status > 204) {
        return;
    }
    return response;
}

export default viaCepApi;

