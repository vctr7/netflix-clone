import './App.css';
import React, { useState, useEffect } from 'react';
import { Route, Link } from 'react-router-dom';

import Header from './component/Header';
import Footer from './component/Footer';

import Login from './page/Login';
import Register from './page/Register';
import axios from 'axios';

function App() {
    const [email, setEmail] = useState('');
    const [lever, setLever] = useState(false);

    const [user, setUser] = useState(null);
    const [signal, setSignal] = useState(null);

    const logout = () => {
        axios.post('/api/auth/logout');
        setUser(null);
        console.log('log out');
    };

    const signalListener = (data) => {
        console.log(data);
        setSignal(data);
    };

    const loginState = async () => {
        try {
            await axios.get('/api/auth/check').then((res) => {
                setUser(res);
                // console.log(res);
            });
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        loginState();
        // console.log(user);
    }, [signal]);

    return (
        <div>
            <Route path="/" exact>
                <div>
                    {user ? (
                        <div className="Home" style={{ minHeight: '300vh' }}>
                            <header style={{ position: 'fixed', zIndex: '2', padding:'0'}}>
                                <Header path="/success" logout={logout} />
                            </header>

                        </div>
                    ) : (
                        <div className="Home" style={{ minHeight: '100vh' }}>
                            <Header path="/" />
                            <div className="Text">
                                <h1
                                    className="TextTitle"
                                    style={{ fontSize: '50pt' }}
                                >
                                    Unlimited movies, TV shows, and more.
                                </h1>
                                <h2
                                    className="TextSubtitle"
                                    style={{
                                        fontSize: '1.625rem',
                                        fontWeight: 'normal',
                                    }}
                                >
                                    Watch anywhere. Cancel anytime.
                                </h2>

                                <div className="EmailForm">
                                    <h3
                                        className="EmailTitle"
                                        style={{ fontWeight: 'normal' }}
                                    >
                                        Ready to watch? Enter your email to
                                        create or restart your membership.
                                    </h3>
                                    <div
                                        className="EmailInput"
                                        style={{ display: 'flex' }}
                                    >
                                        <input
                                            style={{
                                                width: '505px',
                                                borderRadius: '1px 0 0 1px',
                                            }}
                                            placeholder="Email address"
                                            value={email}
                                            onChange={(e) => {
                                                setEmail(e.target.value);
                                            }}
                                        />
                                        {email.length > 4 ? (
                                            <Link to="/register">
                                                <button
                                                    style={{
                                                        borderRadius:
                                                            '0 2px 2px 0',
                                                        width: '289px',
                                                    }}
                                                >
                                                    GET STARTED&nbsp;&nbsp;
                                                    <svg
                                                        viewBox="0 0 6 12"
                                                        width="10px"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <desc>chevron</desc>
                                                        <path
                                                            d="M.61 1.312l.78-.624L5.64 6l-4.25 5.312-.78-.624L4.36 6z"
                                                            fill="white"
                                                            fill-rule="evenodd"
                                                        ></path>
                                                    </svg>
                                                </button>
                                            </Link>
                                        ) : (
                                            <>
                                                <button
                                                    style={{
                                                        borderRadius:
                                                            '0 2px 2px 0',
                                                        width: '294px',
                                                    }}
                                                    onClick={() =>
                                                        setLever(true)
                                                    }
                                                >
                                                    GET STARTED&nbsp;&nbsp;
                                                    <svg
                                                        viewBox="0 0 6 12"
                                                        width="10px"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <desc>chevron</desc>
                                                        <path
                                                            d="M.61 1.312l.78-.624L5.64 6l-4.25 5.312-.78-.624L4.36 6z"
                                                            fill="white"
                                                            fill-rule="evenodd"
                                                        ></path>
                                                    </svg>
                                                </button>
                                            </>
                                        )}
                                    </div>
                                    {email.length <= 4 && lever ? (
                                        <div
                                            style={{
                                                color: '#E77B04',
                                                marginTop: '5px',
                                                float: 'left',
                                            }}
                                        >
                                            Email is required!
                                        </div>
                                    ) : null}
                                </div>

                                <Footer style={{ marginTop: '200px' }}></Footer>
                            </div>
                        </div>
                    )}
                </div>
            </Route>
            <Route
                path="/login"
                render={() => <Login signalListener={signalListener} />}
            />
            <Route
                path="/register"
                render={() => (
                    <Register email={email} signalListener={signalListener} />
                )}
            />
        </div>
    );
}

export default App;
