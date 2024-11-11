import React, { useState, useEffect } from 'react';
import { View, Button, FlatList, StyleSheet } from 'react-native';
import { ProductViewModel } from '../viewModels/ProductViewModel';
import { Product } from '../../domain/models/product';
import ProductCard from '@/components/ProductCard';
import ProductModal from '@/components/ProductModal';

export function ProductsView() {
  const [products, setProducts] = useState<Product[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [productToEdit, setProductToEdit] = useState<Product | undefined>(undefined);
  const productViewModel = new ProductViewModel();

  const handleSaveProduct = async (product: Product) => {
    if (productToEdit) {
      // Si se está editando, llama a la función de actualización
      await productViewModel.updateNewProduct(product);
    } else {
      // Si es un producto nuevo, llama a la función de creación
      await productViewModel.createNewProduct(product);
    }
    setModalVisible(false);
    setProductToEdit(undefined);  
    // Recarga los productos para reflejar los cambios
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
      <Button title="Agregar Producto" onPress={() => setModalVisible(true)} />

      <FlatList
        data={products}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            onEdit={() => handleEditProduct(item)}
          />
        )}
        keyExtractor={(item) => item.productCode.toString()}
        style={styles.list} // Asigna estilo para ocupar espacio restante y permitir desplazamiento
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    flex: 1, // Ocupa el espacio restante en el contenedor
  },
});

export default ProductsView;
