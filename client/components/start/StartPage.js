import React, {Component} from 'react';
import {Container, Content, Form, Item, Input, Button} from 'native-base';
import {StyleSheet, Text} from "react-native";
import axios from "axios";

const buttonStyle = {
    width: 100,
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 50,
    backgroundColor: 'orange'
};

export default class StartPage extends Component {

    constructor() {
        super();
    }

    onLoginButtonPress = () => {
        this.props.set_page('login');
    }

    onSignUpButtonPress = () => {
        this.props.set_page('signup');
    }

    render() {
        return (
            <Container style={{width: '50%', textAlign: 'center', backgroundColor: 'white'}}>
                <Content style={{textAlign: 'center', marginTop: 200}}>
                    <Text>Start Page</Text>
                    <Button style={buttonStyle} onPress={this.onLoginButtonPress}>
                        <Text>Log In</Text>
                    </Button>
                    <Button style={buttonStyle} onPress={this.onSignUpButtonPress}>
                        <Text>Sign Up</Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}