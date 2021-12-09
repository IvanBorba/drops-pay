import axios from 'axios'

export const apiWS = axios.create({
  baseURL: 'https://jchek15fr0.execute-api.us-east-2.amazonaws.com',
})

export const apiCep = axios.create({
  baseURL: 'https://api.postmon.com.br/v1/cep/',
})

export const apiCnpj = axios.create({
  baseURL:
    'https://cors-anywhere-ivan.herokuapp.com/http://www.receitaws.com.br/v1/cnpj/',
})
