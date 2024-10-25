import React, { useState } from 'react';
import { View, Text, TextInput, Button, Modal, StyleSheet } from 'react-native';
import axios from 'axios';

export function  CreateProductModal ({ visible, onClose, onProductCreated } : any ) {
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [stock, setStock] = useState('');
  const [productCode, setProductCode] = useState('');
  const [status, setStatus] = useState('ENTREGAR_DIA');
  const [branchId, setBranchId] = useState(1);

  const handleSubmit = async () => {
    try {
      const newProduct = {
        name,
        brand,
        model,
        description,
        category,
        stock: parseInt(stock), // Convert to number
        productCode: parseInt(productCode), // Convert to number
        status,
        branchId,
      };

      // Replace with your API endpoint
      await axios.post('http://localhost:3005/api/products', newProduct);
      onProductCreated(); // Call the parent function to refresh the product list
      onClose(); // Close the modal
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Create New Product</Text>
          <TextInput
            placeholder="Name"
            value={name}
            onChangeText={setName}
            style={styles.input}
          />
          <TextInput
            placeholder="Brand"
            value={brand}
            onChangeText={setBrand}
            style={styles.input}
          />
          <TextInput
            placeholder="Model"
            value={model}
            onChangeText={setModel}
            style={styles.input}
          />
          <TextInput
            placeholder="Description"
            value={description}
            onChangeText={setDescription}
            style={styles.input}
          />
          <TextInput
            placeholder="Category"
            value={category}
            onChangeText={setCategory}
            style={styles.input}
          />
          <TextInput
            placeholder="Stock"
            value={stock}
            onChangeText={setStock}
            keyboardType="numeric"
            style={styles.input}
          />
          <TextInput
            placeholder="Product Code"
            value={productCode}
            onChangeText={setProductCode}
            keyboardType="numeric"
            style={styles.input}
          />
          <TextInput
            placeholder="Status"
            value={status}
            onChangeText={setStatus}
            style={styles.input}
          />
          <TextInput
            placeholder="Branch ID"
            value={branchId.toString()}
            onChangeText={(text) => setBranchId(parseInt(text))}
            keyboardType="numeric"
            style={styles.input}
          />
          <Button title="Create Product" onPress={handleSubmit} />
          <Button title="Cancel" onPress={onClose} color="red" />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
});


