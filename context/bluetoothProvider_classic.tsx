// import React, { createContext, useContext, useState, ReactNode } from 'react';
// import { BluetoothDevice } from 'react-native-bluetooth-classic';
// import BluetoothService from '@/services/bluetoothService';
// interface BluetoothContextProps {
//     connectedDevice: BluetoothDevice | null;
//     setConnectedDevice: (device: BluetoothDevice | null) => void;
//     initializeBluetooth: () => Promise<void>;
//     listPairedDevices: () => Promise<BluetoothDevice[]>;
//     listConnectedDevices: () => Promise<BluetoothDevice[]>;
//     connectToDevice: (id: string) => Promise<void>;
//     disconnectFromDevice: () => Promise<void>;
//     startScan: () => Promise<BluetoothDevice[]>;
//     startListeningForData: () => Promise<void>;
//     getTagData: () => string | null;
// }

// const BluetoothContext = createContext<BluetoothContextProps | undefined>(undefined);

// export const BluetoothProvider = ({ children }: { children: ReactNode }) => {
//     const [connectedDevice, setConnectedDevice] = useState<BluetoothDevice | null>(null);

//     const initializeBluetooth = BluetoothService.initialize;
//     const listPairedDevices = BluetoothService.listPairedDevices;
//     const listConnectedDevices = BluetoothService.listConnectedDevices;
//     const connectToDevice = async (id: string) => {
//         const device = await BluetoothService.connectToDevice(id);
//         setConnectedDevice(device);
//     };
//     const disconnectFromDevice = async () => {
//         if (connectedDevice) {
//             await BluetoothService.disconnectFromDevice(connectedDevice.id);
//             setConnectedDevice(null);
//         }
//     };
//     const startScan = BluetoothService.startScan;
//     const startListeningForData = BluetoothService.startListeningForData;
//     const getTagData = BluetoothService.getTagData;

//     return (
//         <BluetoothContext.Provider value={{
//             connectedDevice,
//             setConnectedDevice,
//             initializeBluetooth,
//             listPairedDevices,
//             listConnectedDevices,
//             connectToDevice,
//             disconnectFromDevice,
//             startScan,
//             startListeningForData,
//             getTagData
//         }}>
//             {children}
//         </BluetoothContext.Provider>
//     );
// };

// export const useBluetooth = () => {
//     const context = useContext(BluetoothContext);
//     if (!context) {
//         throw new Error('useBluetooth must be used within a BluetoothProvider');
//     }
//     return context;
// };
