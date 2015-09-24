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

        this.state = {
            cards: []
        }

        this.onSwipe = this.onSwipe.bind(this)
        this.replaceCard = this.replaceCard.bind(this)
    }

    componentDidMount() {
        this._cardKey = 0;
        this.replaceCard()
    }

    replaceCard() {
        const randoColor = `#${Math.random().toString(16).slice(2, 8)}`
        this.setState({
            cards: [randoColor]
        })
    }

    onSwipe() {
        this._cardKey++;
        this.replaceCard()
    }

    renderCards() {
        return this.state.cards.map(card => {
            return <Card style={[styles.card, {backgroundColor: card}]} key={this._cardKey} onSwipe={this.onSwipe}/>
        })
    }

    render() {
        return (
            <View style={styles.container}>
                {this.renderCards()}
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
