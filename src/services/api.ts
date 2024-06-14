/**
 * file: src/services/Api.js
 * data: 11/03/2021
 * description: arquivo responsável por inicializar o 'axios' e
 *  as requisições da url base dos HTTP's
 * author: Glaucia Lemos <twitter: @glaucia_lemos86>
 */

import axios from 'axios';


const axiosInstance = axios.create({
  baseURL:  'http://localhost:3333',
  headers: {
    'Content-type': 'application/json'
  }
});

export default axiosInstance;

