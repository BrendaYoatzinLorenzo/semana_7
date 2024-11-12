import React, { useEffect, useState } from 'react';
import { Modal, View, Text, TextInput, Button, StyleSheet, ScrollView, Alert, ToastAndroid, TouchableOpacity } from 'react-native';
import { Product } from '../../domain/models/product';
import { productSchema } from '../../domain/validation/productSchema';

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
  const [showStatusOptions, setShowStatusOptions] = useState<boolean>(false);

  const statusOptions = ["PENDIENTE", "ENTREGADO", "ENTREGADO_MANANA", "ENTREGAR_DIA", "NO_ENTREGADO"];

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
              onChangeText={(text) => handleChange('stock', text)}
            />
            {errors.stock && <Text style={styles.errorText}>{errors.stock}</Text>}
            
            <TextInput
              style={styles.input}
              placeholder="Código de Producto"
              value={String(productData.productCode)}
              onChangeText={(text) => handleChange('productCode', parseInt(text, 10))}
            />
            {errors.productCode && <Text style={styles.errorText}>{errors.productCode}</Text>}
            
            <TouchableOpacity
              style={styles.input}
              onPress={() => setShowStatusOptions(!showStatusOptions)}
            >
              <Text>{productData.status}</Text>
            </TouchableOpacity>
            {showStatusOptions && (
              <View style={styles.statusOptions}>
                {statusOptions.map((status) => (
                  <TouchableOpacity key={status} onPress={() => {
                    handleChange('status', status);
                    setShowStatusOptions(false);
                  }}>
                    <Text style={styles.statusOptionText}>{status}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
            {errors.status && <Text style={styles.errorText}>{errors.status}</Text>}

            <TextInput
              style={styles.input}
              placeholder="Id de Sucursal"
              value={String(productData.branchId)}
              onChangeText={(text) => handleChange('branchId', text)}
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
  statusOptions: {
    width: '100%',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    marginTop: -10,
    marginBottom: 12,
    backgroundColor: 'white',
  },
  statusOptionText: {
    padding: 10,
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
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

export default ProductModal;
