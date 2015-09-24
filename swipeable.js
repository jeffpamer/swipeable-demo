'use strict';

import React from 'react-native'
const {
    Animated,
    Component,
    Dimensions,
    PanResponder,
    StyleSheet,
    View
} = React;

const { width, height } = Dimensions.get('window')
const swipeThreshhold = width * 0.33

const SwipeableComposer = Composee => class Swipeable extends Component {
    constructor(props) {
        super(props)

        this.state = {
            pan: new Animated.ValueXY()
        }

        this._setRef = this._setRef.bind(this)
        this._handlePanResponderGrant = this._handlePanResponderGrant.bind(this)
        this._handlePanResponderMove = this._handlePanResponderMove.bind(this)
        this._handlePanResponderEnd = this._handlePanResponderEnd.bind(this)
    }

    componentWillMount() {
        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: () => true,
            onPanResponderGrant: this._handlePanResponderGrant,
            onPanResponderMove: Animated.event([null, {dx: this.state.pan.x, dy: this.state.pan.y}]),
            onPanResponderEnd: this._handlePanResponderEnd
        })

        this._onSwipeLeft = this.props.onSwipeLeft || Function.prototype
        this._onSwipeRight = this.props.onSwipeRight || Function.prototype
        this._onSwipe = this.props.onSwipe || Function.prototype
    }

    _setRef(ref) {
        this.swipeable = ref
    }

    _updatePosition() {
        this.swipeable && this.swipeable.setNativeProps(this._position);
    }

    _handlePanResponderGrant(e, gestureState) {
        this.state.pan.setOffset({x: this.state.pan.x._value, y: this.state.pan.y._value});
        this.state.pan.setValue({x: 0, y: 0});
    }

    _handlePanResponderMove(e, gestureState) {
        this.swipeable && this.swipeable.setNativeProps({
            top: this._position.top + gestureState.dy,
            left: this._position.left + gestureState.dx
        })
    }

    _handlePanResponderEnd(e, {vx, vy}) {
        this.state.pan.flattenOffset()

        if (Math.abs(this.state.pan.x._value) > swipeThreshhold) {
            let velocity = clamp(Math.abs(vx), 3, 5)

            if (vx < 0) {
                velocity *= -1;
                this._onSwipeLeft()
            } else {
                this._onSwipeRight()
            }

            Animated.decay(this.state.pan, {
                velocity: {x: velocity, y: vy},
                deceleration: 0.99
            }).start(this._onSwipe)
        } else {
            Animated.spring(this.state.pan, {
                friction: this.props.friction || 7,
                tension: this.props.tenstion || 55,
                toValue: { x: 0, y: 0 }
            }).start()
        }
    }

    render() {
        let transform = this.state.pan.getTranslateTransform()
        transform.push({
            rotate: this.state.pan.x.interpolate({
                inputRange: [-200, 0, 200],
                outputRange: ["-33deg", "0deg", "33deg"]
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

const clamp = function(x, min, max) {
    if (x < min) return min
    if (x > max) return max
    return x
}

export default SwipeableComposer
