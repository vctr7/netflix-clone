import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import './Signin.css';
import fblogo from '../img/fb.png';
import axios from 'axios';

const Signin = ({signalListener}) => {
    const [account, setAccount] = useState('');
    const [password, setPassword] = useState('');
    const [isAccount, setIsAccount] = useState(false);
    const [isPassword, setIsPassword] = useState(false);
    const [showPassword, setShowPassword] = useState('password');

    const [isLogin, setIsLogin] = useState(false);

    useEffect(() => {
        if (account.length > 4) setIsAccount(true);
        else setIsAccount(false);
    }, [account]);

    useEffect(() => {
        if (password.length > 4 && password.length <= 60) setIsPassword(true);
        else setIsPassword(false);
    }, [password]);

    useEffect(() => {
        if (isLogin) {
            signalListener(isLogin);
            console.log('update');
        }
    }, [isLogin]);

    const submitSignin = () => {
        axios.post('api/auth/login', { account, password }).then((res) => {
            if (res.status === 200) {
                console.log('sign in');
                setIsLogin(true);
            } else {
                console.log('not error but problem');
            }
        });
    };
    return (
        <div>
            {isLogin ? (
                <Redirect to="/home" />
            ) : (
                <div className="SigninWrapper">
                    <div className="SigninBox">
                        <div className="SigninFormMain">
                            <h1
                                style={{ color: 'white', marginBottom: '28px' }}
                            >
                                Sign In
                            </h1>

                            {isAccount ? (
                                <div className="Id">
                                    <input
                                        className="CorrectInputId"
                                        placeholder="Email or phone number"
                                        value={account}
                                        onChange={(e) =>
                                            setAccount(e.target.value)
                                        }
                                        type="text"
                                    ></input>
                                </div>
                            ) : (
                                <div className="Id">
                                    <input
                                        className="IncorrectInput"
                                        placeholder="Email or phone number"
                                        value={account}
                                        onChange={(e) =>
                                            setAccount(e.target.value)
                                        }
                                        type="text"
                                    ></input>
                                    <div className="Incorrect">
                                        Please enter a valid email or phone
                                        number.
                                    </div>
                                </div>
                            )}

                            {isPassword ? (
                                <div
                                    className="Password"
                                    style={{ display: 'flex' }}
                                >
                                    <input
                                        className="CorrectInputPassword"
                                        type={showPassword}
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                    ></input>
                                    <div
                                        style={{
                                            zIndex: '2',
                                            color: '#898989',
                                            fontSize: '10pt',
                                            height: '35px',
                                            cursor: 'pointer',
                                            paddingTop: '17px',
                                            paddingRight: '13px',
                                            backgroundColor: '#454545',
                                            borderRadius: '0px 5px 5px 0px',
                                        }}
                                        onClick={() => {
                                            if (showPassword === 'password')
                                                setShowPassword('text');
                                            else setShowPassword('password');
                                        }}
                                    >
                                        {showPassword === 'password'
                                            ? 'SHOW'
                                            : 'HIDE'}
                                    </div>
                                </div>
                            ) : (
                                <div className="Password">
                                    <input
                                        className="IncorrectInput"
                                        type="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                    ></input>
                                    <div className="Incorrect">
                                        Your password must contain between 4 and
                                        60 characters.
                                    </div>
                                </div>
                            )}

                            <div className="SigninButton">
                                <button onClick={submitSignin}>Sign In</button>
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
                                    <div style={{ color: 'white' }}>
                                        Sign up now
                                    </div>
                                </Link>
                            </div>
                            <div className="CAPTCHA"></div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Signin;
