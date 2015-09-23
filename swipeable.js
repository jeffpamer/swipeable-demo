'use strict';

import React from 'react-native'
const {
    Animated,
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

        this.state = {
            pan: new Animated.ValueXY()
        }

        this._setRef = this._setRef.bind(this)
        this._handlePanResponderMove = this._handlePanResponderMove.bind(this)
        this._handlePanResponderEnd = this._handlePanResponderEnd.bind(this)
    }

    componentWillMount() {
        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: () => true,
            onPanResponderMove: Animated.event([null, {dx: this.state.pan.x, dy: this.state.pan.y}]),
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
        // Spring back to the center
        Animated.spring(this.state.pan, {
            tension: 55, // Slightly faster than default
            toValue: { x: 0, y: 0 }
        }).start()
    }

    render() {
        let transform = this.state.pan.getTranslateTransform()
        transform.push({
            rotate: this.state.pan.x.interpolate({
                inputRange: [-200, 0, 200],
                outputRange: ["-30deg", "0deg", "30deg"]
            })
        })

        return (
            <Animated.View
                ref={this._setRef}
                style={{transform: transform}}
                {...this._panResponder.panHandlers}
            >
                <Composee {...this.props} />
            </Animated.View>
        )
    }
}

Composer.defaultProps

export default Composer
