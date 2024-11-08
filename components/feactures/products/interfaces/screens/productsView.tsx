// screens/ProductScreen.tsx

import React, { useState, useEffect } from 'react';
import { View, Button, FlatList, ScrollView } from 'react-native';
import { ProductViewModel } from '../viewModels/ProductViewModel';
import { Product } from '../../domain/models/product';
import  ProductCard  from '@/components/ProductCard';
import  ProductModal  from '@/components/ProductModal';


export  function ProductsView ()  {
  const [products, setProducts] = useState<Product[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [productToEdit, setProductToEdit] = useState<Product | undefined>(undefined);
  const productViewModel = new ProductViewModel();



  const handleSaveProduct = async (product: Product) => {
    if (productToEdit) {
      await productViewModel.createNewProduct(product); 
    } else {
      // Crear producto
      await productViewModel.createNewProduct(product);
    }
    setModalVisible(false);
    setProductToEdit(undefined);  
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
   <ScrollView>
      <View>
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
        />
        
        <ProductModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onSave={handleSaveProduct}
          productToEdit={productToEdit}  
        />
      </View>
   </ScrollView>
 
  );
};


