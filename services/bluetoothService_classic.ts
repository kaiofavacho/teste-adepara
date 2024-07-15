// import RNBluetoothClassic, { BluetoothDevice } from 'react-native-bluetooth-classic';

// class BluetoothService {
//     connectedDevices: BluetoothDevice[] = [];
//     tagData: string | null = null;

//     constructor() {
//         console.log("BluetoothService initialized");
//     }

//     async initialize() {
//         const enabled = await RNBluetoothClassic.isBluetoothEnabled();
//         if (!enabled) {
//             await RNBluetoothClassic.requestBluetoothEnabled();
//         }
//     }

//     async listPairedDevices(): Promise<BluetoothDevice[]> {
//         try {
//             const pairedDevices = await RNBluetoothClassic.getBondedDevices();
//             console.log('Paired devices:', pairedDevices);
//             return pairedDevices;
//         } catch (error) {
//             console.error('Error listing paired devices:', error);
//             throw error;
//         }
//     }

//     async listConnectedDevices(): Promise<BluetoothDevice[]> {
//         try {
//             const connectedDevices = await RNBluetoothClassic.getConnectedDevices();
//             console.log('Connected devices:', connectedDevices);
//             this.connectedDevices = connectedDevices;
//             return connectedDevices;
//         } catch (error) {
//             console.error('Error listing connected devices:', error);
//             throw error;
//         }
//     }

//     async connectToDevice(id: string): Promise<BluetoothDevice> {
//         try {
//             console.log(`Attempting to connect to device: ${id}`);
//             const device = await RNBluetoothClassic.connectToDevice(id);
//             this.connectedDevices.push(device);
//             console.log(`Connected to device: ${device.name}`);
//             return device;
//         } catch (error) {
//             console.error(`Error connecting to device ${id}:`, error);
//             throw error;
//         }
//     }

//     async disconnectFromDevice(id: string): Promise<void> {
//         try {
//             console.log(`Attempting to disconnect from device: ${id}`);
//             await RNBluetoothClassic.disconnectFromDevice(id);
//             this.connectedDevices = this.connectedDevices.filter(device => device.id !== id);
//             console.log(`Disconnected from device: ${id}`);
//         } catch (error) {
//             console.error(`Error disconnecting from device ${id}:`, error);
//             throw error;
//         }
//     }

//     async startScan(): Promise<BluetoothDevice[]> {
//         try {
//             const devices = await RNBluetoothClassic.startDiscovery();
//             console.log('Available devices:', devices);
//             return devices;
//         } catch (error) {
//             console.error('Error scanning for devices:', error);
//             throw error;
//         }
//     }

//     async startListeningForData(): Promise<void> {
//         try {
//             if (this.connectedDevices.length === 0) {
//                 throw new Error('No connected devices to listen to');
//             }

//             for (const device of this.connectedDevices) {
//                 if (device.onDataReceived) {
//                     device.onDataReceived((data: { data: string }) => {
//                         alert(data);
//                         alert(data.data);
                        
//                         console.log('Received data:', data.data);
//                         this.tagData = data.data;
//                     });
//                 } else {
//                     console.warn(`Device ${device.name} does not support onDataReceived`);
//                 }
//             }
//         } catch (error) {
//             console.error('Error listening for data:', error);
//         }
//     }

//     getTagData(): string | null {
//         return this.tagData;
//     }
// }

// export default new BluetoothService();
