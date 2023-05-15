import { StyleSheet, Text, View, Image } from 'react-native'
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    useAnimatedGestureHandler,
    withSpring
} from 'react-native-reanimated'
import React from 'react'
import { PanGestureHandler, TapGestureHandler } from 'react-native-gesture-handler';

// This Animated library works by looking at the style props
// of the component and determines which value is animated or 
// is to be animated.
const AnimatedImage = Animated.createAnimatedComponent(Image);
const AnimatedView = Animated.createAnimatedComponent(View);

const EmojiSticker = ({ imageSize, stickerSource }) => {
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);

    const containerStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: translateX.value },
                { translateY: translateY.value }
            ]
        }
    });

    const scaleImage = useSharedValue(imageSize);
    const scaleImageV2 = imageSize;
    const onDoubleTap = useAnimatedGestureHandler({
        onActive: () => {
            console.log(imageSize, scaleImage.value);
            if (scaleImage.value) {
                
                scaleImage.value = scaleImage.value >= 320 ?  scaleImage.value : scaleImage.value * 2;
            }
            console.log(imageStyle)
            // if (scaleImageV2) {
            //     scaleImageV2 = imageSize * 2;
            // }
        }
    });

    const imageStyle = useAnimatedStyle(() => {
        return {
            width: withSpring(scaleImage.value),
            height: withSpring(scaleImage.value)
        }
    });

    const onDrag = useAnimatedGestureHandler({
        onStart: (event, context) => {
            // Set initial values for translateX and translateY
            // Get the current or last position of the translation
            // when the drag isn't active
            context.translateX = translateX.value;
            context.translateY = translateY.value;
            console.log('Start/Stop');
        
        },
        onActive: (event, context) => {
            // Since the values for both are 0 on start
            // when the dragging starts, we need to get the
            // values from event and add to the context values (current position)
            translateX.value = context.translateX + event.translationX;
            translateY.value = context.translateY + event.translationY;
            console.log('Drag');
        }
    }
    );
    return (
        <PanGestureHandler onGestureEvent={onDrag}>
            <AnimatedView style={[containerStyle,{ top: -350 }]}>
                <TapGestureHandler onGestureEvent={onDoubleTap}  numberOfTaps={2}>
                    <AnimatedImage
                        source={stickerSource}
                        resizeMode="contain"
                        style={[imageStyle, { width: imageSize, height: imageSize }]}
                    />
                </TapGestureHandler>
            </AnimatedView>
        </PanGestureHandler>
    )
}

export default EmojiSticker

const styles = StyleSheet.create({})