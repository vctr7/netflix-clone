import React from 'react';
import logo from '../img/logo.png';
import './Header.css';

const Header = () => {
    return (
        <div className="Header">
            <div className="HeaderContents">
                <img src={logo} width="166px" />
                <div className="Button">
                    <button>Sign In</button>
                </div>
            </div>
        </div>
    );
};

export default Header;
