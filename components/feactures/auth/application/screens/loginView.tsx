import React, { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSessionState } from "../provider"; 

export default function LoginView() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {
    loading,
    user,
    message,
    login,
  } = useSessionState();
  
  const onLogin = () => {
    login(email, password);
  };

  return (
    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#2bbfe4', '#eaecc6']} style={styles.linearGradient}>
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Login</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <Text>{message}</Text>
          <Button title="Iniciar Sesión" onPress={onLogin} disabled={loading} />
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    width: '80%',
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#1b3a57', 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  title: {
    fontSize: 45,
    marginBottom: 16,
    textAlign: 'center',
    color: '#ffffff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#ffffff',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    color: '#000',
    textAlign: 'center',
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
  },
});
