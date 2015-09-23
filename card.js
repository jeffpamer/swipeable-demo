'use strict';

import React from 'react-native'
const {
    Animated,
    AppRegistry,
    Component,
    PanResponder,
    StyleSheet,
    Text,
    View
} = React;

import Swipeable from './swipeable'

class Card extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={this.props.style}></View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})

export default Swipeable(Card)
