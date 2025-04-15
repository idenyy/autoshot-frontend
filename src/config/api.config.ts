export const API_URL = "http://192.168.0.184:4000";

export const getAuthUrl = (string: string) => `/auth${string}`;
export const getUserUrl = (string: string) => `/user${string}`;
export const getProductsUrl = (string: string) => `/products${string}`;
export const getCategoriesUrl = (string: string) => `/categories${string}`;
export const getReviewsUrl = (string: string) => `/reviews${string}`;
export const getOrdersUrl = (string: string) => `/orders${string}`;
export const getSuppliersUrl = (string: string) => `/suppliers${string}`;
export const getStatisticsUrl = (string: string) => `/statistics${string}`;
export const getCartUrl = (string: string) => `/cart${string}`;
