import React, { useState, useEffect } from 'react';
import { View, Button, FlatList, StyleSheet, Dimensions } from 'react-native';
import { FreightViewModel } from '../viewModels/FreightViewModel';
import { Freight } from '../../domain/models/freight';
import FreightCard from './FreightCard';
import FreightModal from './FreightModal';

export function FreightView() {
  const [freights, setFreights] = useState<Freight[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [freightToEdit, setFreightToEdit] = useState<Freight | undefined>(undefined);
  const freightViewModel = new FreightViewModel();

  const handleSaveFreight = async (freight: Freight) => {
    if (freightToEdit) {
      await freightViewModel.updateNewFreight(freight);
    } else {
      await freightViewModel.createNewFreight(freight);
    }
    setModalVisible(false);
    setFreightToEdit(undefined);
    const fetchedFreights = await freightViewModel.fetchAllFreights();
    setFreights(fetchedFreights);
  };

  const handleEditFreight = (freight: Freight) => {
    setFreightToEdit(freight);
    setModalVisible(true);
  };

  useEffect(() => {
    const loadFreights = async () => {
      try {
        const fetchedFreights = await freightViewModel.fetchAllFreights();
        setFreights(fetchedFreights);
      } catch (error) {
        console.error('Error fetching freights:', error);
      }
    };

    loadFreights();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button title="Agregar Flete" onPress={() => setModalVisible(true)} />
      </View>

      <FlatList
        data={freights}
        renderItem={({ item }) => (
          <FreightCard
            freight={item}
            onEdit={() => handleEditFreight(item)}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
      />

      <FreightModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={handleSaveFreight}
        freightToEdit={freightToEdit}
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
    shadowRadius:2
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

