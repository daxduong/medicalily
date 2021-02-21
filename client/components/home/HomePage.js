import React, {Component} from 'react';
import {Container, Content, Form, Item, Input, Button} from 'native-base';
import {StyleSheet, Text} from "react-native";

export default class HomePage extends Component {

    constructor() {
        super();
    }

    render(){
        return(
            <Container style={{width: '50%', textAlign: 'center', backgroundColor: 'white'}}>
                <Content style={{textAlign: 'center', marginTop: 200}}>
                    <Text>Home Page</Text>
                </Content>
            </Container>
        );
    }
}