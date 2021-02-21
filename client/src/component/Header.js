import React, { useState, useRef, useEffect } from 'react';
import netflixLogo from '../img/logo.png';
import './Header.css';
import { Link } from 'react-router-dom';

const Header = ({ path, page }) => {
    const [open, setOpen] = useState(false);
    const modalEl = useRef();

    const logout = () => {
        axios.post('/api/auth/logout');
        setUser(null);
        console.log('log out');
    };

    const handleClickOutside = ({ target }) => {
        if (open && !modalEl.current.contains(target)) setOpen(false);
      };
    
    useEffect(() => {
      window.addEventListener("click", handleClickOutside);
      return () => {
        window.removeEventListener("click", handleClickOutside);
      };
    }, [open]);

    return (
        <div>
            {path === '/success' ? (
                <div className="Header" style={{ width:"100vw"}}>
                    <div style={{ display: 'flex', margin: '0 56px 18px 56px' }}>
                        <Link to="/home">
                            <img
                                src={netflixLogo}
                                width="90px"
                                draggable="false"
                            />
                        </Link>

                        <div style={{ display:"flex", justifyContent: 'space-between', width:"80vw"}}>
                        <nav className="PrimaryNavigation">
                            <ul style={{ display: 'flex', color: 'white',margin: '0 40px 0 40px',  padding: '0' }}>
                                <Link to="/home">
                                    {page==='Home'  ? <h4 className="NavIndex">Home</h4>:<li className="NavIndex">Home</li>}
                                </Link>
                                <li className="NavIndex"> TV Shows</li>
                                <Link to="/movie">
                                    {page==='Movie' ? <h4  className="NavIndex">Movie</h4> : <li className="NavIndex">Movies</li>}
                                </Link>
                                
                                <Link to="/mylist">
                                    {page==='MyList' ? <h4  className="NavIndex">My List</h4>:<li className="NavIndex">My List</li>}
                                    
                                </Link>
                            </ul>
                        </nav>
                        <nav className="SecondaryNavigation" style={{marginLeft:""}}>
                            <ul style={{position:"relative", display: 'flex', color: 'white',margin: '0 40px 0 40px',  padding: '0' }}>
                                <li className="NavIndex">
                                    {open
                                    ? <input style={{ position:"absolute", right:"0px", top:"0px",backgroundColor:'black', outline:'none', border: "1px solid white", width:"250px", height:'30px', color: 'white'}} ref={modalEl} placeholder="Titles, people, genres"/>
                                    : <img style={{position:"absolute"}}onClick={()=> setOpen(true)} width="24px" height="24px"  src={"https://energetica.md/themes/drupal8_zymphonies_theme/images/search_button.png"}/>}
                                </li>
                                {/* <li className="NavIndex"> icon</li>
                                <li className="NavIndex">icon</li> */}
                                {/* <li className="NavIndex">icon</li> */}

                                    <button className="NavIndex"  style={{ position:"absolute", left:"30px", width:"100px", cursor:'pointer', backgroundColor:'rgba( 255, 255, 255, 0)', border:'none', color:'white'}} onClick={logout}>Sign Out</button>
                            </ul>
                        </nav>
                        </div>
                        
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
