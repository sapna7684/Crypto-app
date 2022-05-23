import React, { useEffect, useState } from 'react'
import { Card, Col, Input, Row } from 'antd'
import { Link } from 'react-router-dom'
import millify from 'millify'
import { useGetCryptosQuery } from '../services/cryptoApi'
import { Loader } from '../components/Loader'

export const CryptoCurrencies = ({simplified}) => {
  const count = simplified ? 10 : 100
  const {data: cryptosList, isFetching} = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    
    const filteredData = cryptosList?.data?.coins.filter((coin) => coin.name.toLowerCase().includes(searchTerm.toLowerCase()));
    setCryptos(filteredData);

  },[cryptosList, searchTerm])

  if(isFetching) return <Loader/>;
  return (
    <>
    {!simplified && (
      <div className='search-crypto'>
        <label style={{display:'block', marginBottom:'15px'}}>Search Crypto Currency</label>
        <Input placeholder='Search Cryptocurrency' onChange={(e) => setSearchTerm(e.target.value)} />
      </div>
    )}
    <Row gutter={[16,16]} className="crypto-card-container">
      {cryptos?.map((currency) => (
        <Col xs={24} sm={12} lg={6} className="crypto-card" key={currency.uuid}>
        <Link to={`/crypto/${currency.uuid}`}>
          <Card title={`${currency.rank}.${currency.name}`} extra={<img src={currency.iconUrl}  className='crypto-image'  alt="Currency" />} hoverable>
            <p>Price: {millify(currency.price)}</p>
            <p>Market Cap: {millify(currency.marketCap)}</p>
            <p>Daily Change: {millify(currency.change)}%</p>
          </Card>
        </Link>
      </Col>
      ))}
    </Row>
    </>
  )
}
