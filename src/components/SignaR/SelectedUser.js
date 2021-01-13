import React from 'react';

const SelectedUser = ({ data, index, setSelectedUser, gameModeHandler, playAgainHub  }) => {
    const select = () => {
        //setSelectedUser(data.userName);
        gameModeHandler(true, data[1][0]);
    }

    return <tr onClick={select} >
        <td >{index + 1}</td>
        <td >{data[1][0]}</td>
    </tr>

}

export default SelectedUser;