import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Button } from 'react-native';
import BluetoothService from '@/services/bluetoothService';
import Colors from '@/constants/colors';
import logger from '@/utils/logger';

interface BluetoothDevice {
    id: string;
    name: string | null;
}

const ScanScreen = () => {
    const [devices, setDevices] = useState<BluetoothDevice[]>([]);
    const [outputResult, setOutputResult] = useState<string>('');

    const scanForDevices = async () => {
        try {
            const scannedDevices = await BluetoothService.startScan();
            setDevices(scannedDevices.map(device => ({ id: device.id, name: device.name ?? 'Unknown Device' })));
            logger.log("Scan complete");
        } catch (error) {
            logger.log(`Scan error: ${error}`);
        }
    };

    const connectToDevice = async (device: BluetoothDevice) => {
        try {
            await BluetoothService.connectToDevice(device.id);
            logger.log(`Connected to device: ${device.name}`);
        } catch (error) {
            logger.log(`Connection error: ${error}`);
        }
    };

    const readRFID = async () => {
        try {
            await BluetoothService.startListeningForData();
            const data = BluetoothService.getTagData();
            if (data) {
                setOutputResult(data);
                logger.log(`RFID Data received: ${data}`);
            } else {
                logger.log('No RFID data received');
            }
        } catch (error) {
            logger.log(`Read error: ${error}`);
        }
    };

    const renderItem = ({ item }: { item: BluetoothDevice }) => (
        <TouchableOpacity style={styles.deviceItem} onPress={() => connectToDevice(item)}>
            <Text style={styles.deviceName}>{item.name}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Button title="Scan for Devices" onPress={scanForDevices} />
            <FlatList
                data={devices}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                contentContainerStyle={styles.deviceList}
            />
            <Button title="Read RFID" onPress={readRFID} />
            {outputResult ? (
                <View style={styles.resultContainer}>
                    <Text style={styles.resultTitle}>RFID Result:</Text>
                    <Text style={styles.resultText}>{outputResult}</Text>
                </View>
            ) : null}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
        padding: 16,
    },
    deviceList: {
        padding: 16,
    },
    deviceItem: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    deviceName: {
        fontSize: 18,
    },
    resultContainer: {
        marginTop: 16,
    },
    resultTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    resultText: {
        fontSize: 16,
    },
});

export default ScanScreen;
