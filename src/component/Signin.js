import { withTheme } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Signin.css';
import fblogo from '../img/fb.png';

const Signin = () => {
    const [account, setAccount] = useState('');
    const [password, setPassword] = useState('');
    const [isAccount, setIsAccount] = useState(false);
    const [isPassword, setIsPassword] = useState(false);

    useEffect(() => {
        if (account.length > 4) setIsAccount(true);
        else setIsAccount(false);
    }, [account]);

    useEffect(() => {
        if (password.length > 4 && password.length <= 60) setIsPassword(true);
        else setIsPassword(false);
    }, [password]);

    const style = {
        color: 'white',
    };

    return (
        <div className="SigninWrapper">
            <div className="SigninBox">
                <div className="SigninFormMain">
                    <h1 style={{ color: 'white', marginBottom: '28px' }}>
                        Sign In
                    </h1>

                    {isAccount ? (
                        <div className="Id">
                            <input
                                className="CorrectInput"
                                placeholder="Email or phone number"
                                value={account}
                                onChange={(e) => setAccount(e.target.value)}
                                onFocus=""
                            ></input>
                        </div>
                    ) : (
                        <div className="Id">
                            <input
                                className="IncorrectInput"
                                placeholder="Email or phone number"
                                value={account}
                                onChange={(e) => setAccount(e.target.value)}
                                onFocus=""
                            ></input>
                            <div className="Incorrect">
                                Please enter a valid email or phone number.
                            </div>
                        </div>
                    )}

                    {isPassword ? (
                        <div className="Password">
                            <input
                                className="CorrectInput"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            ></input>
                        </div>
                    ) : (
                        <div className="Password">
                            <input
                                className="IncorrectInput"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            ></input>
                            <div className="Incorrect">
                                Your password must contain between 4 and 60
                                characters.
                            </div>
                        </div>
                    )}

                    <div className="SigninButton">
                        <button>Sign In</button>
                    </div>
                </div>
                <div
                    style={{
                        width: '217px',
                        height: '314px',
                        color: '#737373',
                    }}
                >
                    <div
                        className="LoginWithFacebook"
                        style={{ display: 'flex', marginTop: '20px' }}
                    >
                        <img src={fblogo} width="16px"></img>
                        &nbsp;
                        <div>Login with Facebook</div>
                    </div>
                    <div style={{ display: 'flex', marginTop: '20px' }}>
                        <div>New to Netflix?</div>
                        &nbsp;
                        <Link to="/">
                            <div style={{ color: 'white' }}>Sign up now</div>
                        </Link>
                    </div>
                    <div className="CAPTCHA"></div>
                </div>
            </div>
        </div>
    );
};

export default Signin;
