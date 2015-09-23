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
        // Set start x/y point for animation
        this.state.pan.setValue({x: gestureState.dx, y: gestureState.dy});

        // Undo position changes we made through nativeProps
        // (because the animation takes over from here)
        this.swipeable.setNativeProps({top: 0, left: 0})

        // Spring back to the center
        Animated.spring(this.state.pan, {
            friction: 7,
            tension: 55,
            toValue: { x: 0, y: 0 }
        }).start()
    }

    render() {
        return (
            <Animated.View
                ref={this._setRef}
                style={{transform: this.state.pan.getTranslateTransform()}}
                {...this._panResponder.panHandlers}
            >
                <Composee {...this.props} />
            </Animated.View>
        )
    }
}

Composer.defaultProps

export default Composer
