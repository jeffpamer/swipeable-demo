'use strict';

import React from 'react-native'
const {
    AppRegistry,
    Component,
    StyleSheet,
    View
} = React;

import Card from './card'

class SwipeableDemo extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <Card style={styles.card} />
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
    card: {
        flex: 1,
        width: 275,
        height: 275,
        backgroundColor: 'red',
    }
});

AppRegistry.registerComponent('swipeableDemo', () => SwipeableDemo);
