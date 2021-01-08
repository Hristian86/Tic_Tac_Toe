import React from 'react';
import { useStateValue } from '../ContextApi/StateProvider';
import { GET_ITEMS } from '../ContextApi/Types';

const StateStore = ({ oppnentName, userTurn, cordinates, }) => {
    const [{ fetchData }, dispatch] = useStateValue();

    // Fetching categories data from back end and sending it to the local store.
    const setPlayrMove = () => {
        console.log("adding...");
        dispatch({
            type: GET_ITEMS,
            fetcheData: {
                items: {
                    oppnentName,
                    userTurn,
                    cordinates,
                }
            },
        });
    }


    return <div>

    </div>
}

export default StateStore;