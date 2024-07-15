import React from 'react';
import { Text, View } from 'react-native';
import { useAuth } from '../../context/authProvider';

export default function Index() {
  const { signOut } = useAuth();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text onPress={() => signOut()}>Sair</Text>
    </View>
  );
}
