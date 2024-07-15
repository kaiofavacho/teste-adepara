import React from 'react';
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/colors';

const PropertyFilter = ({ onPress, selectedProperty }: { onPress: any, selectedProperty: string }) => (
    <TouchableOpacity style={styles.filterContainer} onPress={onPress}>
        <Text style={styles.filterText}>{selectedProperty || 'Filtrar por propriedade'}</Text>
        <Ionicons name="chevron-down" size={20} color={Colors.textSecondary} style={styles.chevronIcon} />
        <Ionicons name="chevron-expand-outline" size={20} color={Colors.icon} style={styles.checkIcon} />
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    filterContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: Colors.surface,
        borderRadius: 5,
        marginBottom: 10,
    },
    filterText: {
        flex: 1,
        color: Colors.placeholderText,
    },
    chevronIcon: {
        marginLeft: 5,
    },
    checkIcon: {
        marginLeft: 5,
    },
});

export default PropertyFilter;
