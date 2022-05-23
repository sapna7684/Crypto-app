import React from 'react'
import { Typography, Space } from 'antd'
import {Link} from 'react-router-dom'

export const Footer = () => {
  return (
    <div className='footer'>
        <Space style={{marginBottom:'10px'}}>
            <Link to="/">Home</Link>
            <Link to="/cryptocurrencies">Cryptocurrencies</Link>
            <Link to="/exchanges">Exchange</Link>
            <Link to="/news">News</Link>
        </Space>
        <Typography.Title level={5} style={{color:'white', textAlign:'center'}}>
                Crypto Currency, All rights reserved
        </Typography.Title>
    </div>
  )
}
