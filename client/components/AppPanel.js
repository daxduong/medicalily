import React, {Component} from 'react';
import {Container} from 'native-base';
import LoginPage from "./login/LoginPage";
import StartPage from "./start/StartPage";
import HomePage from "./home/HomePage";

export default class AppPanel extends Component {
    constructor() {
        super();
        this.state = {
            page: null,
            token: null
        };
    }

    setPage = (page) => {
        this.setState({
            page
        });
    }

    setToken = (token) => {
        this.setState({
            token
        });
    }

    render() {
        return (
            <Container>
                {
                    this.state.token ?
                    <HomePage/> :
                    this.state.page === 'login' ?
                        <LoginPage set_page={this.setPage} set_token={this.setToken}/> :
                        <StartPage set_page={this.setPage}/>
                }
            </Container>
        );
    }
}