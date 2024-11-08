// instala react-native-async-storage
// https://react-native-async-storage.github.io/async-storage/docs/install/


// ver ejemplo de implementación
// https://react-native-async-storage.github.io/async-storage/docs/usage

import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    // saving error
    throw new Error("Error al escribir el storage");
  }
};

export const storeJson = async (key: string, value: object) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    // saving error
    throw new Error("Error al escribir el storage");
  }
};

export const readData = async (key: string) => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (e) {
    // error reading value
    throw new Error("Error al leer el storage");
  }
};

export const readObject = async (key: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
    throw new Error("Error al leer el storage");
  }
};

export const testStorage = async () => {
  
  try {
    await storeData('testKey', 'testValue');
    const value = await readData('testKey');
    console.log("Valor leído:", value); 
  } catch (e) {
    // error reading value
    throw new Error("Error al leer el storage");
  }
};
