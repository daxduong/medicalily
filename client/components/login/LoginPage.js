import React, {Component} from 'react';
import {Container, Content, Form, Item, Input, Button} from 'native-base';
import {StyleSheet, Text} from "react-native";
import axios from 'axios';
import env from '../config';

const buttonStyle = {
        width: 100,
        alignSelf: 'center',
        justifyContent: 'center',
        marginTop: 50,
        backgroundColor: 'orange'
    };

export default class LoginPage extends Component {

    constructor() {
        super();
        this.state = {
            email: null,
            password: null
        };
    }

    onButtonPress = () => {
        let thisObj = this;
        axios.post(env.URL + '/user/login', {
           username: this.state.email,
           password: this.state.password
        }).then(res => {
            console.log(JSON.stringify(res.data.token));
            if (res.data.token) {
                thisObj.props.set_token(res.data.token);
            }
        });
    }

    render() {
        return (
            <Container style={{width: '50%', textAlign: 'center', backgroundColor: 'white'}}>
                <Content style={{textAlign: 'center', marginTop: 200}}>
                    <Form>
                        <Item>
                            <Input value={this.state.email}
                                   placeholder="Email"
                                   onChangeText={val => this.setState({ email: val })}/>
                        </Item>
                        <Item last style={{marginTop: 10}}>
                            <Input value={this.state.password}
                                   placeholder="Password"
                                   onChangeText={val => this.setState({ password: val })}/>
                        </Item>
                    </Form>
                    <Button style={buttonStyle} onPress={this.onButtonPress}>
                        <Text>Submit</Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}