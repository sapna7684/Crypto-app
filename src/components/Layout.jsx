import React from 'react'
import {Routes , Route} from 'react-router-dom'
import '../App.css'
import { Navbar, HomePage, Exchange,CryptoCurrencies, CryptoDetails,News,Footer } from './Index'

export const Layout = () => {
  return (
    <>
    <div className="app">
        <Navbar/>
        <div className="main">
            <Routes>
                <Route exact path="/" element={<HomePage/>}/>
                <Route exact path="/exchanges" element={<Exchange/>}/>
                <Route exact path="/cryptocurrencies" element={<CryptoCurrencies/>}/>
                <Route exact path="/crypto/:coinId" element={<CryptoDetails/>}/>
                <Route exact path="/news" element={<News/>}/>
            </Routes>
            <Footer/>
        </div>
    </div>
    </>
  )
}
