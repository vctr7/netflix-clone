import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Video from '../component/Video';
import Header from '../component/Header';

const Home = ({
    user,
    setUser,
    search,
    setSearch,
    searchResult,
    addMyList,
    addLikeVideo,
    addDislikeVideo,
    getMovieRating,
}) => {
    const [videoInfo, setVideoInfo] = useState(null);
    const [videoTurnOn, setVideoTurnOn] = useState(false);

    const [categories, setCategories] = useState(null);

    let category = [];
    let pageNum = 2;

    const initialFetch = async () => {
        await axios
            .get('api/video/home', { params: { p: 1 } })
            .then((res) => {
                category = [...category, ...res.data];
            })
            .catch((err) => console.log(err));
        setCategories(category);
    };

    const handleScroll = () => {
        const scrollHeight = document.documentElement.scrollHeight;
        const scrollTop = document.documentElement.scrollTop;
        const clientHeight = document.documentElement.clientHeight;

        if (scrollTop + clientHeight >= scrollHeight) {
            moreFetch();
        }
    };

    const moreFetch = async () => {
        await axios
            .get('api/video/home', { params: { p: pageNum } })
            .then((res) => {
                if (res.data === []) {
                    console.log('finish');
                } else {
                    category = [...category, ...res.data];
                    pageNum = pageNum + 1;
                }
            })
            .catch((err) => console.log(err));
        setCategories(category);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    useEffect(() => {
        initialFetch();
        window.scrollTo(0, 0);
    }, []);

    const stopVideo = () => {
        const video = document.getElementById('videoPlayer');
        video.pause();
        setVideoTurnOn(false)
    };

    const playVideo = (vdata) => {
        if (videoTurnOn) {
            setVideoTurnOn(false);
            stopVideo();
        }
        axios
            .post('api/auth/watched', { user, vdata })
            .then((res) => {
                if (res.status === 200) {
                    // console.log('');
                } else {
                    console.log('not error but problem');
                }
            })
            .catch((err) => console.log(err));
        setVideoInfo(vdata);
        setVideoTurnOn(true);
        axios
            .post('api/video/play', { vdata })
            .then((res) => {
                if (res.status === 200) {
                    // console.log('increase');
                } else {
                    console.log('not error but problem');
                }
            })
            .catch((err) => console.log(err));
    };

    return (
        <div className="HomePage">
            {videoTurnOn ? (
                <>
                    <header
                        className="HeaderPlaying"
                        style={{ position: 'fixed', zIndex: '10' }}
                    >
                        <Header path="/success" 
                                page="Home"
                                search={search}
                                setSearch={setSearch}
                                setUser={setUser} />
                    </header>
                    <Video
                        videoInfo={videoInfo}
                        getMovieRating={getMovieRating}
                        stopVideo={stopVideo}
                        
                    />
                </>
            ) : (
                <header style={{ position: 'fixed', zIndex: '10' }}>
                    <Header
                        style={{ backgroundColor: 'black' }}
                        path="/success"
                        page="Home"
                        search={search}
                        setSearch={setSearch}
                        setUser={setUser}
                    />
                </header>
            )}

            <div style={{ paddingTop: '100px' }}>
                {searchResult ? (
                    <div
                        style={{
                            paddingTop: '100px',
                            display: 'grid',
                            gridTemplateColumns: 'repeat(6, 254px)',
                            rowGap: '80px',
                            justifyContent: 'center',
                        }}
                    >
                        {searchResult.map((vdata) => (
                            <div
                                key={vdata._id}
                                className="Item"
                                style={{
                                    position: 'relative',
                                    maxWidth: '250px',
                                    maxHeight: '140px',
                                    cursor: 'pointer',
                                }}
                            >
                                <img
                                    className="video"
                                    style={{
                                        objectFit: 'cover',
                                        borderRadius: '3px',
                                        width: '250px',
                                        height: '140px',
                                    }}
                                    src={vdata.thumbnail}
                                />
                                <div className="Caption">
                                    <img
                                        className="CaptionImage"
                                        src={vdata.thumbnail}
                                    />
                                    <h2
                                        style={{
                                            margin: '15px 20px 5px 20px',
                                            fontSize: '15pt',
                                        }}
                                    >
                                        {vdata.info.english_name}
                                    </h2>
                                    {vdata.info.language ===
                                    'English' ? null : (
                                        <div
                                            style={{
                                                margin: '2px 20px 8px 20px',
                                                fontSize: '10pt',
                                            }}
                                        >
                                            {vdata.info.original_name}
                                        </div>
                                    )}
                                    <div
                                        style={{
                                            display: 'flex',
                                            fontSize: '10pt',
                                        }}
                                    >
                                        <div
                                            style={{ margin: '0 0 20px 20px' }}
                                        >
                                            {vdata.info.year}&nbsp;|&nbsp;
                                        </div>
                                        <div style={{ margin: '0 0 20px 0' }}>
                                            <div
                                                style={{ margin: '0 0 20px 0' }}
                                            >
                                                {`${parseInt(
                                                    vdata.info.duration / 60,
                                                )}h ${
                                                    vdata.info.duration % 60
                                                }m`}
                                            </div>
                                        </div>
                                        &nbsp;|&nbsp;
                                        <img
                                            height="20px"
                                            src={getMovieRating(vdata.info.age)}
                                        />
                                    </div>
                                    <div style={{ display: 'flex' }}>
                                        <a
                                            className="InfoButton"
                                            href="#"
                                            style={{
                                                backgroundColor: 'white',
                                                width: '37px',
                                                height: '37px',
                                            }}
                                            onClick={() => playVideo(vdata)}
                                        >
                                            <div className="InfoButtonHover">
                                                <div
                                                    style={{
                                                        marginTop: '8px',
                                                        fontWeight: 'bolder',
                                                        fontSize: '14pt',
                                                    }}
                                                >
                                                    Play
                                                </div>
                                            </div>
                                            <div className="TriHover" />
                                            <svg
                                                style={{
                                                    color: 'black',
                                                    paddingTop: '8px',
                                                    paddingLeft: '8px',
                                                    width: '20px',
                                                    height: '20px',
                                                }}
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    d="M6 4l15 8-15 8z"
                                                    fill="currentColor"
                                                />
                                            </svg>
                                        </a>
                                        <button
                                            className="InfoButton"
                                            onClick={() => addMyList(vdata)}
                                        >
                                            <div className="InfoButtonHover">
                                                <div
                                                    style={{
                                                        marginTop: '8px',
                                                        fontWeight: 'bolder',
                                                        fontSize: '14pt',
                                                    }}
                                                >
                                                    {user.data.myList.find(
                                                        (elem) =>
                                                            elem.v_url ===
                                                            vdata.v_url,
                                                    )
                                                        ? 'Delete from My List'
                                                        : 'Add to My List'}
                                                </div>
                                            </div>
                                            <div className="TriHover" />

                                            {user.data.myList.find(
                                                (elem) =>
                                                    elem.v_url === vdata.v_url,
                                            ) ? (
                                                <svg
                                                    style={{
                                                        color: 'white',
                                                        paddingTop: '2px',
                                                        width: '20px',
                                                        height: '20px',
                                                    }}
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        fill="currentColor"
                                                        d="M3.707 12.293l-1.414 1.414L8 19.414 21.707 5.707l-1.414-1.414L8 16.586z"
                                                    ></path>
                                                </svg>
                                            ) : (
                                                <svg
                                                    style={{
                                                        color: 'white',
                                                        paddingTop: '2px',
                                                        width: '20px',
                                                        height: '20px',
                                                    }}
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        d="M13 11h8v2h-8v8h-2v-8H3v-2h8V3h2v8z"
                                                        fill="currentColor"
                                                    />
                                                </svg>
                                            )}
                                        </button>
                                        <button
                                            className="InfoButton"
                                            onClick={() => addLikeVideo(vdata)}
                                        >
                                            <div className="InfoButtonHover">
                                                <div
                                                    style={{
                                                        marginTop: '8px',
                                                        fontWeight: 'bolder',
                                                        fontSize: '14pt',
                                                    }}
                                                >
                                                    I like this
                                                </div>
                                            </div>
                                            <div className="TriHover" />
                                            {user.data.likeVideo.find(
                                                (elem) =>
                                                    elem.v_url === vdata.v_url,
                                            ) ? (
                                                <svg
                                                    style={{
                                                        color: 'white',
                                                        paddingTop: '2px',
                                                        width: '20px',
                                                        height: '20px',
                                                    }}
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        d="M19.583 20.488c0 1.055-.985 1.398-1.764 1.467l-5.798.023c-4.675 0-4.446-1.49-8.021-1.787v-7.173l2.544-1.444 3.094-5.592s.343-4.514.343-4.744c0 0 2.773-1.352 3.484 2.384.687 3.735.206 6.05.068 6.37h6.05c.802.092 1.788.482 1.788 1.559 0 1.031-.986 1.398-1.788 1.444l.62.023c.778.091 1.787.435 1.787 1.49 0 1.076-1.009 1.42-1.788 1.489l-1.214.023c.825.068 1.81.435 1.81 1.49 0 1.03-.985 1.42-1.81 1.466h-1.17c.78.092 1.765.458 1.765 1.512z"
                                                        fill="currentColor"
                                                    ></path>
                                                </svg>
                                            ) : (
                                                <svg
                                                    style={{
                                                        color: 'white',
                                                        paddingTop: '2px',
                                                        width: '20px',
                                                        height: '20px',
                                                    }}
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        d="M15.167 8.994h3.394l.068.023c1.56.138 2.867.987 2.867 2.73 0 .275-.046.527-.092.78.367.435.596.986.596 1.72 0 .963-.39 1.52-1.032 1.978.023.183.023.252.023.39 0 .963-.39 1.784-1.009 2.243.023.206.023.275.023.39 0 1.743-1.33 2.591-2.89 2.73L12.21 22c-2.04 0-3.05-.252-4.563-.895-.917-.39-1.353-.527-2.27-.619L4 20.371v-8.234l2.476-1.445 2.27-4.427c0-.046.085-1.552.253-4.52l.871-.389c.092-.069.275-.138.505-.184.664-.206 1.398-.252 2.132 0 1.261.436 2.064 1.537 2.408 3.258.142.829.226 1.695.26 2.564l-.008 2zm-4.42-2.246l-2.758 5.376L6 13.285v5.26c.845.113 1.44.3 2.427.72 1.37.58 2.12.735 3.773.735l4.816-.023c.742-.078.895-.3 1.015-.542.201-.4.201-.876 0-1.425.558-.184.917-.479 1.078-.883.182-.457.182-.966 0-1.528.601-.228.901-.64.901-1.238s-.202-1.038-.608-1.32c.23-.46.26-.892.094-1.294-.168-.404-.298-.627-1.043-.738l-.172-.015h-5.207l.095-2.09c.066-1.448-.009-2.875-.216-4.082-.216-1.084-.582-1.58-1.096-1.758-.259-.09-.546-.086-.876.014-.003.06-.081 1.283-.235 3.67z"
                                                        fill="currentColor"
                                                    />
                                                </svg>
                                            )}
                                        </button>
                                        <button
                                            className="InfoButton"
                                            onClick={() =>
                                                addDislikeVideo(vdata)
                                            }
                                        >
                                            <div className="InfoButtonHover">
                                                <div
                                                    style={{
                                                        marginTop: '8px',
                                                        fontWeight: 'bolder',
                                                        fontSize: '14pt',
                                                    }}
                                                >
                                                    Not for me
                                                </div>
                                            </div>
                                            <div className="TriHover" />
                                            {user.data.dislikeVideo.find(
                                                (elem) =>
                                                    elem.v_url === vdata.v_url,
                                            ) ? (
                                                <svg
                                                    style={{
                                                        color: 'white',
                                                        paddingTop: '2px',
                                                        width: '20px',
                                                        height: '20px',
                                                    }}
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        d="M4.417 3.512c0-1.055.985-1.398 1.764-1.467l5.798-.023c4.675 0 4.446 1.49 8.021 1.787v7.173l-2.544 1.444-3.094 5.592s-.343 4.514-.343 4.744c0 0-2.773 1.352-3.484-2.384-.687-3.735-.206-6.05-.068-6.37h-6.05c-.802-.092-1.788-.482-1.788-1.559 0-1.031.986-1.398 1.788-1.444l-.62-.023c-.778-.091-1.787-.435-1.787-1.49 0-1.076 1.009-1.42 1.788-1.489l1.214-.023c-.825-.068-1.81-.435-1.81-1.49 0-1.03.985-1.42 1.81-1.466h1.17c-.78-.092-1.765-.458-1.765-1.512z"
                                                        fill="currentColor"
                                                    ></path>
                                                </svg>
                                            ) : (
                                                <svg
                                                    style={{
                                                        color: 'white',
                                                        paddingTop: '2px',
                                                        width: '20px',
                                                        height: '20px',
                                                    }}
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        d="M8.833 15.006H5.44l-.068-.023c-1.56-.138-2.867-.987-2.867-2.73 0-.275.046-.527.092-.78C2.23 11.038 2 10.487 2 9.753c0-.963.39-1.52 1.032-1.978-.023-.183-.023-.252-.023-.39 0-.963.39-1.784 1.009-2.243-.023-.206-.023-.275-.023-.39 0-1.743 1.33-2.591 2.89-2.73L11.79 2c2.04 0 3.05.252 4.563.895.917.39 1.353.527 2.27.619L20 3.629v8.234l-2.476 1.445-2.27 4.427c0 .046-.085 1.552-.253 4.52l-.871.389c-.092.069-.275.138-.505.184-.664.206-1.398.252-2.132 0-1.261-.436-2.064-1.537-2.408-3.258a19.743 19.743 0 0 1-.26-2.564l.008-2zm4.42 2.246l2.758-5.376L18 10.715v-5.26c-.845-.113-1.44-.3-2.427-.72C14.203 4.156 13.453 4 11.8 4l-4.816.023c-.742.078-.895.3-1.015.542-.201.4-.201.876 0 1.425-.558.184-.917.479-1.078.883-.182.457-.182.966 0 1.528-.601.228-.901.64-.901 1.238s.202 1.038.608 1.32c-.23.46-.26.892-.094 1.294.168.404.298.627 1.043.738l.172.015h5.207l-.095 2.09c-.066 1.448.009 2.875.216 4.082.216 1.084.582 1.58 1.096 1.758.259.09.546.086.876-.014.003-.06.081-1.283.235-3.67z"
                                                        fill="currentColor"
                                                    />
                                                </svg>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div>
                        {categories
                            ? categories.map((category, i) => (
                                  <div>
                                      <h2
                                          style={{
                                              color: 'white',
                                              paddingTop: '60px',
                                              paddingLeft: '60px',
                                          }}
                                      >
                                          {Object.keys(category)[0]}
                                      </h2>
                                      <div
                                          key={i}
                                          style={{
                                              display: 'grid',
                                              gridTemplateColumns:
                                                  'repeat(6, 254px)',
                                              rowGap: '80px',
                                              justifyContent: 'center',
                                          }}
                                      >
                                          {Object.values(category)[0].map(
                                              (vdata) => (
                                                  <div
                                                      key={vdata._id}
                                                      className="Item"
                                                      style={{
                                                          position: 'relative',
                                                          maxWidth: '250px',
                                                          maxHeight: '140px',
                                                          cursor: 'pointer',
                                                      }}
                                                  >
                                                      <img
                                                          className="video"
                                                          style={{
                                                              objectFit:
                                                                  'cover',
                                                              borderRadius:
                                                                  '3px',
                                                              width: '250px',
                                                              height: '140px',
                                                          }}
                                                          src={vdata.thumbnail}
                                                      />
                                                      <div className="Caption">
                                                          <img
                                                              className="CaptionImage"
                                                              src={
                                                                  vdata.thumbnail
                                                              }
                                                          />
                                                          <h2
                                                              style={{
                                                                  margin:
                                                                      '15px 20px 5px 20px',
                                                                  fontSize:
                                                                      '15pt',
                                                              }}
                                                          >
                                                              {
                                                                  vdata.info
                                                                      .english_name
                                                              }
                                                          </h2>
                                                          {vdata.info
                                                              .language ===
                                                          'English' ? null : (
                                                              <div
                                                                  style={{
                                                                      margin:
                                                                          '2px 20px 8px 20px',
                                                                      fontSize:
                                                                          '10pt',
                                                                  }}
                                                              >
                                                                  {
                                                                      vdata.info
                                                                          .original_name
                                                                  }
                                                              </div>
                                                          )}
                                                          <div
                                                              style={{
                                                                  display:
                                                                      'flex',
                                                                  fontSize:
                                                                      '10pt',
                                                              }}
                                                          >
                                                              <div
                                                                  style={{
                                                                      margin:
                                                                          '0 0 20px 20px',
                                                                  }}
                                                              >
                                                                  {
                                                                      vdata.info
                                                                          .year
                                                                  }
                                                                  &nbsp;|&nbsp;
                                                              </div>
                                                              <div
                                                                  style={{
                                                                      margin:
                                                                          '0 0 20px 0',
                                                                  }}
                                                              >
                                                                  <div
                                                                      style={{
                                                                          margin:
                                                                              '0 0 20px 0',
                                                                      }}
                                                                  >
                                                                      {`${parseInt(
                                                                          vdata
                                                                              .info
                                                                              .duration /
                                                                              60,
                                                                      )}h ${
                                                                          vdata
                                                                              .info
                                                                              .duration %
                                                                          60
                                                                      }m`}
                                                                  </div>
                                                              </div>
                                                              &nbsp;|&nbsp;
                                                              <img
                                                                  height="20px"
                                                                  src={getMovieRating(
                                                                      vdata.info
                                                                          .age,
                                                                  )}
                                                              />
                                                          </div>
                                                          <div
                                                              style={{
                                                                  display:
                                                                      'flex',
                                                              }}
                                                          >
                                                              <a
                                                                  className="InfoButton"
                                                                  href="#"
                                                                  style={{
                                                                      backgroundColor:
                                                                          'white',
                                                                      width:
                                                                          '37px',
                                                                      height:
                                                                          '37px',
                                                                  }}
                                                                  onClick={() =>
                                                                      playVideo(
                                                                          vdata,
                                                                      )
                                                                  }
                                                              >
                                                                  <div className="InfoButtonHover">
                                                                      <div
                                                                          style={{
                                                                              marginTop:
                                                                                  '8px',
                                                                              fontWeight:
                                                                                  'bolder',
                                                                              fontSize:
                                                                                  '14pt',
                                                                          }}
                                                                      >
                                                                          Play
                                                                      </div>
                                                                  </div>
                                                                  <div className="TriHover" />
                                                                  <svg
                                                                      style={{
                                                                          color:
                                                                              'black',
                                                                          paddingTop:
                                                                              '8px',
                                                                          paddingLeft:
                                                                              '8px',
                                                                          width:
                                                                              '20px',
                                                                          height:
                                                                              '20px',
                                                                      }}
                                                                      viewBox="0 0 24 24"
                                                                  >
                                                                      <path
                                                                          d="M6 4l15 8-15 8z"
                                                                          fill="currentColor"
                                                                      />
                                                                  </svg>
                                                              </a>
                                                              <button
                                                                  className="InfoButton"
                                                                  onClick={() =>
                                                                      addMyList(
                                                                          vdata,
                                                                      )
                                                                  }
                                                              >
                                                                  <div className="InfoButtonHover">
                                                                      <div
                                                                          style={{
                                                                              marginTop:
                                                                                  '8px',
                                                                              fontWeight:
                                                                                  'bolder',
                                                                              fontSize:
                                                                                  '14pt',
                                                                          }}
                                                                      >
                                                                          {user.data.myList.find(
                                                                              (
                                                                                  elem,
                                                                              ) =>
                                                                                  elem.v_url ===
                                                                                  vdata.v_url,
                                                                          )
                                                                              ? 'Delete from My List'
                                                                              : 'Add to My List'}
                                                                      </div>
                                                                  </div>
                                                                  <div className="TriHover" />

                                                                  {user.data.myList.find(
                                                                      (elem) =>
                                                                          elem.v_url ===
                                                                          vdata.v_url,
                                                                  ) ? (
                                                                      <svg
                                                                          style={{
                                                                              color:
                                                                                  'white',
                                                                              paddingTop:
                                                                                  '2px',
                                                                              width:
                                                                                  '20px',
                                                                              height:
                                                                                  '20px',
                                                                          }}
                                                                          viewBox="0 0 24 24"
                                                                      >
                                                                          <path
                                                                              fill="currentColor"
                                                                              d="M3.707 12.293l-1.414 1.414L8 19.414 21.707 5.707l-1.414-1.414L8 16.586z"
                                                                          ></path>
                                                                      </svg>
                                                                  ) : (
                                                                      <svg
                                                                          style={{
                                                                              color:
                                                                                  'white',
                                                                              paddingTop:
                                                                                  '2px',
                                                                              width:
                                                                                  '20px',
                                                                              height:
                                                                                  '20px',
                                                                          }}
                                                                          viewBox="0 0 24 24"
                                                                      >
                                                                          <path
                                                                              d="M13 11h8v2h-8v8h-2v-8H3v-2h8V3h2v8z"
                                                                              fill="currentColor"
                                                                          />
                                                                      </svg>
                                                                  )}
                                                              </button>
                                                              <button
                                                                  className="InfoButton"
                                                                  onClick={() =>
                                                                      addLikeVideo(
                                                                          vdata,
                                                                      )
                                                                  }
                                                              >
                                                                  <div className="InfoButtonHover">
                                                                      <div
                                                                          style={{
                                                                              marginTop:
                                                                                  '8px',
                                                                              fontWeight:
                                                                                  'bolder',
                                                                              fontSize:
                                                                                  '14pt',
                                                                          }}
                                                                      >
                                                                          I like
                                                                          this
                                                                      </div>
                                                                  </div>
                                                                  <div className="TriHover" />
                                                                  {user.data.likeVideo.find(
                                                                      (elem) =>
                                                                          elem.v_url ===
                                                                          vdata.v_url,
                                                                  ) ? (
                                                                      <svg
                                                                          style={{
                                                                              color:
                                                                                  'white',
                                                                              paddingTop:
                                                                                  '2px',
                                                                              width:
                                                                                  '20px',
                                                                              height:
                                                                                  '20px',
                                                                          }}
                                                                          viewBox="0 0 24 24"
                                                                      >
                                                                          <path
                                                                              d="M19.583 20.488c0 1.055-.985 1.398-1.764 1.467l-5.798.023c-4.675 0-4.446-1.49-8.021-1.787v-7.173l2.544-1.444 3.094-5.592s.343-4.514.343-4.744c0 0 2.773-1.352 3.484 2.384.687 3.735.206 6.05.068 6.37h6.05c.802.092 1.788.482 1.788 1.559 0 1.031-.986 1.398-1.788 1.444l.62.023c.778.091 1.787.435 1.787 1.49 0 1.076-1.009 1.42-1.788 1.489l-1.214.023c.825.068 1.81.435 1.81 1.49 0 1.03-.985 1.42-1.81 1.466h-1.17c.78.092 1.765.458 1.765 1.512z"
                                                                              fill="currentColor"
                                                                          ></path>
                                                                      </svg>
                                                                  ) : (
                                                                      <svg
                                                                          style={{
                                                                              color:
                                                                                  'white',
                                                                              paddingTop:
                                                                                  '2px',
                                                                              width:
                                                                                  '20px',
                                                                              height:
                                                                                  '20px',
                                                                          }}
                                                                          viewBox="0 0 24 24"
                                                                      >
                                                                          <path
                                                                              d="M15.167 8.994h3.394l.068.023c1.56.138 2.867.987 2.867 2.73 0 .275-.046.527-.092.78.367.435.596.986.596 1.72 0 .963-.39 1.52-1.032 1.978.023.183.023.252.023.39 0 .963-.39 1.784-1.009 2.243.023.206.023.275.023.39 0 1.743-1.33 2.591-2.89 2.73L12.21 22c-2.04 0-3.05-.252-4.563-.895-.917-.39-1.353-.527-2.27-.619L4 20.371v-8.234l2.476-1.445 2.27-4.427c0-.046.085-1.552.253-4.52l.871-.389c.092-.069.275-.138.505-.184.664-.206 1.398-.252 2.132 0 1.261.436 2.064 1.537 2.408 3.258.142.829.226 1.695.26 2.564l-.008 2zm-4.42-2.246l-2.758 5.376L6 13.285v5.26c.845.113 1.44.3 2.427.72 1.37.58 2.12.735 3.773.735l4.816-.023c.742-.078.895-.3 1.015-.542.201-.4.201-.876 0-1.425.558-.184.917-.479 1.078-.883.182-.457.182-.966 0-1.528.601-.228.901-.64.901-1.238s-.202-1.038-.608-1.32c.23-.46.26-.892.094-1.294-.168-.404-.298-.627-1.043-.738l-.172-.015h-5.207l.095-2.09c.066-1.448-.009-2.875-.216-4.082-.216-1.084-.582-1.58-1.096-1.758-.259-.09-.546-.086-.876.014-.003.06-.081 1.283-.235 3.67z"
                                                                              fill="currentColor"
                                                                          />
                                                                      </svg>
                                                                  )}
                                                              </button>
                                                              <button
                                                                  className="InfoButton"
                                                                  onClick={() =>
                                                                      addDislikeVideo(
                                                                          vdata,
                                                                      )
                                                                  }
                                                              >
                                                                  <div className="InfoButtonHover">
                                                                      <div
                                                                          style={{
                                                                              marginTop:
                                                                                  '8px',
                                                                              fontWeight:
                                                                                  'bolder',
                                                                              fontSize:
                                                                                  '14pt',
                                                                          }}
                                                                      >
                                                                          Not
                                                                          for me
                                                                      </div>
                                                                  </div>
                                                                  <div className="TriHover" />
                                                                  {user.data.dislikeVideo.find(
                                                                      (elem) =>
                                                                          elem.v_url ===
                                                                          vdata.v_url,
                                                                  ) ? (
                                                                      <svg
                                                                          style={{
                                                                              color:
                                                                                  'white',
                                                                              paddingTop:
                                                                                  '2px',
                                                                              width:
                                                                                  '20px',
                                                                              height:
                                                                                  '20px',
                                                                          }}
                                                                          viewBox="0 0 24 24"
                                                                      >
                                                                          <path
                                                                              d="M4.417 3.512c0-1.055.985-1.398 1.764-1.467l5.798-.023c4.675 0 4.446 1.49 8.021 1.787v7.173l-2.544 1.444-3.094 5.592s-.343 4.514-.343 4.744c0 0-2.773 1.352-3.484-2.384-.687-3.735-.206-6.05-.068-6.37h-6.05c-.802-.092-1.788-.482-1.788-1.559 0-1.031.986-1.398 1.788-1.444l-.62-.023c-.778-.091-1.787-.435-1.787-1.49 0-1.076 1.009-1.42 1.788-1.489l1.214-.023c-.825-.068-1.81-.435-1.81-1.49 0-1.03.985-1.42 1.81-1.466h1.17c-.78-.092-1.765-.458-1.765-1.512z"
                                                                              fill="currentColor"
                                                                          ></path>
                                                                      </svg>
                                                                  ) : (
                                                                      <svg
                                                                          style={{
                                                                              color:
                                                                                  'white',
                                                                              paddingTop:
                                                                                  '2px',
                                                                              width:
                                                                                  '20px',
                                                                              height:
                                                                                  '20px',
                                                                          }}
                                                                          viewBox="0 0 24 24"
                                                                      >
                                                                          <path
                                                                              d="M8.833 15.006H5.44l-.068-.023c-1.56-.138-2.867-.987-2.867-2.73 0-.275.046-.527.092-.78C2.23 11.038 2 10.487 2 9.753c0-.963.39-1.52 1.032-1.978-.023-.183-.023-.252-.023-.39 0-.963.39-1.784 1.009-2.243-.023-.206-.023-.275-.023-.39 0-1.743 1.33-2.591 2.89-2.73L11.79 2c2.04 0 3.05.252 4.563.895.917.39 1.353.527 2.27.619L20 3.629v8.234l-2.476 1.445-2.27 4.427c0 .046-.085 1.552-.253 4.52l-.871.389c-.092.069-.275.138-.505.184-.664.206-1.398.252-2.132 0-1.261-.436-2.064-1.537-2.408-3.258a19.743 19.743 0 0 1-.26-2.564l.008-2zm4.42 2.246l2.758-5.376L18 10.715v-5.26c-.845-.113-1.44-.3-2.427-.72C14.203 4.156 13.453 4 11.8 4l-4.816.023c-.742.078-.895.3-1.015.542-.201.4-.201.876 0 1.425-.558.184-.917.479-1.078.883-.182.457-.182.966 0 1.528-.601.228-.901.64-.901 1.238s.202 1.038.608 1.32c-.23.46-.26.892-.094 1.294.168.404.298.627 1.043.738l.172.015h5.207l-.095 2.09c-.066 1.448.009 2.875.216 4.082.216 1.084.582 1.58 1.096 1.758.259.09.546.086.876-.014.003-.06.081-1.283.235-3.67z"
                                                                              fill="currentColor"
                                                                          />
                                                                      </svg>
                                                                  )}
                                                              </button>
                                                          </div>
                                                      </div>
                                                  </div>
                                              ),
                                          )}
                                      </div>
                                  </div>
                              ))
                            : 'Loading'}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
