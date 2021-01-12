import React from 'react';

const SelectedUser = ({ data, index, setSelectedUser, gameModeHandler, playAgainHub  }) => {
    const select = () => {
        //setSelectedUser(data.userName);
        gameModeHandler(true, data.userName);
    }

    return <tr onClick={select} >
        <td >{index + 1}</td>
        <td >{data.userName}</td>
    </tr>

}

export default SelectedUser;