import React from 'react';
import './Footer.css';

const Video = ({videoInfo, getMovieRating}) => {
    return (
        <div draggable="false" style={{ textAlign: 'center' }}>
            <video
                style={{
                    outline: 'none',
                    objectFit: 'contain',
                    width: '100vw',
                    minHeight: '940px',
                    maxHeight: '940px',
                }}
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
                    textAlign: 'left',
                }}
            >
                {videoInfo.title === 'x' ? (
                    <>
                        <div style={{ fontSize: '40pt' }}>
                            {videoInfo.info.english_name}
                        </div>
                        {videoInfo.info.language === 'English' ? null : (
                            <div style={{ fontSize: '20pt' }}>
                                {videoInfo.info.original_name}
                            </div>
                        )}
                    </>
                ) : (
                    <img
                        draggable="false"
                        style={{ maxWidth: '500px' }}
                        src={videoInfo.title}
                    />
                )}

                <div style={{ marginTop: '20px', display: 'flex' }}>
                    <div>{videoInfo.info.year}</div>
                    <div>&nbsp;|&nbsp;</div>
                    <div>{`${parseInt(videoInfo.info.duration / 60)}h ${videoInfo.info.duration % 60}m`}</div>
                    <div>&nbsp;|&nbsp;</div>
                    <img
                        height="24px"
                        src={getMovieRating(videoInfo.info.age)}
                    />
                </div>

                <div style={{ marginTop: '3px', display: 'flex' }}>
                    <div>{videoInfo.info.country}</div>
                    <div>&nbsp;|&nbsp;</div>
                    <div>{videoInfo.info.language}</div>
                </div>

                <div style={{ marginTop: '20px' }}>
                    <div>Director: {videoInfo.info.director}</div>
                    <div style={{ marginTop: '3px' }}>
                        Cast: {videoInfo.info.actors.join(', ')}
                    </div>
                    <div style={{ marginTop: '3px' }}>
                        Genres: {videoInfo.info.genre.join(', ')}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Video;
