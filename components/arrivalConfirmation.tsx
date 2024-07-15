import MockGTAService from '@/services/GTAService';
import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, FlatList, Text, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { GTA } from '@/models/GTA';
import { Animal } from '@/models/animal';
import AppBar from './common/appBar';  // Certifique-se de que o caminho está correto
import Colors from '@/constants/colors';

const ArrivalConfirmation = () => {
    const [gtaList, setGtaList] = useState<GTA[]>([]);
    const [selectedGta, setSelectedGta] = useState<string>('');
    const [animals, setAnimals] = useState<Animal[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchGtas = async () => {
            setLoading(true);
            const gtas = await MockGTAService.getGtas();
            setGtaList(gtas);
            setAnimals(gtas[0].animals);
            setLoading(false);
        };

        fetchGtas();
    }, []);

    useEffect(() => {
      
        // if (selectedGta) {
            const fetchAnimals = async () => {
                setLoading(true);
                const animals = await MockGTAService.getAnimalsByGtaId(selectedGta);
                setAnimals(animals);
                setLoading(false);
            };

            fetchAnimals();
        // }
    }, [selectedGta]);

    const handleConfirmArrival = async () => {
        setLoading(true);
        await MockGTAService.confirmArrival(selectedGta, animals);
        setLoading(false);
        // Handle success or error feedback
    };

    const renderAnimalItem = ({ item }: { item: Animal }) => (
        <View style={styles.animalItem}>
            <Text style={styles.animalText}>Nome: {item.name}</Text>
            <Text style={styles.animalText}>Brinco: {item.earringNumber}</Text>
            <Text style={styles.animalText}>Peso: {item.weight}</Text>
            <Text style={styles.animalText}>Sexo: {item.sex}</Text>
        </View>
    );

    const renderHeader = () => (
        <View>
            <Text style={styles.label}>Selecione a GTA</Text>
            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={selectedGta}
                    style={styles.picker}
                    onValueChange={(itemValue) => setSelectedGta(itemValue)}
                >
                    {gtaList.map((gta) => (
                        <Picker.Item key={gta.id} label={gta.number} value={gta.id} />
                    ))}
                </Picker>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <AppBar title="Confirmação de Chegada" />
            {loading ? (
                <ActivityIndicator size="large" color={Colors.primary} style={styles.loadingIndicator} />
            ) : (
                <FlatList
                    ListHeaderComponent={renderHeader}
                    data={animals}
                    keyExtractor={(item) => item.id}
                    renderItem={renderAnimalItem}
                    contentContainerStyle={styles.flatListContent}
                />
            )}
            <View style={styles.footer}>
                <Button title="Confirmar Chegada" onPress={handleConfirmArrival} color={Colors.primary} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    flatListContent: {
        padding: 16,
        paddingBottom: 100, // Espaço extra para o footer
    },
    label: {
        fontSize: 16,
        marginVertical: 8,
        color: Colors.textSecondary,
    },
    pickerContainer: {
        backgroundColor: Colors.card,
        borderRadius: 4,
        marginVertical: 8,
        overflow: 'hidden',
    },
    picker: {
        height: 50,
        width: '100%',
        backgroundColor: Colors.card,
    },
    animalItem: {
        padding: 16,
        marginVertical: 8,
        backgroundColor: Colors.card,
        borderColor: Colors.placeholderText,
        borderWidth: 1,
        borderRadius: 8,
    },
    animalText: {
        fontSize: 14,
        color: Colors.textPrimary,
    },
    loadingIndicator: {
        marginVertical: 20,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: Colors.background,
        padding: 16,
        borderTopWidth: 1,
        borderColor: Colors.placeholderText,
    },
});

export default ArrivalConfirmation;
