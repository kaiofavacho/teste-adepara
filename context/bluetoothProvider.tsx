import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Device } from 'react-native-ble-plx';
import BluetoothService from '@/services/bluetoothService';

interface BluetoothContextProps {
    connectedDevice: Device | null;
    setConnectedDevice: (device: Device | null) => void;
    initializeBluetooth: () => Promise<void>;
    listPairedDevices: () => Promise<Device[]>;
    listConnectedDevices: () => Promise<Device[]>;
    connectToDevice: (id: string) => Promise<void>;
    disconnectFromDevice: () => Promise<void>;
    startScan: () => Promise<Device[]>;
    startListeningForData: () => Promise<void>;
    getTagData: () => string | null;
}

const BluetoothContext = createContext<BluetoothContextProps | undefined>(undefined);

export const BluetoothProvider = ({ children }: { children: ReactNode }) => {
    const [connectedDevice, setConnectedDevice] = useState<Device | null>(null);

    const initializeBluetooth = BluetoothService.initialize;
    const listPairedDevices = BluetoothService.listPairedDevices;
    const listConnectedDevices = BluetoothService.listConnectedDevices;
    const connectToDevice = async (id: string) => {
        const device = await BluetoothService.connectToDevice(id);
        setConnectedDevice(device);
    };
    const disconnectFromDevice = async () => {
        if (connectedDevice) {
            await BluetoothService.disconnectFromDevice(connectedDevice.id);
            setConnectedDevice(null);
        }
    };
    const startScan = BluetoothService.startScan;
    const startListeningForData = BluetoothService.startListeningForData;
    const getTagData = BluetoothService.getTagData;

    return (
        <BluetoothContext.Provider value={{
            connectedDevice,
            setConnectedDevice,
            initializeBluetooth,
            listPairedDevices,
            listConnectedDevices,
            connectToDevice,
            disconnectFromDevice,
            startScan,
            startListeningForData,
            getTagData
        }}>
            {children}
        </BluetoothContext.Provider>
    );
};

export const useBluetooth = () => {
    const context = useContext(BluetoothContext);
    if (!context) {
        throw new Error('useBluetooth must be used within a BluetoothProvider');
    }
    return context;
};
