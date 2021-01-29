import React from 'react';
import Header from '../component/Header';
import Signin from '../component/Signin';
import Footer from '../component/Footer';
import './Login.css';

function Login({signalListener}) {
    return (
        <>
            <div className="LoginPage">
                <Header />
                <Signin className="Signin" signalListener={signalListener} />
                <Footer/>
            </div>
        </>
    );
}

export default Login;
