import React, {Fragment} from 'react';
import { Menu } from 'antd';
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import {Link} from 'react-router-dom';

const { SubMenu } = Menu;


const Layout = ({children}) => {

	const nav = () => (
		<Menu  mode="horizontal">
        <Menu.Item key="mail">
          <MailOutlined />
					<Link to="/" rel="noopener noreferrer">
						Home
          </Link>
        </Menu.Item>
        <Menu.Item key="app">
          <AppstoreOutlined />
					<Link to="/signup" rel="noopener noreferrer">
						Signup
          </Link>
        </Menu.Item>
        <SubMenu
          title={
            <span className="submenu-title-wrapper">
              <SettingOutlined />
              Navigation Three - Submenu
            </span>
          }
        >
          <Menu.ItemGroup title="Item 1">
            <Menu.Item key="setting:1">Option 1</Menu.Item>
            <Menu.Item key="setting:2">Option 2</Menu.Item>
          </Menu.ItemGroup>
          <Menu.ItemGroup title="Item 2">
            <Menu.Item key="setting:3">Option 3</Menu.Item>
            <Menu.Item key="setting:4">Option 4</Menu.Item>
          </Menu.ItemGroup>
        </SubMenu>
        <Menu.Item key="alipay">
          <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
            Navigation Four - Link
          </a>
        </Menu.Item>
      </Menu>
	);

	return (
		<Fragment>
			{nav()}
			<div className="container">
				{children}
			</div>
		</Fragment>
	);
};

export default Layout;