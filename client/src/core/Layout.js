import React, {Fragment, useState} from 'react';
import { Menu } from 'antd';
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import {Link, withRouter} from 'react-router-dom';
import {isAuth, signout} from '../auth/helpers';


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
        {!isAuth() &&
          <Menu.Item key="/signup">
            <AppstoreOutlined />
            <Link to="/signup" rel="noopener noreferrer">
              Signup
            </Link>
          </Menu.Item>
        }
        {isAuth() ?
          <Menu.Item onClick={() => signout(() => {
            history.push('/')
          })}>
            Signout
          </Menu.Item>
          :
          <Menu.Item key="/signin">
            <Link to="/signin" rel="noopener noreferrer">
              Signin
            </Link>
          </Menu.Item>
        }
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