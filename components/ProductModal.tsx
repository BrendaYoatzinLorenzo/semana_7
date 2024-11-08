import React, { useEffect, useState } from 'react';
import { Modal, View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Product } from './feactures/products/domain/models/product';

interface ProductModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (product: Product) => void;
  productToEdit?: Product | null; 
}

const ProductModal: React.FC<ProductModalProps> = ({ visible, onClose, onSave, productToEdit }) => {

  const [productData, setProductData] = useState<Product>({
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

  useEffect(() => {
    if (productToEdit) {
      setProductData(productToEdit); 
    }
  }, [productToEdit]);

  const handleChange = (field: keyof Product, value: any) => {
    setProductData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleSave = () => {
    onSave(productData);  
    setProductData({
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
  };

  return (
    <Modal visible={visible} onRequestClose={onClose} transparent animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>
            {productToEdit ? 'Editar Producto' : 'Agregar Producto'}
          </Text>
          
          <TextInput
            style={styles.input}
            placeholder="Nombre"
            value={productData.name}
            onChangeText={(text) => handleChange('name', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Marca"
            value={productData.brand}
            onChangeText={(text) => handleChange('brand', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Modelo"
            value={productData.model}
            onChangeText={(text) => handleChange('model', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Descripción"
            value={productData.description}
            onChangeText={(text) => handleChange('description', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Categoría"
            value={productData.category}
            onChangeText={(text) => handleChange('category', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Stock"
            value={String(productData.stock)}
            onChangeText={(text) => handleChange('stock', parseInt(text, 10))}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Código de Producto"
            value={String(productData.productCode)}
            onChangeText={(text) => handleChange('productCode', parseInt(text, 10))}
            keyboardType="numeric"
          />
          
          <View style={styles.buttonContainer}>
            <Button title="Guardar" onPress={handleSave} color="#4CAF50" />
            <Button title="Cancelar" onPress={onClose} color="#F44336" />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Oscurece el fondo detrás del modal
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
});

export default ProductModal;
