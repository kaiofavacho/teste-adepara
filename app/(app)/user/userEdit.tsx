import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '@/context/authProvider';
import { useNavigation, CompositeNavigationProp, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '@/utils/navigation/navigationTypes';
import { RouteNames } from '@/utils/navigation/routeNames';
import Colors from '@/constants/colors';
import LoadingButton from '@/components/common/loadingButton';
import AppBar from '@/components/common/appBar';

type UserEditScreenNavigationProp = CompositeNavigationProp<
    NavigationProp<RootStackParamList, RouteNames.USER_EDIT>,
    NavigationProp<RootStackParamList>
>;

export default function UserEdit() {
    const { user, updateUser, signOut } = useAuth();
    const navigation = useNavigation<UserEditScreenNavigationProp>();
    const [nome, setNome] = useState(user?.nome || '');
    const [cpf, setCpf] = useState(user?.cpf || '');
    const [email, setEmail] = useState(user?.perfil || ''); // Ajustado para o campo correto
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

    useEffect(() => {
        setNome(user?.nome || '');
        setCpf(user?.cpf || '');
        setEmail(user?.perfil || '');
    }, [user]);

    const handleSave = async () => {
        if (!nome || !cpf || !email) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos.');
            return;
        }

        if (password && password !== confirmPassword) {
            Alert.alert('Erro', 'As senhas não coincidem.');
            return;
        }

        try {
            const updatedInfo = {
                id: user?.id || '',
                cpf,
                nome,
                perfil: email,
                ativo: user?.ativo || true,
                password: user?.password || '',
                criadoPor: user?.criadoPor || '',
                criadoEm: user?.criadoEm || new Date(),
                atualizadoPor: 'system',
                atualizadoEm: new Date(),
            };
            if (password) {
                updatedInfo.password = password;
            }
            await updateUser(updatedInfo);
            Alert.alert('Sucesso', 'Informações atualizadas com sucesso.');
            navigation.goBack();
        } catch (error) {
            Alert.alert('Erro', 'Falha ao atualizar, por favor, tente novamente.');
        }
    };

    const handleSignOut = () => {
        Alert.alert(
            'Confirmação',
            'Tem certeza que deseja sair?',
            [
                {
                    text: 'Não',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {
                    text: 'Sim',
                    onPress: async () => {
                        await signOut();
                        navigation.navigate(RouteNames.SIGN_IN);
                    },
                },
            ],
            { cancelable: false }
        );
    };

    return (
        <View style={styles.container}>
            <AppBar title="Editar Usuário" />
            <ScrollView contentContainerStyle={styles.content}>
                <TextInput
                    value={nome}
                    onChangeText={setNome}
                    style={styles.input}
                    placeholder="Nome"
                    keyboardType="default"
                    autoCapitalize="none"
                    placeholderTextColor={Colors.placeholderText}
                />
                <TextInput
                    value={cpf}
                    onChangeText={setCpf}
                    style={styles.input}
                    placeholder="CPF"
                    keyboardType="default"
                    autoCapitalize="none"
                    placeholderTextColor={Colors.placeholderText}
                />
                <TextInput
                    value={email}
                    onChangeText={setEmail}
                    style={styles.input}
                    placeholder="Perfil"
                    keyboardType="default"
                    autoCapitalize="none"
                    placeholderTextColor={Colors.placeholderText}
                />
                <View style={styles.passwordContainer}>
                    <TextInput
                        value={password}
                        onChangeText={setPassword}
                        style={styles.passwordInput}
                        placeholder="Senha"
                        secureTextEntry={!passwordVisible}
                        autoCapitalize="none"
                        placeholderTextColor={Colors.placeholderText}
                    />
                    <TouchableOpacity
                        style={styles.icon}
                        onPress={() => setPasswordVisible(!passwordVisible)}
                    >
                        <Ionicons name={passwordVisible ? "eye-off" : "eye"} size={24} color={Colors.textPrimary} />
                    </TouchableOpacity>
                </View>
                <View style={styles.passwordContainer}>
                    <TextInput
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        style={styles.passwordInput}
                        placeholder="Confirmar Senha"
                        secureTextEntry={!confirmPasswordVisible}
                        autoCapitalize="none"
                        placeholderTextColor={Colors.placeholderText}
                    />
                    <TouchableOpacity
                        style={styles.icon}
                        onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                    >
                        <Ionicons name={confirmPasswordVisible ? "eye-off" : "eye"} size={24} color={Colors.textPrimary} />
                    </TouchableOpacity>
                </View>
                <LoadingButton
                    title="Salvar"
                    onPress={handleSave}
                    style={styles.button}
                    textStyle={styles.buttonText}
                    delay={5}
                />
                <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
                    <Text style={styles.signOutButtonText}>Sair</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    content: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    input: {
        width: '100%',
        height: 40,
        backgroundColor: Colors.surface,
        marginBottom: 20,
        padding: 10,
        borderRadius: 5,
        color: Colors.textPrimary,
    },
    passwordContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        backgroundColor: Colors.surface,
        borderRadius: 5,
        height: 40,
    },
    passwordInput: {
        flex: 1,
        height: '100%',
        padding: 10,
        color: Colors.textPrimary,
    },
    icon: {
        padding: 10,
    },
    button: {
        backgroundColor: Colors.secondary,
        width: '100%',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 20,
    },
    buttonText: {
        color: Colors.surface,
        fontSize: 16,
        fontWeight: 'bold',
    },
    signOutButton: {
        backgroundColor: '#FF0000', // Cor vermelha em hexadecimal
        width: '100%',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
    },
    signOutButtonText: {
        color: Colors.surface,
        fontSize: 16,
        fontWeight: 'bold',
    },
});
