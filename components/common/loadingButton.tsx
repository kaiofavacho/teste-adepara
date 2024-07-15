// LoadingButton.js
import React, { useState } from 'react';
import { TouchableOpacity, Text, ActivityIndicator, StyleSheet, StyleProp } from 'react-native';

const LoadingButton = ({ onPress, title, style, textStyle, delay = 5000 }: { onPress: Function, title: String, style: any, textStyle: any, delay: number }) => {
    const [loading, setLoading] = useState(false);

    const handlePress = async () => {
        setLoading(true);
        setTimeout(async () => {
            await onPress();
            setLoading(false);
        }, delay);
    };

    return (
        <TouchableOpacity
            style={[styles.button, style, loading && styles.buttonDisabled]}
            onPress={handlePress}
            disabled={loading}
        >
            {loading ? <ActivityIndicator color="#FFFFFF" /> : <Text style={[styles.buttonText, textStyle]}>{title}</Text>}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#00CC00',
        width: '100%',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 20,
    },
    buttonDisabled: {
        backgroundColor: '#99cc99',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default LoadingButton;
