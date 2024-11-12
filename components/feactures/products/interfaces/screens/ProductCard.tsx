import React from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';
import { Product } from '../../domain/models/product';


export interface ProductCardProps {
  product: Product; 
  onEdit: () => void; 
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onEdit }) => (
  <View style={styles.card}>
    <Text style={styles.title}>{product.name}</Text>
    <Text style={styles.text}>{product.brand}</Text>
    <Text style={styles.text}>{product.model}</Text>
    <Text style={styles.text}>{product.description}</Text>
    <Text style={styles.text}>{product.category}</Text>
    <Text style={styles.text}>{product.status}</Text>
    <Button title="Editar" onPress={onEdit} />
  </View>
);

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 8,
    padding: 16,
    height: 200,
    backgroundColor: '#E0F7FA', 
    borderRadius: 8,
    elevation: 2,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    marginBottom: 4,
  },
});

