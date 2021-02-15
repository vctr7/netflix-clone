import './App.css';
import React, { useState, useEffect } from 'react';
import { Route, Link } from 'react-router-dom';

import Header from './component/Header';
import Footer from './component/Footer';

import Login from './page/Login';
import Register from './page/Register';
import axios from 'axios';

import R from './img/restricted.png';
import PG from './img/parental_guidance.png';
import G from './img/general_audience.png';

function App() {
    const [email, setEmail] = useState('');
    const [lever, setLever] = useState(false);

    const [user, setUser] = useState(null);
    const [signal, setSignal] = useState(null);

    const [videoData, setVideoData] = useState(null);
    const [videoInfo, setVideoInfo] = useState(null);
    const [turnOn, setTurnOn] = useState(false);

    const logout = () => {
        axios.post('/api/auth/logout');
        setUser(null);
        console.log('log out');
    };

    const fetchData = async () => {
        const result = await axios
            .get('api/video/home')
            .then((res) => setVideoData(res.data))
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        fetchData();
    }, []);

    const signalListener = (data) => {
        console.log(data);
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
        // console.log(user);
    }, [signal]);


    const stopVideo = () => {
        const video = document.getElementById('videoPlayer');
        video.pause();
    };

    const playVideo = (vdata) => {
        if (turnOn) {
            setTurnOn(false);
            stopVideo();
        }
        console.log('PLAY', vdata.v_url);
        
        setVideoInfo(vdata);
        setTurnOn(true);
        axios.post("api/video/play", { vdata }).then((res) => {
            if (res.status === 200) {
                console.log('increase');
            } else {
                console.log('not error but problem');
            }
        });
    };

    const addMyList = (videoInfo) =>{
        if (user){
            // console.log(user)
            axios.post("api/auth/mylist", { user, videoInfo }).then((res) => {
                if (res.status === 200) {
                    console.log('');
                } else {
                    console.log('not error but problem');
                }
            });
        }
    }

    const addLikeVideo = (videoInfo) =>{
        if (user){
            axios.post("api/auth/likeVideo", { user, videoInfo }).then((res) => {
                if (res.status === 200) {
                    console.log('');
                } else {
                    console.log('not error but problem');
                }
            });
        }
    }

    const addDislikeVideo = (videoInfo) =>{
        if (user){
            axios.post("api/auth/dislikeVideo", { user, videoInfo }).then((res) => {
                if (res.status === 200) {
                    console.log('');
                } else {
                    console.log('not error but problem');
                }
            });
        }
    }

    const getMovieRating = (rating) => {
        if (rating === 'G') return G;
        else if (rating === 'R') return R;
        else return PG;
    };

    return (
        <div>
            <Route path="/" exact>
                {user ? (
                    <div style={{ minHeight: '300vh', backgroundColor:'#151515' }}>
                        {turnOn ? (
                            <>
                                <header
                                    className="HeaderPlaying"
                                    style={{position: 'fixed', zIndex: '10'}}>
                                    <Header path="/success" logout={logout} />
                                </header>

                                <div draggable="false" style={{ textAlign: 'center' }}>
                                    <video
                                        style={{
                                            outline: 'none',
                                            objectFit: 'contain',
                                            width: '100vw',
                                            minHeight: '940px',
                                            maxHeight: '940px'}}
                                        id="videoPlayer"
                                        controls
                                        autoPlay
                                        src={`http://localhost:8888${videoInfo.v_url}`}
                                    />
                                    <div
                                        draggable="false"
                                        style={{
                                            position: 'absolute',
                                            top: '400px',
                                            left: '50px',
                                            color: 'white',
                                            textAlign: 'left'}}>
                                        {videoInfo.title === 'x' ? (
                                            <>
                                                <div style={{ fontSize: '40pt' }}>{videoInfo.info.english_name}</div>
                                                {videoInfo.info.language === 'English' ? ( 
                                                null
                                                ) : (
                                                    <div style={{fontSize: '20pt'}}>{videoInfo.info.original_name}</div>
                                                )}
                                            </>
                                        ) : (
                                            <img draggable="false" style={{maxWidth:"500px"}} src={videoInfo.title}/>
                                        )}

                                        <div style={{marginTop: '20px', display: 'flex'}}>
                                            <div>{videoInfo.info.year}</div>
                                            <div>&nbsp;|&nbsp;</div>
                                            <div>{`${parseInt(videoInfo.info.duration / 60,)}h ${videoInfo.info.duration % 60}m`}</div>
                                            <div>&nbsp;|&nbsp;</div>
                                            <img height="24px" src={getMovieRating(videoInfo.info.age)}/>
                                        </div>

                                        <div style={{ marginTop: '3px', display: 'flex'}}>
                                            <div>{videoInfo.info.country}</div>
                                            <div>&nbsp;|&nbsp;</div>
                                            <div>{videoInfo.info.language}</div>
                                        </div>

                                        <div style={{ marginTop: '20px' }}>
                                            <div>Director:{' '}{videoInfo.info.director}</div>
                                            <div style={{ marginTop: '3px' }}>Cast:{' '}{videoInfo.info.actors.join(', ',)}</div>
                                            <div style={{ marginTop: '3px' }}>Genres:{' '}{videoInfo.info.genre.join(', ',)}</div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <header
                                style={{position: 'fixed', zIndex: '10'}}>
                                <Header style={{ backgroundColor: 'black' }} path="/success" logout={logout}/>
                            </header>
                        )}

                        <div>
                            {videoData ? (
                                <div
                                    style={{
                                        paddingTop: '100px',
                                        display: 'grid',
                                        gridTemplateColumns: 'repeat(6, 254px)',
                                        rowGap: '80px',
                                        justifyContent: 'center',
                                    }}>
                                    {videoData.map((vdata) => (
                                        <div
                                            key={vdata._id}
                                            className="Item"
                                            style={{
                                                position: 'relative',
                                                maxWidth: '250px',
                                                maxHeight: '140px',
                                                cursor: 'pointer',
                                            }}>
                                            <img
                                                className="video"
                                                style={{
                                                    objectFit: 'cover',
                                                    borderRadius: '3px',
                                                    width: '250px',
                                                    height: '140px',
                                                }}
                                                src={vdata.thumbnail}/>
                                            <div className="Caption">
                                                <img className="CaptionImage" src={vdata.thumbnail} />
                                                <h2 style={{margin: '15px 20px 5px 20px', fontSize: '15pt',}}>
                                                    {vdata.info.english_name}
                                                </h2>
                                                {vdata.info.language ==='English' ? (
                                                    null
                                                    ) : (
                                                    <div style={{margin: '2px 20px 8px 20px', fontSize: '10pt'}}>
                                                        {vdata.info.original_name}
                                                    </div>
                                                )}
                                                <div
                                                    style={{display: 'flex', fontSize: '10pt'}}>
                                                    <div style={{margin:'0 0 20px 20px'}}>
                                                        {vdata.info.year}&nbsp;|&nbsp;
                                                    </div>
                                                    <div style={{margin:'0 0 20px 0'}}>
                                                        <div style={{margin:'0 0 20px 0'}}>
                                                            {`${parseInt(vdata.info.duration / 60,)}h ${vdata.info.duration % 60}m`}
                                                        </div>
                                                    </div>
                                                    &nbsp;|&nbsp;
                                                    <img height="20px" src={getMovieRating(vdata.info.age)}/>
                                                </div>
                                                <div style={{ display: 'flex' }}>
                                                    <a
                                                        href="#"
                                                        onClick={() => playVideo(vdata)}
                                                        style={{
                                                            marginLeft: '20px',
                                                            cursor: 'pointer',
                                                            backgroundColor: '#2a2a2a',
                                                            height: '40px',
                                                            width: '40px',
                                                            objectFit: 'cover',
                                                            borderRadius: '50%',
                                                            border: 'none',
                                                            outline: 'none',
                                                        }}>
                                                        <svg
                                                            style={{
                                                                paddingTop: '10px',
                                                                paddingLeft: '10px',
                                                                width: '20px',
                                                                height: '20px',
                                                            }}
                                                            viewBox="0 0 24 24">
                                                            <path d="M6 4l15 8-15 8z" fill="currentColor" /> 
                                                        </svg>
                                                    </a>
                                                    <button
                                                        className="InfoButton"
                                                        onClick={() => addMyList(vdata)}
                                                        style={{
                                                            position: 'relative',
                                                            border: '2px solid white',
                                                            marginLeft: '20px',
                                                            cursor: 'pointer',
                                                            backgroundColor: '#2a2a2a',
                                                            height: '40px',
                                                            width: '40px',
                                                            objectFit: 'cover',
                                                            borderRadius: '50%',
                                                            border: 'none',
                                                            outline: 'none',
                                                        }}>
                                                        <div className="InfoButtonHover">
                                                            <div style={{marginTop:'8px',fontWeight:'bolder',fontSize:'14pt',}}>
                                                                Add to My List
                                                            </div>
                                                        </div>
                                                        <svg
                                                            style={{
                                                                color: 'white',
                                                                paddingTop: '2px',
                                                                width: '20px',
                                                                height: '20px',
                                                            }}
                                                            viewBox="0 0 24 24">
                                                            <path d="M13 11h8v2h-8v8h-2v-8H3v-2h8V3h2v8z" fill="currentColor"/>
                                                        </svg>
                                                    </button>
                                                    <button
                                                        className="InfoButton"
                                                        onClick={() => addLikeVideo(vdata)}
                                                        style={{
                                                            position: 'relative',
                                                            marginLeft: '20px',
                                                            cursor: 'pointer',
                                                            backgroundColor: '#2a2a2a',
                                                            height: '40px',
                                                            width: '40px',
                                                            objectFit: 'cover',
                                                            borderRadius: '50%',
                                                            border: 'none',
                                                            outline: 'none',
                                                        }}>
                                                        <div className="InfoButtonHover">
                                                            <div
                                                                style={{
                                                                    marginTop: '8px',
                                                                    fontWeight: 'bolder',
                                                                    fontSize:'14pt',
                                                                }}>
                                                                I like this
                                                            </div>
                                                        </div>
                                                        <svg
                                                            style={{
                                                                color: 'white',
                                                                paddingTop: '2px',
                                                                width: '20px',
                                                                height: '20px',
                                                            }}
                                                            viewBox="0 0 24 24" >
                                                            <path d="M15.167 8.994h3.394l.068.023c1.56.138 2.867.987 2.867 2.73 0 .275-.046.527-.092.78.367.435.596.986.596 1.72 0 .963-.39 1.52-1.032 1.978.023.183.023.252.023.39 0 .963-.39 1.784-1.009 2.243.023.206.023.275.023.39 0 1.743-1.33 2.591-2.89 2.73L12.21 22c-2.04 0-3.05-.252-4.563-.895-.917-.39-1.353-.527-2.27-.619L4 20.371v-8.234l2.476-1.445 2.27-4.427c0-.046.085-1.552.253-4.52l.871-.389c.092-.069.275-.138.505-.184.664-.206 1.398-.252 2.132 0 1.261.436 2.064 1.537 2.408 3.258.142.829.226 1.695.26 2.564l-.008 2zm-4.42-2.246l-2.758 5.376L6 13.285v5.26c.845.113 1.44.3 2.427.72 1.37.58 2.12.735 3.773.735l4.816-.023c.742-.078.895-.3 1.015-.542.201-.4.201-.876 0-1.425.558-.184.917-.479 1.078-.883.182-.457.182-.966 0-1.528.601-.228.901-.64.901-1.238s-.202-1.038-.608-1.32c.23-.46.26-.892.094-1.294-.168-.404-.298-.627-1.043-.738l-.172-.015h-5.207l.095-2.09c.066-1.448-.009-2.875-.216-4.082-.216-1.084-.582-1.58-1.096-1.758-.259-.09-.546-.086-.876.014-.003.06-.081 1.283-.235 3.67z" fill="currentColor"/>
                                                        </svg>
                                                    </button>
                                                    <button
                                                        className="InfoButton"
                                                        onClick={() => addDislikeVideo(vdata)}
                                                        style={{
                                                            position: 'relative',
                                                            marginLeft: '20px',
                                                            cursor: 'pointer',
                                                            backgroundColor: '#2a2a2a',
                                                            height: '40px',
                                                            width: '40px',
                                                            objectFit: 'cover',
                                                            borderRadius: '50%',
                                                            border: 'none',
                                                            outline: 'none',
                                                        }}>
                                                        <div className="InfoButtonHover">
                                                            <div
                                                                style={{
                                                                    marginTop: '8px',
                                                                    fontWeight: 'bolder',
                                                                    fontSize:'14pt',
                                                                }}>
                                                                Not for me
                                                            </div>
                                                        </div>
                                                        <svg
                                                            style={{
                                                                color: 'white',
                                                                paddingTop:'2px',
                                                                width: '20px',
                                                                height: '20px',
                                                            }}
                                                            viewBox="0 0 24 24">
                                                            <path d="M8.833 15.006H5.44l-.068-.023c-1.56-.138-2.867-.987-2.867-2.73 0-.275.046-.527.092-.78C2.23 11.038 2 10.487 2 9.753c0-.963.39-1.52 1.032-1.978-.023-.183-.023-.252-.023-.39 0-.963.39-1.784 1.009-2.243-.023-.206-.023-.275-.023-.39 0-1.743 1.33-2.591 2.89-2.73L11.79 2c2.04 0 3.05.252 4.563.895.917.39 1.353.527 2.27.619L20 3.629v8.234l-2.476 1.445-2.27 4.427c0 .046-.085 1.552-.253 4.52l-.871.389c-.092.069-.275.138-.505.184-.664.206-1.398.252-2.132 0-1.261-.436-2.064-1.537-2.408-3.258a19.743 19.743 0 0 1-.26-2.564l.008-2zm4.42 2.246l2.758-5.376L18 10.715v-5.26c-.845-.113-1.44-.3-2.427-.72C14.203 4.156 13.453 4 11.8 4l-4.816.023c-.742.078-.895.3-1.015.542-.201.4-.201.876 0 1.425-.558.184-.917.479-1.078.883-.182.457-.182.966 0 1.528-.601.228-.901.64-.901 1.238s.202 1.038.608 1.32c-.23.46-.26.892-.094 1.294.168.404.298.627 1.043.738l.172.015h5.207l-.095 2.09c-.066 1.448.009 2.875.216 4.082.216 1.084.582 1.58 1.096 1.758.259.09.546.086.876-.014.003-.06.081-1.283.235-3.67z" fill="currentColor"/>
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                'Loading..'
                            )}
                        </div>
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
                                                        fill-rule="evenodd"
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
