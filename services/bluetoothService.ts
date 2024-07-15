import { BleManager, Device, BleError, Characteristic, State } from 'react-native-ble-plx';
import { Buffer } from 'buffer';
import logger from '@/utils/logger';

const manager = new BleManager();

class BluetoothService {
    connectedDevices: Device[] = [];
    tagData: string | null = null;

    constructor() {
        logger.log("BluetoothService initialized");
        if (!manager) {
            logger.log('BleManager initialization failed');
        }
    }

    async initialize() {
        const state = await manager.state();
        if (state !== State.PoweredOn) {
            logger.log("Bluetooth is not enabled. Enabling...");
            await manager.enable();
        }
    }

    async listPairedDevices(): Promise<Device[]> {
        return new Promise((resolve, reject) => {
            const devices: Device[] = [];
            manager.startDeviceScan(null, null, (error, scannedDevice) => {
                if (error) {
                    logger.log(`Error scanning for devices: ${error}`);
                    reject(error);
                    return;
                }
                if (scannedDevice) {
                    devices.push(scannedDevice);
                }
            });

            setTimeout(() => {
                manager.stopDeviceScan();
                logger.log(`Available devices: ${JSON.stringify(devices)}`);
                resolve(devices);
            }, 5000);
        });
    }

    async listConnectedDevices(): Promise<Device[]> {
        try {
            const connectedDevices = await manager.connectedDevices([]);
            logger.log(`Connected devices: ${JSON.stringify(connectedDevices)}`);
            this.connectedDevices = connectedDevices;
            return connectedDevices;
        } catch (error) {
            logger.log(`Error listing connected devices: ${error}`);
            throw error;
        }
    }

    async connectToDevice(id: string): Promise<Device> {
        try {
            logger.log(`Attempting to connect to device: ${id}`);
            const device = await manager.connectToDevice(id);
            await device.discoverAllServicesAndCharacteristics();
            this.connectedDevices.push(device);
            logger.log(`Connected to device: ${device.name}`);
            return device;
        } catch (error) {
            logger.log(`Error connecting to device ${id}: ${error}`);
            throw error;
        }
    }

    async disconnectFromDevice(id: string): Promise<void> {
        try {
            logger.log(`Attempting to disconnect from device: ${id}`);
            const device = this.connectedDevices.find(device => device.id === id);
            if (device) {
                await device.cancelConnection();
                this.connectedDevices = this.connectedDevices.filter(device => device.id !== id);
                logger.log(`Disconnected from device: ${id}`);
            }
        } catch (error) {
            logger.log(`Error disconnecting from device ${id}: ${error}`);
            throw error;
        }
    }

    async startScan(): Promise<Device[]> {
        return this.listPairedDevices();
    }

    async startListeningForData(): Promise<void> {
        try {
            if (this.connectedDevices.length === 0) {
                throw new Error('No connected devices to listen to');
            }

            for (const device of this.connectedDevices) {
                const services = await device.services();
                for (const service of services) {
                    const characteristics = await service.characteristics();
                    for (const characteristic of characteristics) {
                        characteristic.monitor((error: BleError | null, monitoredCharacteristic: Characteristic | null) => {
                            if (error) {
                                logger.log(`monitor: Error receiving data: ${error}`);
                                return;
                            }
                            if (monitoredCharacteristic && monitoredCharacteristic.value) {
                                const data = Buffer.from(monitoredCharacteristic.value, 'base64').toString('ascii');
                                logger.log(`monitor: Received data: ${data}`);
                                this.tagData = data;
                            }
                        });

                        if (characteristic.isReadable) {
                            const response = await characteristic.read();
                            if (response.value) {
                                const decodedValue = Buffer.from(response.value, 'base64').toString('ascii');
                                logger.log(`isReadable: Received data: ${decodedValue}`);
                                this.tagData = decodedValue;
                            } else {
                                logger.log('isReadable: Received null value from characteristic');
                            }
                        }
                    }
                }
            }
        } catch (error) {
            logger.log(`Error listening for data: ${error}`);
        }
    }

    getTagData(): string | null {
        return this.tagData;
    }
}

export default new BluetoothService();
