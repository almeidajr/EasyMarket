import axios from 'axios'

export const httpClient = axios.create({
  baseURL: process.env.REACT_APP_EM_API,
})

export const scraperClient = axios.create({
  baseURL: process.env.REACT_APP_EM_SCRAPER,
})
