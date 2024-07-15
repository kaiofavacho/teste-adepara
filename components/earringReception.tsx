import EarringService from '@/services/earringService';
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, FlatList, Text, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AppBar from './common/appBar';  // Certifique-se de que o caminho está correto
import Colors from '@/constants/colors';

interface Earring {
    number: string;
    receptionDate: string;
}

const EarringReception = () => {
    const [earringNumber, setEarringNumber] = useState('');
    const [earrings, setEarrings] = useState<Earring[]>([]);
    const [receptionDate, setReceptionDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [loading, setLoading] = useState(false);

    const addEarring = () => {
        if (earringNumber.trim()) {
            setEarrings([...earrings, { number: earringNumber, receptionDate: receptionDate.toISOString() }]);
            setEarringNumber('');
        }
    };

    const confirmRemoveEarring = (number: string) => {
        Alert.alert(
            "Confirmar Remoção",
            `Tem certeza que deseja remover o brinco ${number}?`,
            [
                {
                    text: "Cancelar",
                    style: "cancel"
                },
                {
                    text: "Remover",
                    onPress: () => removeEarring(number),
                    style: "destructive"
                }
            ]
        );
    };

    const removeEarring = (number: string) => {
        setEarrings(earrings.filter(earring => earring.number !== number));
    };

    const handleConfirmReception = async () => {
        setLoading(true);
        const earringList = earrings.map(earring => ({ id: '', number: earring.number, receptionDate: new Date(earring.receptionDate) }));
        await EarringService.confirmReception(earringList);
        setLoading(false);
        // Handle success or error feedback
    };

    const onChangeDate = (event: any, selectedDate: any) => {
        const currentDate = selectedDate || receptionDate;
        setShowDatePicker(false);
        setReceptionDate(currentDate);
    };

    const formatDate = (date: Date) => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const renderHeader = () => (
        <View>
            <Text style={styles.label}>Data de Recepção</Text>
            <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.dateInput}>
                <Text>{formatDate(receptionDate)}</Text>
            </TouchableOpacity>
            {showDatePicker && (
                <DateTimePicker
                    value={receptionDate}
                    mode="date"
                    display="default"
                    onChange={onChangeDate}
                />
            )}
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

    const renderItem = ({ item }: { item: Earring }) => (
        <View style={styles.earringItem}>
            <Text>{item.number}</Text>
            <TouchableOpacity onPress={() => confirmRemoveEarring(item.number)}>
                <Text style={styles.removeButton}>Remover</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <AppBar title="Recepção de Brincos" />
            <FlatList
                ListHeaderComponent={renderHeader}
                data={earrings}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
                contentContainerStyle={styles.flatListContent}
            />
            <View style={styles.footer}>
                {loading ? (
                    <ActivityIndicator size="large" color={Colors.primary} />
                ) : (
                    <Button title="Confirmar Recepção" onPress={handleConfirmReception} color={Colors.primary} />
                )}
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
    input: {
        width: '100%',
        padding: 16,
        marginVertical: 8,
        borderColor: Colors.placeholderText,
        borderWidth: 1,
        borderRadius: 4,
        backgroundColor: Colors.surface,
    },
    label: {
        fontSize: 16,
        color: Colors.textPrimary,
        marginVertical: 8,
    },
    dateInput: {
        width: '100%',
        padding: 16,
        marginVertical: 8,
        borderColor: Colors.placeholderText,
        borderWidth: 1,
        borderRadius: 4,
        backgroundColor: Colors.surface,
        justifyContent: 'center',
        alignItems: 'center',
    },
    earringItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 8,
        marginVertical: 4,
        backgroundColor: Colors.surface,
        borderColor: Colors.placeholderText,
        borderWidth: 1,
        borderRadius: 4,
    },
    removeButton: {
        color: Colors.danger,
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

export default EarringReception;
