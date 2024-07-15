// src/components/common/PropertySelector.js
import React from 'react';
import { Modal, View, Text, TouchableOpacity, FlatList, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import Colors from '@/constants/colors';

const properties = [
    { id: '1', name: 'Propriedade 1' },
    { id: '2', name: 'Propriedade 2' },
    { id: '3', name: 'Propriedade 3' },
    { id: '4', name: 'Propriedade 4' },
    { id: '5', name: 'Propriedade 5' },
];

const PropertySelector = ({ isVisible, onClose, onSelect }: { isVisible: any, onClose: any, onSelect: any }) => {
    const renderPropertyItem = ({ item }: { item: any }) => (
        <TouchableOpacity style={styles.propertyItem} onPress={() => onSelect(item)}>
            <Text style={styles.propertyText}>{item.name}</Text>
        </TouchableOpacity>
    );

    return (
        <Modal
            visible={isVisible}
            transparent={true}
            animationType="slide"
            onRequestClose={onClose}>
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.modalContainer}>
                    <TouchableWithoutFeedback>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Selecione uma Propriedade</Text>
                            <FlatList
                                data={properties}
                                renderItem={renderPropertyItem}
                                keyExtractor={item => item.id}
                                ItemSeparatorComponent={() => <View style={styles.separator} />}
                            />
                            <TouchableOpacity onPress={onClose}>
                                <Text style={styles.closeButton}>Fechar</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        backgroundColor: Colors.surface,
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: Colors.textPrimary,  // Texto em preto
    },
    closeButton: {
        marginTop: 20,
        textAlign: 'center',
        color: Colors.primary,
    },
    propertyItem: {
        padding: 15,
        borderRadius: 5,
        backgroundColor: Colors.card,  // cor adicionada aos itens da lista
        marginBottom: 10,
    },
    propertyText: {
        fontSize: 16,
        color: Colors.textPrimary,  // Texto em preto
    },
    separator: {
        height: 10,  // Espaçamento entre os itens
    },
});

export default PropertySelector;
