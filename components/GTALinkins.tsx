import GTAService from '@/services/GTAService';
import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, FlatList, Text, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AppBar from './common/appBar';  // Certifique-se de que o caminho está correto
import Colors from '@/constants/colors';

interface Earring {
    id: string;
    number: string;
    receptionDate: Date;
}

const GTALinkEarrings = () => {
    const [gtaList, setGtaList] = useState<{ id: string; number: string }[]>([]);
    const [selectedGta, setSelectedGta] = useState<string>('');
    const [earringNumber, setEarringNumber] = useState<string>('');
    const [earrings, setEarrings] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchGtas = async () => {
            setLoading(true);
            const gtas = await GTAService.getGtas();
            setGtaList(gtas);
            setLoading(false);
        };

        fetchGtas();
    }, []);

    const addEarring = () => {
        if (earringNumber.trim()) {
            setEarrings([...earrings, earringNumber]);
            setEarringNumber('');
        }
    };

    const handleLinkEarrings = async () => {
        setLoading(true);
        const earringList: Earring[] = earrings.map(number => ({ id: '', number, receptionDate: new Date() }));
        await GTAService.linkEarrings(selectedGta, earringList);
        setLoading(false);
        // Handle success or error feedback
    };

    const confirmRemoveEarring = (index: number) => {
        Alert.alert(
            "Remover Brinco",
            "Você tem certeza que deseja remover este brinco?",
            [
                {
                    text: "Cancelar",
                    style: "cancel"
                },
                {
                    text: "Remover",
                    onPress: () => removeEarring(index),
                    style: "destructive"
                }
            ],
            { cancelable: true }
        );
    };

    const removeEarring = (index: number) => {
        setEarrings((prevEarrings) => prevEarrings.filter((_, i) => i !== index));
    };

    const renderHeader = () => (
        <View>
            <Text style={styles.label}>Selecione a GTA</Text>
            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={selectedGta}
                    style={styles.picker}
                    onValueChange={(itemValue: any) => setSelectedGta(itemValue)}
                >
                    {gtaList.map((gta) => (
                        <Picker.Item key={gta.id} label={gta.number} value={gta.id} />
                    ))}
                </Picker>
            </View>
            <TextInput
                style={styles.input}
                placeholder="Número do Brinco"
                value={earringNumber}
                onChangeText={setEarringNumber}
                placeholderTextColor={Colors.placeholderText}
            />
            <Button title="Adicionar Brinco" onPress={addEarring} color={Colors.primary} />
        </View>
    );

    return (
        <View style={styles.container}>
            <AppBar title="Vincular Brincos" />
            {loading ? (
                <ActivityIndicator size="large" color={Colors.primary} style={styles.loadingIndicator} />
            ) : (
                <FlatList
                    ListHeaderComponent={renderHeader}
                    data={earrings}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => (
                        <View style={styles.earringItem}>
                            <Text style={styles.earringText}>{item}</Text>
                            <TouchableOpacity onPress={() => confirmRemoveEarring(index)} style={styles.removeButton}>
                                <Text style={styles.removeButtonText}>Remover</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    contentContainerStyle={styles.flatListContent}
                />
            )}
            <View style={styles.footer}>
                <Button title="Vincular Brincos" onPress={handleLinkEarrings} color={Colors.primary} />
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
        backgroundColor: Colors.surface,
        borderRadius: 4,
        marginVertical: 8,
        overflow: 'hidden',
    },
    picker: {
        height: 50,
        width: '100%',
        backgroundColor: Colors.surface,
    },
    input: {
        width: '100%',
        padding: 16,
        marginVertical: 8,
        borderColor: Colors.placeholderText,
        borderWidth: 1,
        borderRadius: 4,
        backgroundColor: Colors.surface,
    },
    earringItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        marginVertical: 8,
        backgroundColor: Colors.surface,
        borderColor: Colors.placeholderText,
        borderWidth: 1,
        borderRadius: 8,
    },
    earringText: {
        fontSize: 14,
        color: Colors.textPrimary,
    },
    removeButton: {
        padding: 8,
        backgroundColor: Colors.error,
        borderRadius: 4,
    },
    removeButtonText: {
        color: Colors.textSecondary,
        fontWeight: 'bold',
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

export default GTALinkEarrings;
