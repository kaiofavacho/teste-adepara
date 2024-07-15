import React, { useContext } from 'react';
import { View, Text, ScrollView, StyleSheet, Button } from 'react-native';
import Colors from '@/constants/colors';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { Alert } from 'react-native';
import { LogContext } from '@/context/logContext';

const LogsScreen = () => {
    const logContext = useContext(LogContext);

    if (!logContext) {
        return null;
    }

    const { logs } = logContext;

    const handleShare = async () => {
        const logText = logs.join('\n');
        const fileUri = `${FileSystem.documentDirectory}logs.txt`;

        await FileSystem.writeAsStringAsync(fileUri, logText);

        if (await Sharing.isAvailableAsync()) {
            await Sharing.shareAsync(fileUri);
        } else {
            Alert.alert('Sharing is not available on your platform');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Logs</Text>
            <ScrollView style={styles.scrollView}>
                {logs.map((log, index) => (
                    <Text key={index} style={styles.logText}>{log}</Text>
                ))}
            </ScrollView>
            <Button title="Share Logs" onPress={handleShare} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    scrollView: {
        flex: 1,
        marginBottom: 16,
    },
    logText: {
        fontSize: 14,
        marginBottom: 8,
        color: '#333',
    },
});

export default LogsScreen;
