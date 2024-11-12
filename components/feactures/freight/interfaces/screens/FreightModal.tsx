import React, { useEffect, useState } from 'react';
import { Modal, View, Text, TextInput, Button, StyleSheet, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { Freight } from '../../domain/models/freight';
import { freightSchema } from '../../domain/validation/FreightSchema';

interface FreightModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (freight: Freight) => void;
  freightToEdit?: Freight | null;
}

const FreightModal: React.FC<FreightModalProps> = ({ visible, onClose, onSave, freightToEdit }) => {
  const [freightData, setFreightData] = useState<Freight>({
    id:0,
	  city: '',
    price: 0,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (visible) {
      if (freightToEdit) {
        setFreightData(freightToEdit);
      } else {
        resetForm();
      }
    }
  }, [visible, freightToEdit]);

  const handleChange = (field: keyof Freight, value: any) => {
    setFreightData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: '',
    }));
  };

  const handleValidation = () => {
    const validationResult = freightSchema.safeParse(freightData);
    if (!validationResult.success) {
      const fieldErrors: { [key: string]: string } = {};
      validationResult.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0]] = err.message;
      });
      setErrors(fieldErrors);
      return false;
    }
    setErrors({});
    return true;
  };

  const handleSave = () => {
    if (handleValidation()) {
      try {
        onSave(freightData);
        resetForm();
      } catch (error) {
        Alert.alert('Error', 'Hubo un problema al guardar el flete.');
      }
    } else {
      Alert.alert('Error de validación', 'Por favor corrige los errores en el formulario.');
    }
  };

  const resetForm = () => {
    setFreightData({
      id:0,
		  city: '',
      price: 0,
    });
    setErrors({});
  };

  return (
    <Modal
      visible={visible}
      onRequestClose={() => {
        onClose();
        resetForm();
      }}
      transparent
      animationType="slide"
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>
            {freightToEdit ? 'Editar Flete' : 'Agregar Flete'}
          </Text>

          <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
            <TextInput
              style={styles.input}
              placeholder="Nombre"
              value={freightData.city}
              onChangeText={(text) => handleChange('city', text)}
            />
            {errors.city && <Text style={styles.errorText}>{errors.city}</Text>}

            <TextInput
              style={styles.input}
              placeholder="Precio"
              value={String(freightData.price)}
              onChangeText={(text) => handleChange('price', parseFloat(text))}
              keyboardType="numeric"
            />
            {errors.price && <Text style={styles.errorText}>{errors.price}</Text>}
          </ScrollView>

          <View style={styles.buttonContainer}>
            <Button title="Guardar" onPress={handleSave} color="#4CAF50" />
            <Button title="Cancelar" onPress={() => { onClose(); resetForm(); }} color="#F44336" />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    maxHeight: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  scrollView: {
    width: '100%',
  },
  scrollViewContent: {
    paddingBottom: 20,
  },
  input: {
    width: '100%',
    height: 45,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 12,
    paddingLeft: 10,
    justifyContent: 'center',
  },
  buttonContainer: {
    width: '100%',
    marginTop: 15,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 8,
  },
});

export default FreightModal;
