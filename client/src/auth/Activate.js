import React, {useState, useEffect} from 'react';
import {Link, Redirect} from 'react-router-dom';
import Layout from '../core/Layout';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
	Button
} from 'antd';


toast.configure();

const Activate = ({match}) => {

	const [values, setValues] = useState({
		name: '',
    token: '',
    show: 'true'
	});

	useEffect(() => {
		let token = match.params.token;
		let {name} = jwt.decode(token);

		if(token) {
			setValues({...values, name, token});
		}
	}, []);

	const {name, token, show} = values;

	const clickSubmit = event => {
		event.preventDefault();
		
    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API}/account-activation`,
      data: {token}
    })
    .then(res => {
			console.log('Account activation success', res)
			
      setValues({...values, token: '', show: false});
      toast.success(res.data.message);
    })
    .catch(err => {
      console.log('Account activation error', err.response.data.error);

      toast.error(err.response.data.error);
    })
	};

	const activationLink = () => (
		<div>
			<h1>Hey {name}. Ready to active your account?</h1>
			<Button onClick={clickSubmit} type="primary">Activate account</Button>
		</div>
	);

	return (
		<Layout>
				<ToastContainer />
				{activationLink()}
		</Layout>
	);
};

export default Activate;