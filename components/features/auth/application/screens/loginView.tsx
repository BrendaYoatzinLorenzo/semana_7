import React, { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import {  Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSessionState } from '../../provider';

// Inicializa Firebase App

export default function LoginView() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {
    loading,
    user,
    message,
    
    login,
  } = useSessionState()
  const onLogin =  () => {
      login(email, password)
  }
  return (
    <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#2bbfe4', '#eaecc6']} style={styles.linearGradient}>
      <View style={styles.container}>
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
        <Button title="Login" onPress={onLogin} disabled={loading} />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
      },
      title: {
        fontSize: 45,
        marginBottom: 16,
        textAlign: 'center',
        color: '#000'
      },
      input: {
        borderWidth: 1,
        textAlign: 'center',
        paddingTop: 10,
        marginVertical: 10,
        borderRadius: 5,
        color:'#000',
      },
      linearGradient: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: '50%',
        borderRadius: 5
      },
    });