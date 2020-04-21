import React, {Fragment, useState} from 'react';
import { Menu } from 'antd';
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import {Link, withRouter} from 'react-router-dom';

const { SubMenu } = Menu;


const Layout = ({children, match, history}) => {

	const nav = () => (
    
		<Menu defaultSelectedKeys={['/']} selectedKeys={[match.path]} mode="horizontal">
        <Menu.Item key="/">
          <MailOutlined />
					<Link to="/" rel="noopener noreferrer">
						Home
          </Link>
        </Menu.Item>
        <Menu.Item key="/signup">
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
        <Menu.Item key="/signin">
          <Link to="/signin" rel="noopener noreferrer">
            Signin
          </Link>
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

export default withRouter(Layout);