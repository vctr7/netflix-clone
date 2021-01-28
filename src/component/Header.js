import React from 'react';
import netflixLogo from '../img/logo.png';
import './Header.css';
import { Link } from 'react-router-dom';

const Header = ({ path }) => {
    return (
        <div className="Header">
            <div className="HeaderContents">
                <Link to="/">
                    <img src={netflixLogo} width="166px" draggable="false" />
                </Link>
                {path === '/' ? (
                    <Link to="/login">
                        <div className="Button">
                            <button>Sign In</button>
                        </div>
                    </Link>
                ) : null}
            </div>
        </div>
    );
};

export default Header;
