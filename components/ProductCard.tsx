import React from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';
import { Product } from './feactures/products/domain/models/product';



export interface ProductCardProps {
  product: Product; 
  onEdit: () => void; 
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onEdit })=> (
  <View style={styles.card}>
      <Text style={styles.title} >{product.name}</Text>
      <Text style={styles.title} >{product.brand}</Text>
      <Text style={styles.title} >{product.model}</Text>
      <Text style={styles.title} >{product.description}</Text>
      <Text style={styles.title} >{product.category}</Text>
      <Text style={styles.title} >{product.status}</Text>
    <Button title="Editar" onPress={onEdit} />
  </View>
);

const styles = StyleSheet.create({
  card: {
    padding: 16,
    marginVertical: 8,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});

export default ProductCard;
