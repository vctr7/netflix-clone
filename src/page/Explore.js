import React from 'react';
import Header from '../component/Header';

function Explore({ logoUrl, user, userImgUrl }) {
    return (
        <div>
            <Header location={"explore"} logoUrl={logoUrl} user={user} userImgUrl={userImgUrl} />
            <div>Explore Page</div>
            <div>Explore Page</div>
            <div>Explore Page</div>
            <div>Explore Page</div>
            <div>Explore Page</div>
        </div>
    );
}

export default Explore;
