import React, { useEffect, useState } from 'react'
import {Button, Typography, Avatar, Menu} from 'antd'
import { Link } from 'react-router-dom'
import { HomeOutlined, FundOutlined, MoneyCollectOutlined,BulbOutlined, MenuOutlined } from '@ant-design/icons'
import 'antd/dist/antd.css'
import icon from '../../../images/cryptocurrency.png'

export const Navbar = () => {
const [activeMenu, setActiveMenu] = useState(true);
const [screenSize, setScreenSize] = useState(null);

useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);

},[]);

useEffect(() => {
if(screenSize < 990){
    setActiveMenu(false)
} else {
    setActiveMenu(true)
}
},[screenSize]);

const hideMenu = () => {
    if(screenSize < 990){
        setActiveMenu(false)
    } else {
        setActiveMenu(true)
    }
};

  return (
    <div className='navbar'>
        <div className="nav-container">
            <div className="logo-container">
                <Avatar src={icon} size="large"/>
                <Typography.Title level={2} className="logo">
                    <Link  to="/" style={{color:"#fff"}}>Crypto App</Link>
                </Typography.Title>
                <Button className='menu-control-container' onClick={() => setActiveMenu(!activeMenu)}><MenuOutlined/></Button>
            </div>
            {activeMenu && (
                <Menu theme='dark'>
                <Menu.Item icon={<HomeOutlined/>} onClick={hideMenu}>
                    <Link to="/">Home</Link>
                </Menu.Item>
                <Menu.Item icon={<FundOutlined/>} onClick={hideMenu}>
                    <Link to="/cryptocurrencies">Cryptocurrencies</Link>
                </Menu.Item>
                <Menu.Item icon={<MoneyCollectOutlined/>} onClick={hideMenu}>
                    <Link to="/exchanges">Exchanges</Link>
                </Menu.Item>
                <Menu.Item icon={<BulbOutlined/>} onClick={hideMenu}>
                    <Link to="/news">News</Link>
                </Menu.Item>
            </Menu>
            )}
        </div>
    </div>
  )
}
