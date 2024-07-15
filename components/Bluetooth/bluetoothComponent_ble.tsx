// import React, { useState, useEffect } from 'react';
// import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
// import { useBluetooth } from '@/context/bluetoothProvider';
// import { Device } from 'react-native-ble-plx';
// import AppBar from '../common/appBar';
// import Colors from '@/constants/colors';

// const BluetoothConnectionScreen = () => {
//     const [pairedDevices, setPairedDevices] = useState<Device[]>([]);
//     const [availableDevices, setAvailableDevices] = useState<Device[]>([]);
//     const [isScanning, setIsScanning] = useState(false);
//     const [connectingDeviceId, setConnectingDeviceId] = useState<string | null>(null);
//     const { connectToDevice, disconnectFromDevice, connectedDevice, initializeBluetooth, listPairedDevices, startScan } = useBluetooth();

//     useEffect(() => {
//         const initialize = async () => {
//             try {
//                 await initializeBluetooth();
//                 const paired = await listPairedDevices();
//                 setPairedDevices(paired);
//             } catch (error) {
//                 console.error('Falha ao inicializar o Bluetooth', error);
//             }
//         };

//         initialize();
//     }, []);

//     const handleStartScan = async () => {
//         setIsScanning(true);
//         try {
//             const available = await startScan();
//             setAvailableDevices(available);
//         } catch (error) {
//             console.error('Erro ao escanear dispositivos', error);
//         } finally {
//             setIsScanning(false);
//         }
//     };

//     const handleConnectToDevice = async (device: Device) => {
//         setConnectingDeviceId(device.id);
//         try {
//             await connectToDevice(device.id);
//         } catch (error) {
//             console.error('Falha ao conectar ao dispositivo', error);
//         } finally {
//             setConnectingDeviceId(null);
//         }
//     };

//     const renderDeviceItem = ({ item }: { item: Device }) => (
//         <TouchableOpacity
//             style={styles.deviceItem}
//             onPress={() => handleConnectToDevice(item)}
//             disabled={!!connectingDeviceId || !!connectedDevice}
//         >
//             <View style={styles.deviceInfo}>
//                 <Text>{item.name}</Text>
//                 <Text>{item.id}</Text>
//             </View>
//             {connectingDeviceId === item.id && <ActivityIndicator size="small" color="#0000ff" />}
//         </TouchableOpacity>
//     );

//     return (
//         <View style={styles.container}>
//             <AppBar title="Bluetooth" />
//             <Text style={styles.title}>Dispositivos Pareados:</Text>
//             <FlatList
//                 data={pairedDevices}
//                 keyExtractor={(item) => item.id}
//                 renderItem={renderDeviceItem}
//             />
//             <Text style={styles.title}>Dispositivos Disponíveis:</Text>
//             <FlatList
//                 data={availableDevices}
//                 keyExtractor={(item) => item.id}
//                 renderItem={renderDeviceItem}
//             />
//             {connectedDevice ? (
//                 <View style={styles.connectedDevice}>
//                     <Text>Conectado a: {connectedDevice.name}</Text>
//                     <Button title="Desconectar" onPress={disconnectFromDevice} />
//                 </View>
//             ) : (
//                 <Button title={isScanning ? "Escaneando..." : "Escanear Dispositivos"} onPress={handleStartScan} disabled={isScanning} />
//             )}
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         padding: 16,
//         backgroundColor: Colors.primary
//     },
//     title: {
//         fontSize: 18,
//         fontWeight: 'bold',
//         marginBottom: 10,
//         marginTop: 10,
//     },
//     deviceItem: {
//         padding: 16,
//         borderBottomWidth: 1,
//         borderBottomColor: '#ccc',
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         backgroundColor: Colors.headerText
//     },
//     deviceInfo: {
//         flex: 1,
//     },
//     connectedDevice: {
//         padding: 16,
//         backgroundColor: '#e0e0e0',
//         marginTop: 20,
//         borderRadius: 8,
//     },
// });

// export default BluetoothConnectionScreen;
