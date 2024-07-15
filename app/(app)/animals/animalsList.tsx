import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/colors';
import PropertySelector from '@/components/common/propertySelector';
import { Assets } from '@/assets/assets';
import { CompositeNavigationProp, NavigationProp, useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '@/utils/navigation/navigationTypes';
import { RouteNames } from '@/utils/navigation/routeNames';
import AnimalService from '@/services/animalService';
import { useBluetooth } from '@/context/bluetoothProvider'; 

type AnimalListNavigationProp = CompositeNavigationProp<
    NavigationProp<RootStackParamList, RouteNames.ANIMAL_LIST>,
    NavigationProp<RootStackParamList>
>;

type AnimalListRouteProp = RouteProp<RootStackParamList, RouteNames.ANIMAL_LIST>;

const AnimalList = () => {
    const navigation = useNavigation<AnimalListNavigationProp>();
    const route = useRoute<AnimalListRouteProp>();
    const searchInputRef = useRef<TextInput>(null);
    const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
    const [selectedProperty, setSelectedProperty] = useState<string | null>(null);
    const [animalList, setAnimalList] = useState<any[]>([
        { id: '1', name: 'Animal 1', weight: '20kg' },
        { id: '2', name: 'Animal 2', weight: '30kg' },
        // Adicione mais dados mock conforme necessário
    ]);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const { connectedDevice, initializeBluetooth, listConnectedDevices, startListeningForData, getTagData } = useBluetooth();
    const [connectedDevices, setConnectedDevices] = useState<any[]>([]);

    useEffect(() => {
        if (route.params?.focusSearchInput) {
            searchInputRef.current?.focus();
        }
    }, [route.params]);

    useEffect(() => {
        const handleBluetoothTagData = async (tagData: string) => {
            try {
                const animalData = await AnimalService.fetchAnimalData(tagData);
                setAnimalList((prevList) => [...prevList, animalData]);
            } catch (error) {
                Alert.alert('Error', 'Failed to fetch animal data.');
            }
        };

        const initialize = async () => {
            try {
                await initializeBluetooth();
                const connectedDevices = await listConnectedDevices();
                setConnectedDevices(connectedDevices);

                if (connectedDevices.length > 0) {
                    await startListeningForData();
                }

                const intervalId = setInterval(() => {
                    const tagData = getTagData();
                    if (tagData) {
                        handleBluetoothTagData(tagData);
                    }
                }, 1000);

                return () => {
                    clearInterval(intervalId);
                };
            } catch (error) {
                Alert.alert('Error', 'Failed to initialize Bluetooth service.');
            }
        };

        initialize();
    }, []);

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

    const renderAnimalItem = ({ item }: { item: any }) => (
        <View style={styles.animalItem}>
            <Image source={Assets.animalIcon} style={styles.animalIcon} />
            <View style={styles.animalDetails}>
                <Text style={styles.animalName}>{item.name}</Text>
                <Text style={styles.animalWeight}>{item.weight}</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color={Colors.textPrimary} />
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.appBarContainer}>
                <View style={styles.profileIconContainer}>
                    <Ionicons name="arrow-back" size={24} color={Colors.textPrimary} onPress={() => navigation.goBack()} />
                    <TouchableOpacity style={styles.profileIcon}>
                        <Ionicons name="person-circle-outline" size={40} color={Colors.textPrimary} />
                    </TouchableOpacity>
                </View>
                <View style={styles.searchContainer}>
                    <Ionicons name="search-outline" size={20} color={Colors.placeholderText} style={styles.searchIcon} />
                    <TextInput
                        ref={searchInputRef}
                        style={styles.searchInput}
                        placeholder="Buscar animal"
                        placeholderTextColor={Colors.placeholderText}
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        editable={true}
                    />
                </View>
            </View>
            <FlatList
                data={animalList.filter(animal => animal.name.toLowerCase().includes(searchQuery.toLowerCase()))}
                renderItem={renderAnimalItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.content}
            />
            <PropertySelector
                isVisible={isFilterModalVisible}
                onClose={closeFilterModal}
                onSelect={selectProperty}
            />
            {connectedDevice && (
                <View style={styles.connectedDeviceContainer}>
                    <Text>Dispositivo Conectado: {connectedDevice.name}</Text>
                </View>
            )}
        </View>
    );
};

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
        height: 85
    },
    searchContainer: {
        backgroundColor: Colors.surface,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        borderRadius: 5,
        paddingVertical: 10,
        marginHorizontal: 10,
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
    profileIcon: {
        padding: 10,
    },
    content: {
        padding: 20,
    },
    animalItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: Colors.surface,
        padding: 10,
        marginVertical: 5,
        borderRadius: 5,
    },
    animalIcon: {
        width: 40,
        height: 40,
    },
    animalDetails: {
        flex: 1,
        marginLeft: 10,
    },
    animalName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.textPrimary,
    },
    animalWeight: {
        fontSize: 12,
        color: Colors.textSecondary,
        marginTop: 2,
    },
    connectedDeviceContainer: {
        marginTop: 20,
        padding: 16,
        backgroundColor: '#e0e0e0',
        borderRadius: 8,
        alignItems: 'center',
    },
});

export default AnimalList;
