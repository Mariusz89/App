import React, {useState} from 'react';
import {Link, Redirect} from 'react-router-dom';
import Layout from '../core/Layout';
import axios from 'axios';
import {isAuth} from './helpers';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Form,
  Input,
  Tooltip,
	Button
} from 'antd';

const layout = {
  labelCol: {
    span: 9,
  },
  wrapperCol: {
    span: 6,
  },
};

const tailLayout = {
  wrapperCol: {
    offset: 9,
    span: 6,
  },
};

toast.configure();

const Signup = () => {

	const [values, setValues] = useState({
		name: '',
		email: '',
		password: '',
		buttonText: 'Submit'
	});

	const {name, email, password, buttonText} = values;

	const handleChange = name => event => {
    console.log({...values, [name]: event.target.value});

    setValues({...values, [name]: event.target.value});
	}

	const clickSubmit = event => {
    event.preventDefault();

    setValues({...values, buttonText: 'Submitting'});

    console.log('aaaa', process.env.REACT_APP_API);

    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API}/signup`,
      data: {name, email, password}
    })
    .then(res => {
      console.log(res, 'Signup success')
      setValues({...values, name: '', email: '', password: '', buttonText: 'Submitted'});
      toast.success(res.data.message);
    })
    .catch(err => {
      console.log('error', err.response.data);

      setValues({...values, buttonText: 'Submit'});
      toast.error(err.response.data.error);
    })
	}

	const signupForm = () => (
		<Form
      {...layout}
      name="basic"
      initialValues={{
        remember: true,
      }}
      //onFinish={onFinish}
      //onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Name"
				name="name"
				value={name}
        rules={[
          {
            required: true,
            message: 'Please input your name!',
          },
				]}
				onChange={handleChange('name')}
      >
        <Input />
      </Form.Item>

			<Form.Item
        label="Email"
				name="email"
				value={email}
        rules={[
          {
						type: 'email',
            required: true,
            message: 'Please input your email!',
          },
				]}
				onChange={handleChange('email')}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
				name="password"
				value={password}
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
				]}
				onChange={handleChange('password')}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit" onClick={clickSubmit}>
          {buttonText}
        </Button>
      </Form.Item>
    </Form>
	);

	return (
		<Layout>
				<ToastContainer />
        {isAuth() ? <Redirect to="/" /> : null} 
				<h1 className="text-center">Signup</h1>
				{signupForm()}
		</Layout>
	);
};

export default Signup;