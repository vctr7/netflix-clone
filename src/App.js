import './App.css';
import React, { useState, useEffect } from 'react';
import { Route, Link } from 'react-router-dom';

import Header from './component/Header';

import Login from './page/Login';
import Register from './page/Register';

function App() {
    const [email, setEmail] = useState('');

    // useEffect(() => {}, [email]);

    const onClick = () => {};

    return (
        // not Login
        <div>
            <Route path="/" exact>
                <div className="Home">
                    <Header path="/" />
                    <div className="Text">
                        <h1 className="TextTitle" style={{ fontSize: '50pt' }}>
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
                                Ready to watch? Enter your email to create or
                                restart your membership.
                            </h3>
                            <div
                                className="EmailInput"
                                style={{ display: 'flex' }}
                            >
                                <input
                                    placeholder="Email address"
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                    }}
                                ></input>
                                <Link to="/register">
                                <button>
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
                            </div>
                        </div>
                    </div>
                    <hr style={{ border: 'solid 4px grey', opacity: '30%' }} />
                </div>
            </Route>
            <Route path="/login" render={() => <Login />} />
            <Route path="/register" render={() => <Register email={email}/>} />
        </div>
    );
}

export default App;
