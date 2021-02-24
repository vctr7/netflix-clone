import './App.css';
import React, { useState, useEffect } from 'react';
import { Route, Link, Redirect } from 'react-router-dom';

import Header from './component/Header';
import Footer from './component/Footer';

import Login from './page/Login';
import Register from './page/Register';
import MyList from './page/MyList';
import Movie from './page/Movie';
import Home from './page/Home';

import axios from 'axios';

import R from './img/restricted.png';
import PG from './img/parental_guidance.png';
import G from './img/general_audience.png';

function App() {
    const [email, setEmail] = useState('');
    const [lever, setLever] = useState(false);
    const [user, setUser] = useState(null);
    const [signal, setSignal] = useState(null);
    const [search, setSearch] = useState('');
    const [searchResult, setSearchResult] = useState(null);

    const [timer, setTimer] = useState(0);


    const signalListener = (data) => {
        setSignal(data);
    };

    const loginState = async () => {
        try {
            await axios
                .get('/api/auth/check')
                .then((res) => {
                    setUser(res);
                })
                .catch((err) => console.log(err));
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        loginState();
    }, [signal]);


    const addMyList = (videoInfo) =>{
        if (user){
            axios.post("api/auth/mylist", { user, videoInfo }).then((res) => {
                if (res.status === 200) {
                    loginState();
                } else {
                    console.log('not error but problem');
                }
            }).catch((err) => console.log(err));;
            
        }
    }

    const addLikeVideo = (videoInfo) =>{
        if (user){
            axios.post("api/auth/likeVideo", { user, videoInfo }).then((res) => {
                if (res.status === 200) {
                    loginState();
                } else {
                    console.log('not error but problem');
                }
            }).catch((err) => console.log(err));
        }
    }

    const addDislikeVideo = (videoInfo) =>{
        if (user){
            axios.post("api/auth/dislikeVideo", { user, videoInfo }).then((res) => {
                if (res.status === 200) {
                    loginState();
                } else {
                    console.log('not error but problem');
                }
            }).catch((err) => console.log(err));;
        }
    }

    const getMovieRating = (rating) => {
        if (rating === 'G') return G;
        else if (rating === 'R') return R;
        else return PG;
    };

    useEffect(() => {
        if(timer){
            clearTimeout(timer);
        }
        const newTimer = setTimeout(async () => {
            try {
                getSearch();
            } catch (e) {
              console.error('error', e);
            }
          }, 600);
        setTimer(newTimer);
        
    }, [search])

    const getSearch = () =>{
        if(user){
            axios
                .get('api/video/search', {params:{search:search}})
                .then((res) => {
                    // console.log(res.data);
                    setSearchResult(res.data);
                })
                .catch((err) => console.log(err))
        }
    }

    return (
        <div>
                {user ? (
                    //Login
                    <div>
                        <Redirect to="/home" />
                        <Route path="/home" exact> 
                                <div style={{ backgroundColor:'#151515' }} />
                        </Route>    
                    </div>

                ) : (
                    //Not Login
                    <Route path="/" exact>
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
                                    Ready to watch? Enter your email to create
                                    or restart your membership.
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
                                                    borderRadius: '0 2px 2px 0',
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
                                                        fillRule="evenodd"
                                                    ></path>
                                                </svg>
                                            </button>
                                        </Link>
                                    ) : (
                                        <>
                                            <button
                                                style={{
                                                    borderRadius: '0 2px 2px 0',
                                                    width: '294px',
                                                }}
                                                onClick={() => setLever(true)}
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
                                                        fillRule="evenodd"
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
                    </Route>
                )}

            <Route
                path="/login"
                render={() => <Login signalListener={signalListener} />}
            />
            <Route
                path="/register"
                render={() => <Register email={email} signalListener={signalListener} />}
            />
            <Route
                path="/home"
                render={() => <Home user={user} setUser={setUser} search={search} setSearch={setSearch} searchResult={searchResult} addMyList={addMyList} addLikeVideo={addLikeVideo} addDislikeVideo={addDislikeVideo} getMovieRating={getMovieRating}/>}>
            </Route>

            <Route
                path="/mylist"
                render={() => <MyList user={user} setUser={setUser} search={search} setSearch={setSearch} searchResult={searchResult} addMyList={addMyList} addLikeVideo={addLikeVideo} addDislikeVideo={addDislikeVideo} getMovieRating={getMovieRating}/>}>

            </Route>
            <Route
                path="/movie"
                render={() => <Movie user={user} setUser={setUser} search={search} setSearch={setSearch} searchResult={searchResult} addMyList={addMyList} addLikeVideo={addLikeVideo} addDislikeVideo={addDislikeVideo} getMovieRating={getMovieRating}/>}>

            </Route>
        </div>
    );
}

export default App;
