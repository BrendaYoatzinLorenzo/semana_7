import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { CreateProductModal } from './createProductView';
import { EditProductModal } from './updateProductView';
import { router, useRouter } from 'expo-router';

export function ProductsView ()  {
  const [products, setProducts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isCreating, setIsCreating] = useState(false); 

  const fetchProducts = async () => {
      try {
          const response = await axios.get('http://localhost:3005/api/products'); 
          setProducts(response.data);
      } catch (error) {
          console.error('Error fetching products:', error);
      }
  };

  const handleProductCreated = async (newProduct: any) => {
      try {
          await axios.post('http://localhost:3005/api/products', newProduct); 
          fetchProducts();
      } catch (error) {
          console.error('Error creating product:', error);
      }
  };

  const handleProductUpdated = (updatedProduct: any) => {

    setProducts((prevProducts:any) =>
      prevProducts.map((prod:any) => (prod.id === updatedProduct.id ? updatedProduct : prod))
    );
  };


  useEffect(() => {
      fetchProducts();
  }, []);
  const router = useRouter();
  const renderProduct = ({ item } :any) => (
    <View style={styles.productContainer}>
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productBrand}>Brand: {item.brand}</Text>
      <Text style={styles.productModel}>Model: {item.model}</Text>
      <Text style={styles.productDescription}>Description: {item.description}</Text>
      <Text style={styles.productCategory}>Category: {item.category}</Text>
      <Text style={styles.productStock}>Stock: {item.stock}</Text>
      <TouchableOpacity
                onPress={() => {
                    setSelectedProduct(item); // Establecer el producto seleccionado
                    setEditModalVisible(true); // Mostrar el modal de edición
                }}
            >
                <Text style={styles.updateButton}>Edit Product</Text>
            </TouchableOpacity>
    </View>
  );

  return (
      <View style={styles.container}>
          <Text style={styles.title}>Product List</Text>
          <Button title="Add New Product" onPress={() => {
              setIsCreating(true);
              setModalVisible(true);
          }} />
          <FlatList
              data={products}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderProduct}
          />
          <CreateProductModal
              visible={modalVisible}
              onClose={() => setModalVisible(false)}
              onProductCreated={handleProductCreated}
          />
          <EditProductModal
              visible={editModalVisible}
              onClose={() => {
                  setEditModalVisible(false);
                  setSelectedProduct(null); // Limpiar producto seleccionado
              }}
              onProductUpdated={handleProductUpdated}
              product={selectedProduct}
          />
      </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  productContainer: {
    padding: 15,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 8,
    elevation: 2,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  productBrand: {
    fontSize: 16,
    color: '#555',
  },
  productModel: {
    fontSize: 16,
    color: '#555',
  },
  productDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  productCategory: {
    fontSize: 14,
    color: '#666',
  },
  productStock: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  updateButton: {
    color: '#007BFF',
    fontSize: 16,
    marginTop: 10,
  },
});

