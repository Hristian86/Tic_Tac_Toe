import React from 'react';

const propsy = (props) => {

    if (props) {
        //console.log(props.displayName);
        return <div>
            hello {props.displayName}
        </div>
    } else {
        return <div><em>Loading...</em></div>
    }
}

export default propsy;