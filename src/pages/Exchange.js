import { Avatar, Col, Collapse, Row, Typography,Pagination } from 'antd';
import HTMLReactParser from 'html-react-parser';
import millify from 'millify';
import React, { useEffect, useState } from 'react'
import { Loader } from '../components/Loader';
import { useGetCryptosExchnageQuery } from '../services/CryptoApiExchange';
const {Text, Title} = Typography;
const {Panel} = Collapse;

export const Exchange = () => {
  const [page,setPage] = useState(0);
  const pageSize = 15;
  const {data: exchangeList, isFetching} = useGetCryptosExchnageQuery();
  useEffect(() => {
    setPage({
      totalPage: exchangeList?.length / pageSize,
      minIndex: 0,
      maxIndex: pageSize
    })
  },[exchangeList]);

  const handleChange = (page) => {
    setPage({
      current: page,
      minIndex: (page - 1) * pageSize,
      maxIndex: page * pageSize
    })
  }
  const {minIndex, maxIndex } = page;
  if(isFetching) return <Loader/>
  return (
    <>
      <Row>
        <Col span={6}><Title level={5}>Exchanges</Title></Col>
        <Col span={6}><Title level={5}>24h Trade Volume</Title></Col>
        <Col span={6}><Title level={5}>Year Established</Title></Col>
        <Col span={6}><Title level={5}>Trust</Title></Col>
      </Row>
      {exchangeList?.map((exchange, index) => index >= minIndex &&
              index < maxIndex && (
        <Col key={exchange.id} className="exchange-header">
          <Collapse >
          <Panel
            key={exchange.id}
            showArrow={false}
            header={(
              <Row key={exchange.id}>
                <Col span={6}>
                  <Text><strong>{exchange.trust_score_rank}.</strong></Text>
                  <Avatar className='exchange-image' src={exchange.image} />
                  <Text><strong>{exchange.name}</strong></Text>
                </Col>
                <Col span={6}>${millify(exchange.trade_volume_24h_btc)}</Col>
                <Col span={6}>{exchange.year_established}</Col>
                <Col span={6}>{exchange.trust_score}</Col>
              </Row>
            )}
          >
              {HTMLReactParser(exchange.description || '')}
          </Panel>
          </Collapse>
        </Col>
      ))}
      <Pagination pageSize={pageSize} className="pagination"
          total={exchangeList?.length}
          onChange={handleChange}
          style={{ bottom: "0px" }} defaultCurrent={1} />
    </>
  )
}
