import React, { Component } from 'react';
import GetQuery from '../../QueryService/GetQuery/GetQuery';
import { Redirect } from 'react-router-dom';
import getUserByToken from '../GetUserByToken';
import setCookie from '../../Cookies/SetCookie';
import Logout from '../Logout';

export default class AdminPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            Loading: true,
            user: null,
            procesing: false
        }
    }


    async componentWillUpdate() {
        if (!this.state.loadedProfile) {
            this.setState({
                loadedProfile: true
            });
            await this.getUserProfile();
        }
    }

    getUserProfile = async () => {

        const user = await getUserByToken();
        //console.log(user.error);

        if (await user) {
            if (user.error == "Unauthorized") {
                this.setState({
                    redirect: true
                });
                const resCookies = new Logout();
                resCookies.restartCookies();
            }

            //console.log(user);
            if (await user.displayName) {
                setCookie("cheked", "", 5);
            }
            this.setState({
                user: await user
            })
            //return await user;
        } else {
            this.setState({
                user: null
            });
            const resCookies = new Logout();
            resCookies.restartCookies();
        }
    }

    async componentDidMount() {
        if (this.state.Loading) {
            this.setState({
                Loading: false
            });
            this.getData();
        }
    }

    getData = async () => {
        
        const query = new GetQuery();
        const result = await query.getItems();
        //console.log(result);
        if (await result) {
            //console.log(result);
            if (result.error) {
                if (result.error === "Error while verifying token") {
                    const resCookies = new Logout();
                    resCookies.restartCookies();
                    this.setState({
                        redirect: true
                    });
                    window.location.reload(true);
                }
                this.setState({
                    error: result.error
                });
            } else {
                this.setState({
                    data: result
                });
            }
        }
    }

    render() {
        
        return (
            <div>
                <h1>{this.state.error ? this.state.error : null}</h1>

                {/*<h1>You are logged with <br/>{this.state.user ? this.state.user.email : null}</h1>*/}

                {this.state.redirect ? <Redirect to="/LogIn" /> : null}


                <table className="table table-bordered table-hover" >
                    <thead>
                        <tr>
                            <th className="text-center" scope="col">#</th>
                            <th className="text-center" scope="col">Created on</th>
                            <th className="text-center" scope="col">Email</th>
                            <th className="text-center" scope="col">Code number</th>
                            <th className="text-center" scope="col">Invoice date</th>
                            <th className="text-center" scope="col">Price</th>
                        </tr>
                    </thead>
                    <tbody >
                        {this.state.data ? this.state.data.map((data, index) => {
                            return <tr key={data._id}>
                                <th scope="row">{index + 1}</th>
                                <td>{data.createdOn}</td>
                                <td>{data.email}</td>
                                <td>{data.code}</td>
                                <td>{data.date}</td>
                                <td>{data.price}</td>
                            </tr>
                        })

                            : null
                        }


                    </tbody>
                </table>
            </div>
        )
    }
}