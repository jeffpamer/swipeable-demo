'use strict';

import React from 'react-native'
const {
    AppRegistry,
    Component,
    Dimensions,
    StyleSheet,
    View
} = React;

import Card from './card'

const { width, height } = Dimensions.get('window')

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
        width: width * 0.75,
        height: width * 0.75,
        backgroundColor: 'red',
    }
});

AppRegistry.registerComponent('swipeableDemo', () => SwipeableDemo);
