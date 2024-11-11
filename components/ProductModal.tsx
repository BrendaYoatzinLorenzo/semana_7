import React, { useEffect, useState } from 'react';
import { Modal, View, Text, TextInput, Button, StyleSheet, ScrollView, Alert } from 'react-native';
import { Product } from './feactures/products/domain/models/product';
import { productSchema } from './feactures/products/domain/validation/productSchema';
import { Picker } from '@react-native-picker/picker';
interface ProductModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (product: Product) => void;
  productToEdit?: Product | null;
}

const ProductModal: React.FC<ProductModalProps> = ({ visible, onClose, onSave, productToEdit }) => {
  const [productData, setProductData] = useState<Product>({
    id: 0,
    name: '',
    brand: '',
    model: '',
    description: '',
    category: '',
    stock: 0,
    productCode: 0,
    status: 'PENDIENTE',
    isActive: true,
    branchId: 0,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (visible) {
      if (productToEdit) {
        setProductData(productToEdit);
      } else {
        resetForm();
      }
    }
  }, [visible, productToEdit]);

  const handleChange = (field: keyof Product, value: any) => {
    setProductData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: '',
    }));
  };

  const handleValidation = () => {
    const validationResult = productSchema.safeParse(productData);
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
        onSave(productData);
        resetForm();
        Alert.alert(
          'Éxito',
          productToEdit ? 'Producto actualizado correctamente.' : 'Producto agregado correctamente.',
          [{ text: 'OK', onPress: () => onClose() }]
        );
      } catch (error) {
        Alert.alert('Error', 'Hubo un problema al guardar el producto.');
      }
    } else {
      Alert.alert('Error de validación', 'Por favor corrige los errores en el formulario.');
    }
  };

  const resetForm = () => {
    setProductData({
      id: 0,
      name: '',
      brand: '',
      model: '',
      description: '',
      category: '',
      stock: 0,
      productCode: 0,
      status: 'PENDIENTE',
      isActive: true,
      branchId: 0,
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
            {productToEdit ? 'Editar Producto' : 'Agregar Producto'}
          </Text>
          
          <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
            <TextInput
              style={styles.input}
              placeholder="Nombre"
              value={productData.name}
              onChangeText={(text) => handleChange('name', text)}
            />
            {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
            
            <TextInput
              style={styles.input}
              placeholder="Marca"
              value={productData.brand}
              onChangeText={(text) => handleChange('brand', text)}
            />
            {errors.brand && <Text style={styles.errorText}>{errors.brand}</Text>}
            
            <TextInput
              style={styles.input}
              placeholder="Modelo"
              value={productData.model}
              onChangeText={(text) => handleChange('model', text)}
            />
            {errors.model && <Text style={styles.errorText}>{errors.model}</Text>}
            
            <TextInput
              style={styles.input}
              placeholder="Descripción"
              value={productData.description}
              onChangeText={(text) => handleChange('description', text)}
            />
            {errors.description && <Text style={styles.errorText}>{errors.description}</Text>}
            
            <TextInput
              style={styles.input}
              placeholder="Categoría"
              value={productData.category}
              onChangeText={(text) => handleChange('category', text)}
            />
            {errors.category && <Text style={styles.errorText}>{errors.category}</Text>}
            
            <TextInput
              style={styles.input}
              placeholder="Stock"
              value={String(productData.stock)}
              onChangeText={(text) => handleChange('stock', parseInt(text, 10))}
              keyboardType="numeric"
            />
            {errors.stock && <Text style={styles.errorText}>{errors.stock}</Text>}
            
            <TextInput
              style={styles.input}
              placeholder="Código de Producto"
              value={String(productData.productCode)}
              onChangeText={(text) => handleChange('productCode', parseInt(text, 10))}
              keyboardType="numeric"
            />
            {errors.productCode && <Text style={styles.errorText}>{errors.productCode}</Text>}
            
            <View style={styles.pickerContainer}>
            <Text style={styles.label}>Estado</Text>
              <Picker
                selectedValue={productData.status}
                style={styles.picker}
                onValueChange={(value) => handleChange('status', value)}
              >
                <Picker.Item label="PENDIENTE" value="PENDIENTE" />
                <Picker.Item label="ENTREGADO" value="ENTREGADO" />
                <Picker.Item label="ENTREGADO_MANANA" value="ENTREGADO_MANANA" />
                <Picker.Item label="ENTREGAR_DIA" value="ENTREGAR_DIA" />
                <Picker.Item label="NO_ENTREGADO" value="NO_ENTREGADO" />
              </Picker>
            </View>
            {errors.status && <Text style={styles.errorText}>{errors.status}</Text>}

            <TextInput
              style={styles.input}
              placeholder="Branch ID"
              value={String(productData.branchId)}
              onChangeText={(text) => handleChange('branchId', parseInt(text, 10))}
              keyboardType="numeric"
            />
            {errors.branchId && <Text style={styles.errorText}>{errors.branchId}</Text>}
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
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
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
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 5,
  },
  label: {
    alignSelf: 'flex-start',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  picker: {
    width: '100%',
    height: 40,
    marginBottom: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  pickerContainer: {
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
  },
});

export default ProductModal;
