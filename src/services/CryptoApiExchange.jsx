import { createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const baseUrl = 'https://api.coingecko.com/api/v3';

const createRequest = (url) => (url);

export const cryptoApiExchange = createApi({
    reducerPath:'cryptoApiExchange',
    baseQuery:fetchBaseQuery({baseUrl}),
    endpoints:(builder) => ({
        getCryptosExchnage:builder.query({
            query: () => createRequest(`/exchanges`)
        })
    })
});

export const {useGetCryptosExchnageQuery} = cryptoApiExchange;