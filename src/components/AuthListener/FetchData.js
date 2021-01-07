import react from 'react';
import getCookie from '../Cookies/GetCookie';
import url from '../BaseUrl/BaseUrl';

// fetch data from back with all crud operations
const FetchData = async (apiController, payload, method) => {
    try {
        const XSRFToken = getCookie('XSRF-TOKEN');
        const token = getCookie('token');

        let second_parametar = {};

        const first__parametar = url(apiController).toString();;
        if (method === "POST") {
            second_parametar = {
                "method": `${method}`,
                "headers": {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                    'X-XSRF-TOKEN': XSRFToken,
                }, body: JSON.stringify(payload)
            };
        } else if (method === "GET") {
            second_parametar = {
                "method": `${method}`,
                "headers": {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                    'X-XSRF-TOKEN': XSRFToken,
                }
            };
        } else if (method === "FORGERY") {
            second_parametar = {
                "method": `${method}`,
                "headers": {
                    'Authorization': `Bearer ${token}`,
                    'X-XSRF-TOKEN': XSRFToken,
                }
            };
        }

        const result = await fetch(first__parametar, second_parametar)
            .then(res => {
                if (res.ok) {
                    return res.json()
                } else if (res.status >= 500) {
                    throw new Error("Server error")
                } else if (res.status == 400) {
                    throw new Error("Invalid data")
                } else if (res.status == 404) {
                    throw new Error("Not found");
                }
            })
            .catch(err => {
                const error = {
                    error: err
                }
                return error;
            });

        if (await result) {
            //console.log(result);
            return result;
        }

    } catch (e) {
        const error = {
            error: e
        }
        return error;
    }
}

export default FetchData;