import React from 'react';
import Header from '../component/Header';
import Signin from '../component/Signin';
import Footer from '../component/Footer';
import './Login.css';

function Login() {
    return (
        <>
            <div className="LoginPage">
                <Header />
                <Signin className="Signin" />
                <Footer/>
            </div>
        </>
    );
}

export default Login;
