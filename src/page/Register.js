import React from 'react';
import './Register.css';
import Header from '../component/Header';
import RegisterForm from '../component/RegisterForm'

const Register = ({email}) => {
    return (
        <div className="RegisterPage">
            <Header path="/register"></Header>
            <hr style={{border: 'solid 0.5px #E6E6E6', opacity:'50%'}} />
            <RegisterForm email={email}></RegisterForm>
        </div>
    );
};

export default Register;
