import React, { useState, useEffect } from 'react';
import { View, Button, FlatList, StyleSheet, Dimensions } from 'react-native';
import { ProductViewModel } from '../viewModels/ProductViewModel';
import { Product } from '../../domain/models/product';
import {ProductCard} from '@/components/ProductCard';
import ProductModal from '@/components/ProductModal';

export function ProductsView() {
  const [products, setProducts] = useState<Product[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [productToEdit, setProductToEdit] = useState<Product | undefined>(undefined);
  const productViewModel = new ProductViewModel();


  const handleSaveProduct = async (product: Product) => {
    if (productToEdit) {
      await productViewModel.updateNewProduct(product);
    } else {
      await productViewModel.createNewProduct(product);
    }
    setModalVisible(false);
    setProductToEdit(undefined);
    const fetchedProducts = await productViewModel.fetchAllProducts();
    setProducts(fetchedProducts);
  };

  const handleEditProduct = (product: Product) => {
    setProductToEdit(product);
    setModalVisible(true);
  };

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const fetchedProducts = await productViewModel.fetchAllProducts();
        setProducts(fetchedProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    loadProducts();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button title="Agregar Producto" onPress={() => setModalVisible(true)} />
      </View>

      <FlatList
        data={products}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            onEdit={() => handleEditProduct(item)}
          />
        )}
        keyExtractor={(item) => item.productCode.toString()}
        contentContainerStyle={styles.listContent}
      />

      <ProductModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={handleSaveProduct}
        productToEdit={productToEdit}
      />
    </View>
  );
};

const { width } = Dimensions.get('window');
const isLargeScreen = width > 768;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: isLargeScreen ? 20 : 10,
    alignItems: 'center',
  },
  buttonContainer: {
    width: isLargeScreen ? '30%' : '100%',
    alignSelf: 'center',
    marginVertical: 10,
  },
  list: {
    flex: 1,
    width: '100%',
  },
  listContent: {
    paddingHorizontal: isLargeScreen ? 20 : 10,
  },
});

export default ProductsView;
