import axios from 'axios';

export default axios.create({
    baseURL: 'https://desafio-modulo05.herokuapp.com',
    timeout: 100000,
    headers: { 'Content-Type': 'application/json' }
});