export interface IBluetoothService<T> {
    initialize(): Promise<void>;
    listPairedDevices(): Promise<T[]>;
    listConnectedDevices(): Promise<T[]>;
    connectToDevice(id: string): Promise<T>;
    disconnectFromDevice(id: string): Promise<void>;
    startScan(): Promise<T[]>;
    startListeningForData(): Promise<void>;
    getTagData(): string | null;
}

export interface BluetoothDevice {
    id: string;
    name: string | null;
}
