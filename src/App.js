import './App.css';
import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import mainpage from './img/main.jpg';

import Header from './component/Header';

function App() {
    return (
        // not Login
        <>
            <div className="Home">
                <Header />
                <div className="Text">
                    <h1 className="TextTitle">
                        Unlimited movies, TV shows, and more.
                    </h1>
                    <h2 className="TextSubtitle">
                        Watch anywhere. Cancel anytime.
                    </h2>

                    <div className="EmailForm">
                        <h3 className="EmailTitle">
                            Ready to watch? Enter your email to create or
                            restart your membership.
                        </h3>
                        <div className="EmailInput">
                            <input placeholder="Email address"></input>
                            <button>GET STARTED > </button>
                        </div>
                    </div>
                </div>
                <hr />
            </div>
            
        </>
    );
}

export default App;
