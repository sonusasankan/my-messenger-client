export const baseURL = process.env.NODE_ENV === 'development'
  ? process.env.REACT_APP_API_BASE_URL_LOCAL
  : process.env.REACT_APP_API_BASE_URL_PROD;