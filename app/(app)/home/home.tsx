import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Image, PermissionsAndroid, Alert, Platform } from 'react-native';
import { CompositeNavigationProp, NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@/utils/navigation/navigationTypes';
import { RouteNames } from '@/utils/navigation/routeNames';
import { AutoSizeText, ResizeTextMode } from 'react-native-auto-size-text';
import Colors from '@/constants/colors';
import PropertyFilter from '@/components/common/propertyFilter';
import PropertySelector from '@/components/common/propertySelector';
import { Assets } from '@/assets/assets';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '@/context/authProvider';
import { useBluetooth } from '@/context/bluetoothProvider';

type HomeScreenNavigationProp = CompositeNavigationProp<
    NavigationProp<RootStackParamList, RouteNames.HOME>,
    NavigationProp<RootStackParamList>
>;

const AppBar = ({ onFilterPress, selectedProperty, onNavigation, onSearchPress }: { onFilterPress: any, selectedProperty: any, onNavigation: any, onSearchPress: any }) => (
    <View style={styles.appBarContainer}>
        <View style={styles.profileIconContainer}>
            <Text style={styles.headerText}></Text>
            <TouchableOpacity style={styles.profileIcon} onPress={onNavigation}>
                <Ionicons name="person-circle-outline" size={40} color={Colors.textPrimary} />
            </TouchableOpacity>
        </View>
        <View style={styles.filterContainer}>
            <PropertyFilter onPress={onFilterPress} selectedProperty={selectedProperty} />
        </View>
        <View style={styles.searchContainer}>
            <Ionicons name="search-outline" size={20} color={Colors.placeholderText} style={styles.searchIcon} />
            <TextInput
                style={styles.searchInput}
                placeholder="Buscar animal"
                placeholderTextColor={Colors.placeholderText}
                editable={false}
            />
            <TouchableOpacity style={styles.searchOverlay} onPress={onSearchPress} />
        </View>
    </View>
);

export default function Home() {
    const navigation = useNavigation<HomeScreenNavigationProp>();
    const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
    const [selectedProperty, setSelectedProperty] = useState<string | null>(null);

    const handleFilterPress = () => {
        setIsFilterModalVisible(true);
    };

    const closeFilterModal = () => {
        setIsFilterModalVisible(false);
    };

    const selectProperty = (property: any) => {
        setSelectedProperty(property.name);
        closeFilterModal();
    };

    const navigateToAnimalList = () => {
        navigation.navigate(RouteNames.ANIMAL_LIST, { focusSearchInput: true });
    };

    const navigateToBluetooth = () => {
        navigation.navigate(RouteNames.BLUETOOTH);
    }
    const navigateToLogger = () => {
        navigation.navigate(RouteNames.LOGGER);
    }


    const navigateToUserEdit = () => {
        navigation.navigate(RouteNames.USER_EDIT);
    }

    const navigateToGTALinkEarrings = () => {
        navigation.navigate(RouteNames.GTALinkEarrings);
    }

    const navigateToEarringReception = () => {
        navigation.navigate(RouteNames.EarringReception);
    }
    const navigateToEarringApplication = () => {
        navigation.navigate(RouteNames.EarringApplication);

    }
    const navigateToArrivalConfirmation = () => {
        navigation.navigate(RouteNames.ArrivalConfirmation);
    }
    useEffect(() => {
        requestPermissions();
    }, []);

    const requestPermissions = async () => {
        if (Platform.OS === 'android') {
            const grantedLocation = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: 'Permissão de Localização',
                    message: 'O aplicativo precisa de acesso à sua localização para escanear dispositivos Bluetooth.',
                    buttonNeutral: 'Pergunte-me depois',
                    buttonNegative: 'Cancelar',
                    buttonPositive: 'OK',
                }
            );

            if (grantedLocation !== PermissionsAndroid.RESULTS.GRANTED) {
                Alert.alert('Permissão Negada', 'A permissão de localização é necessária para escanear dispositivos Bluetooth.');
                return;
            }

            const grantedBluetoothScan = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
                {
                    title: 'Permissão de Varredura Bluetooth',
                    message: 'O aplicativo precisa de acesso à varredura Bluetooth para encontrar dispositivos.',
                    buttonNeutral: 'Pergunte-me depois',
                    buttonNegative: 'Cancelar',
                    buttonPositive: 'OK',
                }
            );

            if (grantedBluetoothScan !== PermissionsAndroid.RESULTS.GRANTED) {
                Alert.alert('Permissão Negada', 'A permissão de varredura Bluetooth é necessária para encontrar dispositivos.');
                return;
            }

            const grantedBluetoothConnect = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
                {
                    title: 'Permissão de Conexão Bluetooth',
                    message: 'O aplicativo precisa de acesso à conexão Bluetooth para se comunicar com dispositivos.',
                    buttonNeutral: 'Pergunte-me depois',
                    buttonNegative: 'Cancelar',
                    buttonPositive: 'OK',
                }
            );

            if (grantedBluetoothConnect !== PermissionsAndroid.RESULTS.GRANTED) {
                Alert.alert('Permissão Negada', 'A permissão de conexão Bluetooth é necessária para se comunicar com dispositivos.');
                return;
            }
        }
    };


    return (
        <View style={styles.container}>
            <AppBar onFilterPress={handleFilterPress} selectedProperty={selectedProperty} onNavigation={navigateToUserEdit} onSearchPress={navigateToAnimalList} />
            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.sectionTitle}>Test</Text>
                <View style={styles.summary}>
                    <TouchableOpacity style={styles.summaryItem} onPress={navigateToBluetooth}>
                        <Image source={Assets.animalIcon} style={styles.summaryIcon} />
                        <AutoSizeText
                            style={styles.summaryText}
                            fontSize={18}
                            numberOfLines={1}
                            mode={ResizeTextMode.max_lines}>
                            Bastão RFID
                        </AutoSizeText>
                    </TouchableOpacity>
                </View>
                <Text style={styles.sectionTitle}>Resumo</Text>
                <View style={styles.summary}>
                    <TouchableOpacity style={styles.summaryItem} onPress={navigateToAnimalList}>
                        <Image source={Assets.animalIcon} style={styles.summaryIcon} />
                        <AutoSizeText
                            style={styles.summaryText}
                            fontSize={18}
                            numberOfLines={1}
                            mode={ResizeTextMode.max_lines}>
                            000
                        </AutoSizeText>
                        <AutoSizeText
                            style={styles.summaryText}
                            fontSize={10}
                            numberOfLines={1}
                            mode={ResizeTextMode.max_lines}>
                            Animais
                        </AutoSizeText>
                    </TouchableOpacity>
                    <View style={styles.summaryItem}>
                        <Ionicons name="sync-outline" size={20} color={Colors.icon} />
                        <AutoSizeText
                            style={styles.summaryText}
                            fontSize={18}
                            numberOfLines={1}
                            mode={ResizeTextMode.max_lines}>
                            000
                        </AutoSizeText>
                        <AutoSizeText
                            style={styles.summaryText}
                            fontSize={10}
                            numberOfLines={2}
                            mode={ResizeTextMode.max_lines}>
                            Nascimentos
                        </AutoSizeText>
                    </View>
                    <View style={styles.summaryItem}>
                        <Ionicons name="pulse-outline" size={20} color={Colors.icon} />
                        <AutoSizeText
                            style={styles.summaryText}
                            fontSize={10}
                            numberOfLines={1}
                            mode={ResizeTextMode.max_lines}>
                            000
                        </AutoSizeText>
                        <AutoSizeText
                            style={styles.summaryText}
                            fontSize={18}
                            numberOfLines={2}
                            mode={ResizeTextMode.max_lines}>
                            Mortalidades
                        </AutoSizeText>
                    </View>
                </View>
                <Text style={styles.sectionTitle}>Gestão</Text>
                <View style={styles.registers}>
                    <TouchableOpacity style={styles.registerItem} onPress={navigateToEarringReception}>
                        <Ionicons name="pricetags-outline" size={20} color={Colors.icon} />
                        <AutoSizeText
                            style={styles.registerText}
                            fontSize={18}
                            numberOfLines={1}
                            mode={ResizeTextMode.max_lines}>
                            Confirmação Brincos
                        </AutoSizeText>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.registerItem} onPress={navigateToEarringApplication}>
                        <Ionicons name="pricetags-outline" size={20} color={Colors.icon} />
                        <AutoSizeText
                            style={styles.registerText}
                            fontSize={18}
                            numberOfLines={2}
                            mode={ResizeTextMode.max_lines}>
                            Aplicação Brincos
                        </AutoSizeText>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.registerItem} onPress={navigateToGTALinkEarrings}>
                        <Ionicons name="document-text-outline" size={20} color={Colors.icon} />
                        <AutoSizeText
                            style={styles.registerText}
                            fontSize={18}
                            numberOfLines={2}
                            mode={ResizeTextMode.max_lines}>
                            Emissão GTA
                        </AutoSizeText>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.registerItem} onPress={navigateToArrivalConfirmation}>
                        <Ionicons name="checkmark-done-outline" size={20} color={Colors.icon} />
                        <AutoSizeText
                            style={styles.registerText}
                            fontSize={18}
                            numberOfLines={2}
                            mode={ResizeTextMode.max_lines}>
                            Confirmação Chegada
                        </AutoSizeText>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <PropertySelector
                isVisible={isFilterModalVisible}
                onClose={closeFilterModal}
                onSelect={selectProperty}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    appBarContainer: {
        backgroundColor: Colors.primary,
        padding: 10,
    },
    profileIconContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerText: {
        color: Colors.textPrimary,
        fontSize: 16,
        height: 85
    },
    filterContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    searchContainer: {
        backgroundColor: Colors.surface,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        borderRadius: 5,
        paddingVertical: 10,
        marginHorizontal: 10,
        position: 'relative',
    },
    searchInput: {
        flex: 1,
        padding: 10,
        color: Colors.textPrimary,
    },
    searchIcon: {
        width: 20,
        height: 20,
        marginRight: 10,
    },
    searchOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'transparent',
    },
    profileIcon: {
        padding: 10,
    },
    iconImage: {
        width: 40,
        height: 40,
    },
    content: {
        padding: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: Colors.textPrimary,
    },
    summary: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    summaryItem: {
        backgroundColor: Colors.card,  // cor adicionada
        borderRadius: 5,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        marginHorizontal: 5,
    },
    summaryText: {
        marginTop: 10,
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.textPrimary,
        textAlign: 'center',
    },
    summaryIcon: {
        width: 40,
        height: 40,
        marginBottom: 10,
    },
    registers: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    registerItem: {
        backgroundColor: Colors.card,
        borderRadius: 5,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        flexBasis: '48%',
        marginBottom: 10,
    },
    registerIcon: {
        width: 40,
        height: 40,
        marginBottom: 10,
    },
    registerText: {
        marginTop: 10,
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.textPrimary,
        textAlign: 'center',
    },
    connectedDevice: {
        padding: 16,
        backgroundColor: '#e0e0e0',
        marginTop: 20,
        borderRadius: 8,
        alignItems: 'center',
    },
});
