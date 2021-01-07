import React from 'react';
import url from '../BaseUrl/BaseUrl';

const RegAuth = async (payload) => {
    try {
        const result = await fetch(url("api/registerApi"), {
            "method": "POST",
            "headers": {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }, body: JSON.stringify(payload)
        })
            .then(res => res.json());
        if (await result) {
            return result;
        }

    } catch (e) {
        return e
    }
}

export default RegAuth;