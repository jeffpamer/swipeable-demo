'use strict';

import React from 'react-native'
const {
    Component,
    PanResponder,
    StyleSheet,
    View
} = React;

const Composer = Composee => class Swipeable extends Component {
    constructor(props) {
        super(props)

        this._position = {
            top: 0,
            left: 0
        }

        this._setRef = this._setRef.bind(this)
        this._handlePanResponderMove = this._handlePanResponderMove.bind(this)
        this._handlePanResponderEnd = this._handlePanResponderEnd.bind(this)
    }

    componentWillMount() {
        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: () => true,
            onPanResponderMove: this._handlePanResponderMove,
            onPanResponderEnd: this._handlePanResponderEnd
        })
    }

    _setRef(ref) {
        this.swipeable = ref
    }

    _updatePosition() {
        this.swipeable && this.swipeable.setNativeProps(this._position);
    }

    _handlePanResponderMove(e, gestureState) {
        this.swipeable && this.swipeable.setNativeProps({
            top: this._position.top + gestureState.dy,
            left: this._position.left + gestureState.dx
        })
    }

    _handlePanResponderEnd(e, gestureState) {
        this._position = {
            top: this._position.top + gestureState.dy,
            left: this._position.left + gestureState.dx
        }
    }

    render() {
        return (
            <View ref={this._setRef} {...this._panResponder.panHandlers}>
                <Composee {...this.props} />
            </View>
        )
    }
}

Composer.defaultProps

export default Composer
