import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import BluetoothService from '@/services/bluetoothService';
import Colors from '@/constants/colors';
import logger from '@/utils/logger';
import { BluetoothDevice } from '@/services/contracts/iBluetoothService';

const DevicesScreen = () => {
    const [connectedDevices, setConnectedDevices] = useState<BluetoothDevice[]>([]);

    useEffect(() => {
        const fetchConnectedDevices = async () => {
            try {
                const connectedDevices = await BluetoothService.listConnectedDevices();
                setConnectedDevices(connectedDevices.map(device => ({ id: device.id, name: device.name ?? 'Unknown Device' })));
            } catch (error) {
                logger.log(`Error fetching connected devices: ${error}`);
            }
        };

        fetchConnectedDevices();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Connected Devices</Text>
            <FlatList
                data={connectedDevices}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.connectedDeviceItem}>
                        <Text style={styles.connectedDeviceName}>{item.name}</Text>
                    </View>
                )}
                contentContainerStyle={styles.deviceList}
            />
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
    deviceList: {
        padding: 16,
    },
    connectedDeviceItem: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    connectedDeviceName: {
        fontSize: 18,
    },
});

export default DevicesScreen;
