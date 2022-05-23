import { Avatar, Card, Col, Row, Select, Typography } from 'antd';
import React, { useState } from 'react'
import moment from 'moment';
import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi'
import { useGetCryptosQuery } from '../services/cryptoApi';
import { Loader } from '../components/Loader';
const demoImage = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';

const {Title, Text} = Typography;
const {Option} = Select;

export const News = ({simplified}) => {
  const [newsCategory,setNewsCategory] = useState('Cryptocurrency')
  const {data} = useGetCryptosQuery(100);
  const {data: cryptoNews} = useGetCryptoNewsQuery({newsCategory, count: simplified ? 6 : 12});

  if(!cryptoNews?.value) return <Loader/>;
  return (
    <>
    <Row gutter={[24,24]}>
      {!simplified && (
        <Col span={24}>
          <label style={{marginRight:"15px"}}>Select a Crypto Currency</label>
          <Select
            showSearch
            className='select-news'
            placeholder='Select a news Crypto'
            optionFilterProp='children'
            onChange={(value) => setNewsCategory(value)}
            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase() > 0)}
          >
            <Option value="Cryptocurrency">Cryptocurrency</Option>
            {data?.data?.coins.map((currency) => <Option key={currency} value={currency.name}>{currency.name}</Option>)}
          </Select>
        </Col>
      )}
      {cryptoNews.value.map((news,i)=>(
        <Col key={i} xs={24} sm={12} lg={8} >
          <Card className='news-card' hoverable>
            <a href={news.url} target="_blank" rel="noreferrer">
              <div className='news-image-container'>
                <Title className='news-title' level={4}>{news.name}</Title>
                <img src={news?.image?.thumbnail?.contentUrl || demoImage} alt="news" style={{maxWidth:"200px", maxHeight:"200px", objectFit:'cover'}} />
              </div>
              <p>{news.description > 100 ? `${news.description.substring(0,100)}...` : news.description}</p>
              <div className='provider-container'>
                <div>
                  <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImage} alt="news" />
                  <Text className='provider-name'>{news.provider[0]?.name}</Text>
                </div>
                  <Text>{moment(news.datePublished).startOf('ss').fromNow()}</Text>
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
    </>
  )
}
