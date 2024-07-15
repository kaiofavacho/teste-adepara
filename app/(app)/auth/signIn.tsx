import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Animated, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '@/context/authProvider';
import { useNavigation, CompositeNavigationProp, NavigationProp } from '@react-navigation/native';
import { Assets } from '@/assets/assets';
import LoadingButton from '@/components/common/loadingButton';
import { RootStackParamList } from '@/utils/navigation/navigationTypes';
import { RouteNames } from '@/utils/navigation/routeNames';
import Colors from '@/constants/colors';

type SignInScreenNavigationProp = CompositeNavigationProp<
  NavigationProp<RootStackParamList, RouteNames.SIGN_IN>,
  NavigationProp<RootStackParamList>
>;

const AnimatedLetter = ({ element, delay }: { element: any, delay: number }) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 1000,
      delay,
      useNativeDriver: true,
    }).start();
  }, [animatedValue, delay]);

  if (typeof element === 'string') {
    return (
      <Animated.Text style={[styles.letter, { opacity: animatedValue }]}>
        {element}
      </Animated.Text>
    );
  } else {
    return (
      <Animated.View style={{ opacity: animatedValue }}>
        <Image source={element} style={styles.logoImage} />
      </Animated.View>
    );
  }
};

export default function SignIn() {
  const { signIn } = useAuth();
  const navigation = useNavigation<SignInScreenNavigationProp>();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleSignIn = async () => {
    if (!username || !password) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }
    try {
      const credentials = { username, password };
      await signIn(credentials);
      // navigation.navigate(RouteNames.HOME); // Isso deve redirecionar para a tela Home após o login
    } catch (error) {
      Alert.alert('Erro', 'Falha ao entrar, por favor, tente novamente.');
    }
  };

  const letters = "SIGEAGR".split('');
  const elements = [...letters, Assets.signIn];

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        {elements.map((element, index) => (
          <AnimatedLetter
            key={`${element}-${index}`}
            element={element}
            delay={0}
          />
        ))}
      </View>
      <TextInput
        value={username}
        onChangeText={text => {
          console.log("Username Changed:", text);
          setUsername(text);
        }}
        style={styles.input}
        placeholder="Usuário"
        keyboardType="default"
        autoCapitalize="none"
        placeholderTextColor={Colors.placeholderText}
      />
      <View style={styles.passwordContainer}>
        <TextInput
          value={password}
          onChangeText={text => {
            console.log("Password Changed:", text);
            setPassword(text);
          }}
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
      <LoadingButton
        title="Entrar"
        onPress={handleSignIn}
        style={styles.button}
        textStyle={styles.buttonText}
        delay={3}
      />
      <TouchableOpacity>
        <Text style={styles.forgotPassword}>Esqueci minha senha</Text>
      </TouchableOpacity>
      <View style={styles.footer}>
        <Image source={Assets.logoAdepara} />
        <Image source={Assets.logoPara} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.headerBackground,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 50,
  },
  letter: {
    fontSize: 40,
    fontWeight: 'bold',
    color: Colors.secondary,
  },
  logoImage: {
    width: 32,
    height: 32,
    marginLeft: 5,
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
  forgotPassword: {
    color: Colors.textSecondary,
    marginBottom: 20,
    textDecorationLine: 'underline',
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
  footer: {
    position: 'absolute',
    bottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
  },
});
