// Loading.js
import { Assets } from '@/assets/assets';
import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

const LoadingLogo = () => {
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const fadeIn = () => {
            Animated.sequence([
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true,
                }),
                Animated.timing(fadeAnim, {
                    toValue: 0,
                    duration: 1000,
                    useNativeDriver: true,
                }),
            ]).start(() => fadeIn());
        };

        fadeIn();
    }, [fadeAnim]);

    return (
        <View style={styles.container}>
            <Animated.Image
                source={Assets.logoAdepara2}
                style={[styles.image, { opacity: fadeAnim }]}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 100,
        height: 100,
    },
});

export default LoadingLogo;
