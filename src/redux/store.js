import { configureStore } from "@reduxjs/toolkit";
import { cryptoApi } from "../services/cryptoApi";
import { cryptoApiExchange } from "../services/CryptoApiExchange";
import { cryptoNewsApi } from "../services/cryptoNewsApi";
export default configureStore({
    reducer:{
        [cryptoApi.reducerPath]:cryptoApi.reducer,
        [cryptoNewsApi.reducerPath]:cryptoNewsApi.reducer,
        [cryptoApiExchange.reducerPath]:cryptoApiExchange.reducer,
    },
});