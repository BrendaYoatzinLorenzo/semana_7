import React, { useEffect, useState } from 'react';
import { Modal, View, Text, TextInput, Button, StyleSheet, ScrollView, Alert } from 'react-native';
import { Branch } from '../../domain/models/branch'; 
import { branchtSchema } from '../../domain/validation/BranchSchema';

interface BranchModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (branch: Branch) => void;
  branchToEdit?: Branch | null;  
}

const BranchModal: React.FC<BranchModalProps> = ({ visible, onClose, onSave, branchToEdit }) => {
  const [branchData, setBranchData] = useState<Branch>({
    id: 0,
    name: '',
    address: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (visible) {
      if (branchToEdit) {
        setBranchData(branchToEdit);
      } else {
        resetForm();
      }
    }
  }, [visible, branchToEdit]);

  const handleChange = (field: keyof Branch, value: any) => {
    setBranchData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: '',
    }));
  };

  const handleValidation = () => {
    const validationResult = branchtSchema.safeParse(branchData); 
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
        onSave(branchData);
        resetForm();
      } catch (error) {
        Alert.alert('Error', 'Hubo un problema al guardar la sucursal.');
      }
    } else {
      Alert.alert('Error de validación', 'Por favor corrige los errores en el formulario.');
    }
  };

  const resetForm = () => {
    setBranchData({
      id: 0,
      name: '',
      address: '',
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
            {branchToEdit ? 'Editar Sucursal' : 'Agregar Sucursal'}
          </Text>

          <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
            <TextInput
              style={styles.input}
              placeholder="Nombre"
              value={branchData.name}
              onChangeText={(text) => handleChange('name', text)}
            />
            {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

            <TextInput
              style={styles.input}
              placeholder="Dirección"
              value={branchData.address}
              onChangeText={(text) => handleChange('address', text)}
            />
            {errors.address && <Text style={styles.errorText}>{errors.address}</Text>}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 8,
  },
});

export default BranchModal;
