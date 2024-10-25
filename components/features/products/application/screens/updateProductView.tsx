import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';

export function EditProductModal({ visible, onClose, onProductUpdated, product }: any) {
    const [name, setName] = useState('');
    const [brand, setBrand] = useState('');
    const [model, setModel] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [stock, setStock] = useState('');

    // Cargar datos del producto cuando el modal se abre
    useEffect(() => {
        if (product) {
            setName(product.name || '');
            setBrand(product.brand || '');
            setModel(product.model || '');
            setDescription(product.description || '');
            setCategory(product.category || '');
            setStock(product.stock ? product.stock.toString() : ''); // Asegúrate de convertir a string
        }
    }, [product, visible]); // Agregar 'visible' para resetear los valores si el modal se cierra

    const handleUpdate = async () => {
        const updatedProduct = {
            name,
            brand,
            model,
            description,
            category,
            stock: parseInt(stock), // Asegúrate de convertir a número
            productCode: product.productCode, // Mantener el mismo productCode
            status: product.status,
            branchId: product.branchId,
        };

        try {
            await axios.put(`http://localhost:3005/api/products/${product.id}`, updatedProduct); 
            onProductUpdated(updatedProduct);
            onClose(); 
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    return (
        <Modal visible={visible} animationType="slide">
            <View style={styles.container}>
                <Text style={styles.title}>Edit Product</Text>
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
                <Button title="Update Product" onPress={handleUpdate} />
                <Button title="Cancel" onPress={onClose} />
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
});
