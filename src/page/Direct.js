import React from 'react';
import Header from '../component/Header';


function Direct({logoUrl, user, userImgUrl}) {
    return (
        <div>
            <Header location={"direct"} logoUrl={logoUrl} user={user} userImgUrl={userImgUrl} />
            <div>Direct Page</div>
            <div>Direct Page</div>
            <div>Direct Page</div>
            <div>Direct Page</div>
            <div>Direct Page</div>
        </div>
    );   
}

export default Direct;