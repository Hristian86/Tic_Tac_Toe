import React, { useState } from 'react';
import { useEffect } from 'react';
import FetchData from '../AuthListener/FetchData';
import SelectedUser from './SelectedUser';
import getCookie from '../Cookies/GetCookie';
import { Link } from 'react-router-dom';

const GameMode = ({ gameModeHandler }) => {
    const user = getCookie('user');

    const [onlineUserList, setOnlineUserList] = useState({
        users: [],
    });

    const [selectedUser, setSelectedUser] = useState("");
    const [multiOption, setMultiOption] = useState(false);

    useEffect(() => {
        const getData = async () => {
            const result = await FetchData("api/getUsers", null, "GET");
            if (result.error || result.errors) {

            } else {
                console.log(result);
                setOnlineUserList({
                    users: result
                })
            }
        }

        getData();
    }, [])

    const singlePlayer = () => {
        gameModeHandler(false, null);
    }

    return <div className="options__intro">

        <div className="text-center">
            <button
                className="btn btn-primary"
                onClick={singlePlayer}
            >SinglePlayer</button>



            {user.length > 0 ? <button
                className="btn btn-danger ml-2"
                onClick={() => setMultiOption(!multiOption)}
            >MultiPlayer</button>
                : <Link
                    to="/AuthO/LogIn"
                ><em className="btn btn-warning ml-2">Please lof in to have online experience</em></Link>}

        </div>

        {multiOption ? <div className="container">

            <table className="table text-center table-hover">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">User name</th>
                    </tr>
                </thead>
                <tbody >

                    {onlineUserList?.users?.map((data, index) => {
                        return <SelectedUser
                            gameModeHandler={gameModeHandler}
                            key={index}
                            setSelectedUser={setSelectedUser}
                            index={index}
                            data={data} />
                    })}

                </tbody>
            </table>

        </div> : null}

    </div>
}

export default GameMode;