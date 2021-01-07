import React from 'react';
import url from '../BaseUrl/BaseUrl';
import { useState } from 'react';

const LogInHandler = async (payload) => {

    try {

        const result = await fetch(url("api/logInApi"), {
            "method": "POST",
            "headers": {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }, body: JSON.stringify(payload)
        }).then(res => res.json());
        if (await result) {
            //console.log(result);
            return result;
        }

    } catch (e) {
        return e;
    }
}

export default LogInHandler;