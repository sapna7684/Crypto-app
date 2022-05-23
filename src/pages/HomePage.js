import { Typography, Row,Col,Statistic,Card } from 'antd';
import React from 'react'
import { Link } from 'react-router-dom';
import { useGetCryptosQuery } from '../services/cryptoApi';
import { CryptoCurrencies } from './CryptoCurrencies';
import { News } from './News';
import millify from 'millify'
import { Loader } from '../components/Loader';
const {Title} = Typography;

export const HomePage = () => {
  const {data, isFetching} = useGetCryptosQuery(10);
  const globalStats = data?.data?.stats; 
  if(isFetching) return <Loader/>;
  return (
    <>
    <Title level={2} className="home-title">Global Crypto Stats</Title>
    <Row gutter={[16,16]}>
      <Col xs={24} sm={12} lg={12} xl={6}><Card hoverable><Statistic title="Total CryptoCurrencies" value={globalStats.total} className="stats-card"/></Card></Col>
      <Col xs={24} sm={12} lg={12} xl={6}><Card hoverable><Statistic title="Total Exchanges" value={millify(globalStats.totalExchanges)} className="stats-card"/></Card> </Col>
      <Col xs={24} sm={12} lg={12} xl={6}><Card hoverable><Statistic title="Total Market Cap" value={millify(globalStats.totalMarketCap)} className="stats-card"/></Card> </Col>
      <Col xs={24} sm={12} lg={12} xl={6}><Card hoverable><Statistic title="Total 24h Volume" value={millify(globalStats.total24hVolume)} className="stats-card"/></Card> </Col>
      <Col xs={24} sm={12} lg={12} xl={6}><Card hoverable><Statistic title="Total Markets" value={millify(globalStats.totalMarkets)} className="stats-card" /></Card> </Col>
    </Row>
    <div className='home-heading-container'>
      <Title level={2} className="home-title">Top 10 Cryptocurrencies in the world </Title>
      <Title level={3} className="show-more"><Link to="/cryptocurrencies">Show More</Link></Title>
    </div>
      <CryptoCurrencies simplified />
    <div className='home-heading-container'>
      <Title level={2} className="home-title">Latest Crypto News </Title>
      <Title level={3} className="show-more"><Link to="/news">Show More</Link></Title>
    </div>
      <News simplified />
    </>
  )
}
