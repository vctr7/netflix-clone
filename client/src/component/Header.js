import React from 'react';
import netflixLogo from '../img/logo.png';
import './Header.css';
import { Link } from 'react-router-dom';

const Header = ({ path, logout }) => {
    return (
        <div>
            {path === '/success' ? (
                <div className="Header" style={{ width:"100vw"}}>
                    <div style={{ display: 'flex', margin: '0 56px 18px 56px' }}>
                        <Link to="/">
                            <img
                                src={netflixLogo}
                                width="90px"
                                draggable="false"
                            />
                        </Link>
                        <nav className="PrimaryNavigation">
                            <ul style={{ display: 'flex', color: 'white',margin: '0 40px 0 40px',  padding: '0' }}>
                                <li className="NavIndex">Home</li>
                                <li className="NavIndex"> TV Shows</li>
                                <li className="NavIndex">Movies</li>
                                <li className="NavIndex">My List</li>
                            </ul>
                        </nav>
                        <nav className="SecondaryNavigation">
                            <ul style={{ display: 'flex', color: 'white',margin: '0',  padding: '0' }}>
                                <li className="NavIndex">icon</li>
                                <li className="NavIndex"> icon</li>
                                <li className="NavIndex">icon</li>
                                <li className="NavIndex">icon</li>
                                <div >
                                    <button style={{cursor:'pointer', backgroundColor:'rgba( 255, 255, 255, 0)', border:'none', color:'white'}} onClick={logout}>Sign Out</button>
                                </div>
                            </ul>
                        </nav>
                    </div>
                </div>
            ) : (
                <div className="Header">
                    <div className="HeaderContents">
                        <Link to="/">
                            <img
                                src={netflixLogo}
                                width="166px"
                                draggable="false"
                            />
                        </Link>

                        {path === '/' ? (
                            <Link to="/login">
                                <div className="LoginButton">
                                    <button>Sign In</button>
                                </div>
                            </Link>
                        ) : null}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Header;
